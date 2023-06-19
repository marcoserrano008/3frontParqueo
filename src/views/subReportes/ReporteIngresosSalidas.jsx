import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Button } from "../../../components/ui/button"

import { Input } from "../../../components/ui/input"

import { Label } from "../../../components/ui/label"
import { Link } from 'react-router-dom'
import { CustomCalendar } from '../../../components/custom/custom-calendar'
import { Activity, CreditCard, DollarSign, Download, Users, Car } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"

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
} from "../../../components/custom/alert-dialog"

import axiosClient from '../../axios-client';

import Parqueo from '../ParqueoFormulario/Parqueo';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

export default function ReporteIngresosSalidas() {
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFinal, setFechaFinal] = useState(null);
  const [invalidInterval, setInvalidInterval] = useState(false);


  const [fechaInicioEspacio, setFechaInicioEspacio] = useState(null);
  const [fechaFinalEspacio, setFechaFinalEspacio] = useState(null);

  const [filaSeleccionada, setFilaSeleccionada] = useState(null);
  const [columnaSeleccionada, setColumnaSeleccionada] = useState(null);

  const handleParqueoClick = (fila, columna) => {
    setFilaSeleccionada(fila);
    setColumnaSeleccionada(columna);
  }

  const [data, setData] = useState([]);

  const columns = [
    {
     name: "id_ingreso",
     label: "ID",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "hora_ingreso",
     label: "Hora Ingreso",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
      name: "hora_salida",
      label: "Hora Salida",
      options: {
       filter: true,
       sort: true,
      }
     },
    {
     name: "fecha_ingreso",
     label: "Fecha Ingreso",
     options: {
      filter: true,
      sort: true,
     }
    },

    {
      name: "fecha_salida",
      label: "Fecha Salida",
      options: {
       filter: true,
       sort: true,
      }
     },
     {
      name: "id_espacio",
      label: "Espacio",
      options: {
       filter: true,
       sort: true,
      }
     },
     {
      name: "placa",
      label: "Placa",
      options: {
       filter: true,
       sort: true,
      }
     },
   ];
  const options = {
    filterType: 'checkbox',
  }

  const [dataEspacio, setDataEspacio] = useState([]);

  const [numeroIngresos, setNumeroIngresos] = useState("-")
  const [numeroIngresosEspacio, setNumeroIngresosEspacio] = useState("-")

  const columnsEspacio = [
    {
     name: "id_ingreso",
     label: "ID",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "hora_ingreso",
     label: "Hora Ingreso",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
      name: "hora_salida",
      label: "Hora Salida",
      options: {
       filter: true,
       sort: true,
      }
     },
    {
     name: "fecha_ingreso",
     label: "Fecha Ingreso",
     options: {
      filter: true,
      sort: true,
     }
    },

    {
      name: "fecha_salida",
      label: "Fecha Salida",
      options: {
       filter: true,
       sort: true,
      }
     },
     {
      name: "placa",
      label: "Placa",
      options: {
       filter: true,
       sort: true,
      }
     },
   ];


  const [diasReporte, setDiasReporte] = useState("-")

  const generarReporte = () => {
    const dataToSend = { 
      desde_fecha:fechaInicio.toISOString().split('T')[0], 
      hasta_fecha:fechaFinal.toISOString().split('T')[0] 
    }
  
    axiosClient.post('/ingresos-por-fecha', dataToSend)
    .then(response => {
      console.log(response.data);
      setData(response.data)
      setNumeroIngresos(response.data.length)

      const start = new Date(fechaInicio);
      const end = new Date(fechaFinal);
      
      const diffInMs = Math.abs(end - start);
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

      setDiasReporte(diffInDays)
    })
    .catch(error => {
      console.error('Error al hacer la solicitud a la API: ', error);
    });

  }

  const [diasReporteEspacio, setDiasReporteEspacio] = useState("-")

  const generarReporteEspacio = () => {
    const dataToSend = { 
      desde_fecha:fechaInicioEspacio.toISOString().split('T')[0], 
      hasta_fecha:fechaFinalEspacio.toISOString().split('T')[0],
      id_espacio:`${filaSeleccionada}${columnaSeleccionada}`,

      
    }
  
    axiosClient.post('/ingresos-por-fecha-espacio', dataToSend)
    .then(response => {
      console.log(response.data);
      setDataEspacio(response.data)
      setNumeroIngresosEspacio(response.data.length)

      const start = new Date(fechaInicioEspacio);
      const end = new Date(fechaFinalEspacio);
      
      const diffInMs = Math.abs(end - start);
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

      setDiasReporteEspacio(diffInDays)
    })
    .catch(error => {
      console.error('Error al hacer la solicitud a la API: ', error);
    });

  }
  

  useEffect(() => {
    if (fechaInicio && fechaFinal) {
      if (fechaInicio > fechaFinal) {
        setInvalidInterval(true);
      } else {
        setInvalidInterval(false);
      }
    }
  }, [fechaInicio, fechaFinal]);


  return (
    <>
      <div className='flex flex-row'>
        <div className='flex w-1/2 text-2xl font-extrabold'>Reporte Ingresos y salidas</div>
        <div className='text-right w-1/2'>
          <Link to="/reportes"><Button>Regresar</Button></Link>
        </div>
      </div>
      <div className='flex-grow'>
        <div className='flex justify-center content-center'>
          <Tabs defaultValue="general" className='mt-10 w-[1200px]'>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="general">Todo el Parqueo</TabsTrigger>
              <TabsTrigger value="porEspacio">Por espacio</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Ver ingresos y salidas registradas 
                  </CardTitle>
                  <CardDescription>
                    Lista de ingresos y salidas registradas en la fecha seleccionada
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className='flex justify-center content-center'>
                    <div className="flex flex-col">

                      <div className='flex-grow text-slate-500'>
                        Seleccione un intervalo
                      </div>
                      <div className='flex justify-center content-center'>
                        <div className='w-[600px]'>
                          <div className='flex flex-row mt-5'>

                            <div className='flex justify-center content-center text-center text-lg font-bold w-1/2'>
                              <div className='flex flex-col'>
                                <div>Desde fecha: </div>
                                <CustomCalendar setDateExternally={setFechaInicio}></CustomCalendar>
                              </div>
                            </div>
                            <div className='flex justify-center content-center text-center text-lg font-bold w-1/2'>
                              <div className='flex flex-col'>
                                <div style={{ color: invalidInterval ? 'red' : 'black' }}>Hasta fecha:</div>
                                <CustomCalendar setDateExternally={setFechaFinal}></CustomCalendar>

                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                      {invalidInterval &&
                        <div style={{ color: 'red' }} className='flex justify-center content-center text-center mt-5'>
                          ***Intervalo no valido
                        </div>}
                      <div className='flex-grow text-center mt-5'>
                        <Button onClick={generarReporte}>
                          <div className='w-[550px]'>
                            Generar
                          </div>
                        </Button>
                      </div>
                      <div className='flex justify-center content-center  '>
                        <div className='flex mt-5 '>
                          <Card className='w-[580px]'>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">
                                Ingresos registrados al parqueo 
                              </CardTitle>
                              <Car className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">{numeroIngresos}</div>
                              <p className="text-xs text-muted-foreground">
                                En {diasReporte} dias
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                      <div>
                        <div className='flex justify-center content-center'>
                          <div className="mt-1">
                            <div className="flex justify-center content-center">
                              <div className="w-[900px]">
                                <div className='font-semibold text-lg mt-5 mb-5'>Detalle: </div>
                                <MUIDataTable
                                  title={"Ingresos y Salidas del parqueo"}
                                  data={data}
                                  columns={columns}
                                  options={options}
                                />

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="porEspacio">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Ver Ingresos de dinero por espacios
                  </CardTitle>
                  <CardDescription>
                    Lista de ingresos de dinero para el espacio seleccionado
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">

                  <div className='flex justify-center content-center'>

                    <div className='flex flex-row'>
                      <div className='w-[600px]'>
                        <div className='flex flex-col'>
                          <div className='flex flex-row '>
                            <div className='flex flex-col'>
                              <div className='text-center text-lg font-bold'>Desde fecha:</div>
                              <div>
                                <CustomCalendar setDateExternally={setFechaInicioEspacio}></CustomCalendar>
                              </div>

                            </div>
                            <div className='flex flex-col ml-5'>
                              <div className='text-center text-lg font-bold'>
                                <div style={{ color: invalidInterval ? 'red' : 'black' }}>Hasta fecha:</div>
                                <CustomCalendar setDateExternally={setFechaFinalEspacio}></CustomCalendar>
                              </div>

                            </div>
                          </div>
                          {invalidInterval &&
                            <div style={{ color: 'red' }} className='flex justify-center content-center text-center mt-5'>
                              ***Intervalo no valido
                            </div>}

                          <div className='text-center mt-5'>
                            <Button onClick={generarReporteEspacio}>
                              <div className='w-[550px]'>
                                Generar
                              </div>
                            </Button>
                          </div>

                          <div className='flex justify-center content-center  '>
                            <div className='flex mt-5 '>
                              <Card className='w-[580px]'>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                  <CardTitle className="text-sm font-medium">
                                    Ingresos totales
                                  </CardTitle>
                                  <Car className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                  <div className="text-2xl font-bold">{numeroIngresosEspacio}</div>
                                  <p className="text-xs text-muted-foreground">
                                    En {diasReporteEspacio} dias
                                  </p>
                                </CardContent>
                              </Card>
                            </div>

                          </div>

                        </div>
                      </div>
                      <div className='w-[250px]'>
                        <div className='flex flex-col'>
                          <div className='text-center text-lg font-bold'>Seleccione el Espacio</div>
                          <div>
                            <div className='flex-grow content-center justify-center text-center'>


                              <AlertDialog className='bg-red-300's>
                                <AlertDialogTrigger asChild>

                                  <Button variant="link" className='w-[250px]'>
                                    <Card className='w-[150px] h-[100px] mt-[60px]'>
                                      <CardContent>
                                        <div className='text-5xl mt-6 font-semibold text-slate-600'>
                                          {filaSeleccionada}{columnaSeleccionada}
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </Button>

                                </AlertDialogTrigger>
                                <AlertDialogContent >
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>SELECCIONE UN ESPACIO - SELECCIONADO: {filaSeleccionada}{columnaSeleccionada}</AlertDialogTitle>
                                    <AlertDialogDescription>

                                      <div className='bg-red-300'>
                                        <Parqueo onParqueoClick={handleParqueoClick}></Parqueo>
                                      </div>

                                    </AlertDialogDescription>
                                    <AlertDialogContent>
                                      <div>
                                        Contenido
                                      </div>
                                    </AlertDialogContent>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction>Aceptar</AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>

                            </div>


                          </div>
                        </div>
                      </div>
                    </div>

                  </div>


                  <div className='flex justify-center content-center'>
                    <div className="flex flex-col">
                      <div>
                        <div className='flex justify-center content-center'>
                          <div className="mt-1">
                            <div className="flex justify-center content-center">
                              <div className="w-[900px]">
                                <div className='font-semibold text-lg mt-5 mb-5'>Detalle: </div>
                                <MUIDataTable
                                  title={"Ingresos y salidas para el espacio seleccionado"}
                                  data={dataEspacio}
                                  columns={columnsEspacio}
                                  options={options}
                                />

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>



    </>

  )
}
