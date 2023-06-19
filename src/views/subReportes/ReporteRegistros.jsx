import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Button } from "../../../components/ui/button"

import { Input } from "../../../components/ui/input"

import { Label } from "../../../components/ui/label"
import { Link } from 'react-router-dom'
import { CustomCalendar } from '../../../components/custom/custom-calendar'
import { Activity, CreditCard, DollarSign, Download, Users, Car, Newspaper } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"

import Typography from '@mui/material/Typography';

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



import Parqueo from '../ParqueoFormulario/Parqueo';

import axiosClient from '../../axios-client';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

export default function ReporteRegistros() {
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFinal, setFechaFinal] = useState(null);
  const [invalidInterval, setInvalidInterval] = useState(false);

  const [filaSeleccionada, setFilaSeleccionada] = useState(null);
  const [columnaSeleccionada, setColumnaSeleccionada] = useState(null);

  const handleParqueoClick = (fila, columna) => {
    setFilaSeleccionada(fila);
    setColumnaSeleccionada(columna);
  }

  const [data, setData] = useState([]);

  const columns = [
    {
     name: "id_usuario",
     label: "ID",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "nombre",
     label: "Nombre",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
      name: "email",
      label: "Correo Electronico",
      options: {
       filter: true,
       sort: true,
      }
     },
    {
     name: "ci",
     label: "CI",
     options: {
      filter: true,
      sort: true,
     }
    },

    {
      name: "edad",
      label: "Edad",
      options: {
       filter: true,
       sort: true,
      }
     },
   ];
  const options = {
    filterType: 'checkbox',
  }

  const [usuariosRegistrados, setUsuariosRegistrados] = useState("-")
  const [diasReporte, setDiasReporte] = useState("-")

  const generarReporte = () => {

      const desde_fecha = fechaInicio.toISOString().split('T')[0]
      const hasta_fecha = fechaFinal.toISOString().split('T')[0] 

  
    axiosClient.get(`/users/${desde_fecha}/${hasta_fecha}`)
    .then(response => {
      console.log(response.data);
      setData(response.data)
      setUsuariosRegistrados(response.data.length)

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
        <div className='flex w-1/2 text-2xl font-extrabold'>Reporte Usuarios Registrados</div>
        <div className='text-right w-1/2'>
          <Link to="/reportes"><Button>Regresar</Button></Link>
        </div>
      </div>
      <div className='flex-grow'>
        <div className='flex justify-center content-center'>
        <Card>
                <CardHeader>
                  <CardTitle>
                    Lista de usuarios registrados
                  </CardTitle>
                  <CardDescription>
                    Seleccione una fecha
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className='flex justify-center content-center'>
                    <div className="flex flex-col">

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
                                Usuarios Registrados
                              </CardTitle>
                              <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">{usuariosRegistrados}</div>
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
                                  title={"Lista de empleados"}
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
        </div>
      </div>



    </>

  )
}
