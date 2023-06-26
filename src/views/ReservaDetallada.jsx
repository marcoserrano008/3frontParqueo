import React, { useState, useEffect } from 'react';

import QRCode from 'qrcode.react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"

import { Button } from "../../components/ui/button"

import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { DatePickerWithRange } from "../../components/datePicker/with-range"
import { Switch } from "../../components/ui/switch"

import TimePicker from './miniViews/TimePicker'
import Parqueo from './ParqueoFormulario/Parqueo';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog"
import axiosClient from '../axios-client';
import { set } from 'date-fns';
import { useStateContext } from '../contexts/ContextProvider';

// Función independiente para calcular el precio y las horas
const calculatePriceAndHours = (startTime, endTime, dateRange) => {
  if (!startTime || !endTime || !dateRange) {
    return { price: '-', hours: 0, minutes: 0 };
  }

  // Crear objetos de fecha para la hora de inicio y de fin usando la fecha "from"
  let start = new Date(dateRange.from);
  start.setHours(parseInt(startTime.hour), parseInt(startTime.minute), 0, 0);

  let end = new Date(dateRange.from);
  end.setHours(parseInt(endTime.hour), parseInt(endTime.minute), 0, 0);

  // Calcular la diferencia en horas, redondear al alza
  let diffInHours = Math.abs(end - start) / (1000 * 60 * 60);
  diffInHours = Math.ceil(diffInHours);

  // Calcular la diferencia en minutos
  let diffInMinutes = Math.abs(end - start) / (1000 * 60);


  // Si la diferencia es negativa, devolver un guion y cero horas y minutos
  if (diffInHours <= 0) {
    return { price: '-', hours: 0, minutes: 0 };
  }

  // Calcular la cantidad de días en el rango de fechas, se suma 1 para incluir ambas fechas en el rango
  let diffInDays = Math.abs(new Date(dateRange.to) - new Date(dateRange.from)) / (1000 * 60 * 60 * 24);
  diffInDays = Math.ceil(diffInDays) + 1;

  // Calcular el precio: para cada día, la primera hora cuesta 3 y las horas adicionales cuestan 2
  let pricePerDay = (diffInHours > 1) ? 3 + 2 * (diffInHours - 1) : 3;
  let price = pricePerDay * diffInDays;

  
  return { price, hours: diffInHours * diffInDays, minutes: diffInMinutes };
}








