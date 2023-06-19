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
    return { price: '-', hours: 0 };
  }

  // Crear objetos de fecha para la hora de inicio y de fin en la fecha "from"
  let start = new Date(dateRange.from);
  start.setHours(parseInt(startTime.hour), parseInt(startTime.minute));

  // Crear objetos de fecha para la hora de inicio y de fin en la fecha "to"
  let end = new Date(dateRange.to);
  end.setHours(parseInt(endTime.hour), parseInt(endTime.minute));

  // Calcular la diferencia en horas, redondear al alza
  let diffInHours = Math.abs(end - start) / (1000 * 60 * 60);
  diffInHours = Math.ceil(diffInHours);

  // Si la diferencia es negativa, devolver un guion y cero horas
  if (diffInHours <= 0) {
    return { price: '-', hours: 0 };
  }

  // Calcular el precio: 3 por la primera hora, 2 por cada hora adicional
  let price = 3 + 2 * (diffInHours - 1);

  return { price, hours: diffInHours };
}



export default function ReservaSimple() {

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
  useEffect(() => {
    // Asegúrate de que todas las variables necesarias están definidas
    if (startTime && endTime && selectedDate) {
      const data = calculatePriceAndHours(startTime, endTime, selectedDate);
      setPriceData(data);
    }
  }, [startTime, endTime, selectedDate, placa]);

  const [fechaDesde, setFechaDesde] = useState('')
  const [fechaHasta, setFechaHasta] = useState('')

  const [duracionMinutos, setDuracionMinutos] = useState('')


  const handleButtonClick = () => {
    // Asegúrate de que todas las variables necesarias están definidas
    if (startTime && endTime && selectedDate && placa) {
      const data = calculatePriceAndHours(startTime, endTime, selectedDate);

      // Convertir la fecha "from" a formato AAAA-MM-DD
      const fromDate = new Date(selectedDate.from);
      const formattedFromDate = `${fromDate.getFullYear()}-${String(fromDate.getMonth() + 1).padStart(2, '0')}-${String(fromDate.getDate()).padStart(2, '0')}`;

      //Agregar las fechas
      const fechaDesde = `${String(fromDate.getDate()).padStart(2, '0')}/${String(fromDate.getMonth() + 1).padStart(2, '0')}/${fromDate.getFullYear()}`
      setFechaDesde(fechaDesde)
      const toDate = new Date(selectedDate.to);
      const fechaHasta = `${String(toDate.getDate()).padStart(2, '0')}/${String(toDate.getMonth() + 1).padStart(2, '0')}/${toDate.getFullYear()}`
      setFechaHasta(fechaHasta);

      setDuracionMinutos(data.hours * 60)
      // Crear el objeto de datos para el POST
      const postData = {
        id_espacio: `${filaSeleccionada}${columnaSeleccionada}`,
        placa_vehiculo: placa,
        reservada_desde_fecha: formattedFromDate,
        reservada_desde_hora: `${String(startTime.hour).padStart(2, '0')}:${String(startTime.minute).padStart(2, '0')}`,
        duracion_minutos: data.hours * 60,
        tipo: 'hora',
        costo: data.price,
      };

      // Hacer una solicitud POST a la API con axios
      axiosClient.post('/create-reserva', postData)
        .then(response => {
          console.log(response.data);
          if (response.data.status === '0') {
            setChoqueReserva(true)
            setIdReserva(null)
          } else {
            setChoqueReserva(false)
            setIdReserva(response.data.reserva.id_reserva)
            setNombreUsuario(response.data.reserva.nombre_usuario)
            setRolUsuario(response.data.reserva.rol)
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
      id_reserva: idReserva,
      placa: placa,
      nombre_usuario: nombreUsuario,
      monto: priceData.price
    }
    axiosClient.post('/pagar-reserva', postData)
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
    axiosClient.delete(`/delete-reserva/${idReserva}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error al eliminar ', error);
      });
  }

  return (
    <>

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
                        <div className='flex flex-col space-y-1.5'  >
                          <Label htmlFor='hastahora'>Hasta Hora:</Label>
                          <TimePicker onChange={handleEndTimeChange} id="hastahora" ></TimePicker>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mt-2">
                      <Switch id="vehiculo-registrado" onClick={() => setSwitchState(!switchState)} />
                      <Label htmlFor="vehiculo-registrado">Vehiculo registrado</Label>
                    </div>

                    {switchState ? (
                      <div className="flex flex-col space-y-1.5 mt-2">
                        <Label htmlFor="name">Seleccione la placa:</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                            <SelectContent position="popper">
                              <SelectItem value="AAA1001">AAA1001</SelectItem>
                              <SelectItem value="AAA1002">AAA1002</SelectItem>
                              <SelectItem value="BBB1003">BBB1003</SelectItem>
                              <SelectItem value="CCC1001">CCC1001</SelectItem>
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
                    <Button onClick={handleButtonClick}>Pagar</Button>
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
                                <div className='font-bold text-black mt-5'>Usuario:</div>
                                <div>{nombreUsuario}</div>
                                <div className='font-bold text-black mt-5'>Rol:</div>
                                <div>{rolUsuario}</div>
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