export default function ReservaDetallada() {

  const { setNotification } = useStateContext()
  const [switchState, setSwitchState] = useState(false);

  const [selectedDate, setSelectedDate] = useState();

  const [idDeuda, setIdDeuda] = useState('2002');
  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Aquí es donde puedes hacer algo con la fecha seleccionada, como llamar a una API
    console.log(date);
  };


  const [filaSeleccionada, setFilaSeleccionada] = useState(null);
  const [columnaSeleccionada, setColumnaSeleccionada] = useState(null);
  const [estadoEspacio, setEstadoEspacio] = useState("");
  const handleParqueoClick = (fila, columna) => {
    setFilaSeleccionada(fila);
    setColumnaSeleccionada(columna);
  }


  const [time, setTime] = useState({ hour: null, minute: null });

  const handleTimeChange = (newTime) => {
    console.log("se esta ejecutando")
    console.log(newTime)
    setTime(newTime);

    // Aquí puedes hacer tu POST a la API con los nuevos valores.
  }
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleStartTimeChange = (time) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
  };


  const [price, setPrice] = useState() //borrar
  const [priceData, setPriceData] = useState({ price: '-', hours: 0 });

  const [placa, setPlaca] = useState("");
  const [vehiculos, setVehiculos] = useState([]);
  useEffect(() => {
    axiosClient.get('/list-vehiculo')
    .then(response => {
      setVehiculos(response.data);
    })
    .catch(() => {
      console.error('Hubo un error al obtener los vehiculos', error);
    })

    // Asegúrate de que todas las variables necesarias están definidas
    if (startTime && endTime && selectedDate) {
      const data = calculatePriceAndHours(startTime, endTime, selectedDate);
      setPriceData(data);
    }
  }, [startTime, endTime, selectedDate, placa]);

  const [fechaDesde, setFechaDesde] = useState('')
  const [fechaHasta, setFechaHasta] = useState('')

  const [duracionMinutos, setDuracionMinutos] = useState('')

  const [placaSeleccionada, setPlacaSeleccionada] = useState("");

  const handleButtonClick = () => {
    // Asegúrate de que todas las variables necesarias están definidas
    if (startTime && endTime && selectedDate && (placa || placaSeleccionada)) {
      const data = calculatePriceAndHours(startTime, endTime, selectedDate);

      // Convertir la fecha "from" a formato AAAA-MM-DD
      const fromDate = new Date(selectedDate.from);
      const formattedFromDate = `${fromDate.getFullYear()}-${String(fromDate.getMonth() + 1).padStart(2, '0')}-${String(fromDate.getDate()).padStart(2, '0')}`;



      //Agregar las fechas
      const fechaDesde = `${String(fromDate.getDate()).padStart(2, '0')}/${String(fromDate.getMonth() + 1).padStart(2, '0')}/${fromDate.getFullYear()}`
      setFechaDesde(fechaDesde)
      const toDate = new Date(selectedDate.to);
      const formattedToDate = `${toDate.getFullYear()}-${String(toDate.getMonth() + 1).padStart(2, '0')}-${String(toDate.getDate()).padStart(2, '0')}`;

      const fechaHasta = `${String(toDate.getDate()).padStart(2, '0')}/${String(toDate.getMonth() + 1).padStart(2, '0')}/${toDate.getFullYear()}`
      setFechaHasta(fechaHasta);

      const totalDays = (toDate - fromDate) / (1000 * 60 * 60 * 24) + 1;

      setDuracionMinutos(data.hours * 60)
      // Crear el objeto de datos para el POST
      const postData = {
        id_espacio: `${filaSeleccionada}${columnaSeleccionada}`,
        placa_vehiculo: switchState ? placaSeleccionada : placa,
        fecha_inicio: formattedFromDate,
        fecha_fin: formattedToDate,
        hora_inicio: `${String(startTime.hour).padStart(2, '0')}:${String(startTime.minute).padStart(2, '0')}`,
        hora_fin: `${String(endTime.hour).padStart(2, '0')}:${String(endTime.minute).padStart(2, '0')}`,
        duracion_minutos: data.minutes,
        tipo: 'hora',
        costo: data.price/ totalDays  ,
      };

      // Hacer una solicitud POST a la API con axios
      axiosClient.post('/create-reserva-rango', postData)
        .then(response => {
          console.log(response.data);
          if (response.data.status === '0') {
            setChoqueReserva(true)
            setIdReserva(null)
          } else {
            setChoqueReserva(false)
            setIdReserva(response.data.reservas_creadas)
            setNombreUsuario(response.data.nombre_usuario)
            setRolUsuario(response.data.rol)
          }
        })
        .catch(error => {
          console.error('Error al hacer la solicitud a la API: ', error);
        });
    } else {
      console.error('Faltan datos necesarios para realizar la solicitud a la API.');
    }
  };

  const [choqueReserva, setChoqueReserva] = useState(false)

  const [idReserva, setIdReserva] = useState(null)
  const [nombreUsuario, setNombreUsuario] = useState(null)
  const [rolUsuario, setRolUsuario] = useState(null)

  const pagarClick = () => {
    
    const postData = {
      id_reservas: idReserva,
    }
    axiosClient.post('/pagar-varias-reservas', postData)
      .then(response => {
        console.log(response.data);
        setNotification('Se ha realizado la reserva con exito')
        setFilaSeleccionada("")
        setColumnaSeleccionada("")
      })
      .catch(error => {
        console.error('Error al pagar ', error);
      });
  }

  const modificarClick = () => {
    const deleteData = {
      data: {
        id_reserva: idReserva
      }
    }
    axiosClient.delete('/delete-multiple-reservas', deleteData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error al eliminar ', error);
      });
  }

  return (
    <>
      <div className='font-bold text-3xl mb-5'>Reserva por Intervalos</div>
      <div className='flex flex-row px-5'>
        <div className='w-1/2'>
          <div className='flex justify-center'>
            <Card className="w-[450px]">
              <CardHeader>
                <CardTitle>Crear Reserva</CardTitle>
                <CardDescription>Seleccione los datos de su reserva.</CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4 ">
                    <div className="flex flex-col space-y-1.5 ">
                      <div className='flex justify-center'>
                        Espacio seleccionado

                      </div>

                      {/* <Input id="name" placeholder="Name of your project" /> */}
                      <div className='flex justify-center'>
                        <Card id="espacio" className='w-[150px] h-[60px] flex items-center justify-center'>
                          <div className=' w-full h-full flex items-center justify-center'>
                            <CardContent className='flex items-center justify-center'>
                              <div className="text-3xl font-bold mt-5">{filaSeleccionada}{columnaSeleccionada}</div>
                            </CardContent>
                          </div>
                        </Card>
                      </div>


                    </div>

                    <div className='flex flex-col space-y-1.5 mt-2'>
                      <Label htmlFor='fecha' >Seleccione la fecha</Label>
                      <DatePickerWithRange id="fecha" className="[&>button]:w-[260px]" onDateChange={handleDateChange} />
                    </div>
                    <div className='flex flex-row mt-2'>
                      <div className='w-1/2'>
                        <div className='flex flex-col space-y-1.5'>
                          <Label htmlFor='desdehora'>Desde Hora:</Label>
                          <TimePicker onChange={handleStartTimeChange} id="desdehora"></TimePicker>
                        </div>
                      </div>
                      <div className='w-1/2'>
                        <div className='flex flex-col space-y-1.5 '  >
                          <Label className={priceData.price === '-' ? 'text-red-600 font-extrabold' : ''} htmlFor='hastahora'>Hasta Hora:</Label>
                          
                          <TimePicker onChange={handleEndTimeChange} id="hastahora" ></TimePicker>
                        </div>
                      </div>
                    </div>
                    {priceData.price == '-' ? <>
                    <div className='text-red-600 font-extrabold'>***Seleccione un intervalo valido***</div>

                    </>:<></>}


                    <div className="flex items-center space-x-2 mt-2">
                      <Switch id="vehiculo-registrado" onClick={() => setSwitchState(!switchState)} />
                      <Label htmlFor="vehiculo-registrado">Vehiculo registrado</Label>
                    </div>

                    {switchState ? (
                      <div className="flex flex-col space-y-1.5 mt-2">
                        <Label htmlFor="name">Seleccione la placa:</Label>
                        <Select onValueChange={value => setPlacaSeleccionada(value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione la placa" />
                            <SelectContent position="popper">
                              {vehiculos.map(vehiculo => (
                                <SelectItem key={vehiculo.id_vehiculo} value={vehiculo.placa} >
                                  {vehiculo.placa}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </SelectTrigger>
                        </Select>
                      </div>
                    ) : (
                      <div className="flex flex-col space-y-1.5 w-[200px] mt-2">
                        <Label htmlFor="name">Ingrese la placa:</Label>
                        <Input id="placa" placeholder="Placa" value={placa} onChange={e => setPlaca(e.target.value)} />
                      </div>
                    )}
                    <div className='flex justify-center'>
                      <Card className='w-[200px]'>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Costo Estimado
                          </CardTitle>

                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{priceData.price} Bs. </div>
                          <p className="text-xs text-muted-foreground">
                            Selecionó: {priceData.hours} horas.
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Primera hora: 3 Bs.
                          </p >
                          <p className="text-xs text-muted-foreground">Hora adicional: 2 Bs.</p>
                          <p className="text-xs text-muted-foreground">**Cobro mínimo: 1 hora</p>
                        </CardContent>
                      </Card>
                    </div>


                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost">Cancel</Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                  <Button
                      disabled={
                        !filaSeleccionada ||
                        !columnaSeleccionada ||
                        (priceData.price=='-') ||
                        !startTime ||
                        !endTime ||
                        (!placa && !placaSeleccionada)
                      }
                      onClick={handleButtonClick}
                    >
                      Pagar
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>DATOS DE LA RESERVA</AlertDialogTitle>
                      <AlertDialogDescription>
                        {choqueReserva ?
                          <>
                            No se puede reservar en este horario, ya existe una reserva
                          </> :
                          <>
                            <div className='flex flex-row'>
                              <div className='w-1/2'>
                                <div className='flex flex-row'>
                                  <div className='w-1/2'>
                                    <div className='font-bold text-black'>Desde fecha:</div>
                                    <div>
                                      {fechaDesde}
                                    </div>
                                  </div>
                                  <div className='w-1/2'>
                                    <div className='font-bold text-black'>Hasta fecha:</div>
                                    <div>{fechaHasta}</div>
                                  </div>
                                </div>

                                <div className='flex flex-row mt-5'>
                                  <div className='w-1/2'>
                                    <div className='font-bold text-black'>Desde Hora:</div>
                                    <div>
                                      {startTime ? <>{`${String(startTime.hour).padStart(2, '0')}:${String(startTime.minute).padStart(2, '0')}`}</> : <>-</>}
                                    </div>
                                  </div>
                                  <div className='w-1/2'>
                                    <div className='font-bold text-black'>Hasta Hora:</div>
                                    <div>
                                      {endTime ? <>{`${String(endTime.hour).padStart(2, '0')}:${String(endTime.minute).padStart(2, '0')}`}</> : <>-</>}
                                      </div>
                                  </div>
                                </div>



                                <div className='font-bold text-black mt-5'>Tiempo reservado:</div>
                                <div>{priceData.hours} Horas</div>
                                <div className='font-bold text-black mt-5'>Costo:</div>
                                <div>{priceData.price} Bs.</div>
                                <div className='font-bold text-black mt-5'>Placa vehiculo:</div>
                                <div>{switchState ? placaSeleccionada : placa}</div>
                                <div className='font-bold text-black mt-5'>Espacio:</div>
                                <div>{filaSeleccionada}{columnaSeleccionada}</div>
                                <div className='font-bold text-black mt-5'>Usuario:</div>
                                <div>{nombreUsuario}</div>
                                <div className='font-bold text-black mt-5'>Rol:</div>
                                <div>{rolUsuario}</div>
                                <div className="mt-5">*Todo tiempo menor a una hora es redondeado a una hora para ser facturado</div>

                              </div>

                              <div className='flex justify-center items-center w-1/2'>
                                <QRCode value={`http://localhost:8000/${idDeuda}`} />
                              </div>

                            </div>
                          </>}



                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={modificarClick}>Modificar</AlertDialogCancel>
                      <AlertDialogAction onClick={pagarClick}>Pagar</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

              </CardFooter>
            </Card>
          </div>
        </div>

        <div className='w-1/2'>
          <div className='flex justify-center'>
            <Card className="w-[700px]">
              <CardHeader>
                <CardTitle>Parqueo</CardTitle>
              </CardHeader>
              <Parqueo onParqueoClick={handleParqueoClick}></Parqueo>
            </Card>
          </div>
        </div>



      </div>

    </>



  )
}

