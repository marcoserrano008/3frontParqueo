import React, { useEffect, useRef, useState } from 'react'
import '../styles/Accesos.css'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

import { Button } from "../../components/ui/button"

import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"


import QRCode from 'qrcode.react';
import Modal from 'react-modal';

import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

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
} from "../../components/custom/alert-dialog"
import { Car } from 'lucide-react';

export default function Accesosos() {
  const { setNotification } = useStateContext()
  const [filaSeleccionada, setFilaSeleccionada] = useState(null);
  const [columnaSeleccionada, setColumnaSeleccionada] = useState(null);

  const handleParqueoClick = (fila, columna) => {
    setFilaSeleccionada(fila);
    setColumnaSeleccionada(columna);
  }

  //1
  const [editando, setEditando] = useState(true);
  const handleAceptar = () => {
    setEditando(false);
  };

  const handleEditar = () => {
    setEditando(true);
    setSpaceId("-")
  };

  //2
  const [spaceId, setSpaceId] = useState("");
  

  //3

  const [licensePlate, setLicensePlate] = useState('');

  const handleInputChange = (e) => {
    setLicensePlate(e.target.value);
  };

  const handleRegister = () => {
    if (!editando) {
      console.log(licensePlate);
      console.log('hola');
      axiosClient.post('registrar-ingreso', {
        placa: licensePlate,
      })
        .then((response) => {
          setSpaceId(response.data.id_espacio);
          setNotification('Se ha registrado el ingreso')
        })
        .catch((error) => {
          if (error.response) {
            console.error('Server responded with status code', error.response.status);
            console.error('Response data:', error.response.data);
          } else if (error.request) {
            console.error('No response was received', error.request);
          } else {
            console.error('Error', error.message);
          }
        });
    }
  };

  //4
  const [editando2, setEditando2] = useState(true);
  const handleAceptar2 = () => {
    setEditando2(false);
  };

  const handleEditar2 = () => {
    setEditando2(true);
  };

  const [licensePlate2, setLicensePlate2] = useState('');

  const handleInputChange2 = (e) => {
    setLicensePlate2(e.target.value);
  };
  //5

  const [idDeuda, setIdDeuda] = useState();
  const [datoSalida, setDatoSalida] = useState([]);

  const [idSalida, setIdSalida] = useState();


  const handleRegister2 = () => {
    if (!editando2) {
      console.log(licensePlate2);
      console.log('hola2');
      axiosClient.post('registrar-salida', {
        placa: licensePlate2,
      })
        .then((response) => {
          setDatoSalida(response.data);
          setIngreso(response.data.hora_ingreso);
          setSalida(response.data.hora_salida);
          setDuracion(response.data.tiempo_estadia);
          setCosto(response.data.costo);
          setIdDeuda(response.data.id_deuda);
          setIdSalida(response.data.id_salida);
          setIdEspacio(response.data.id_espacio);
          setFechaIngreso(response.data.fecha_ingreso);
          setFechaSalida(response.data.fecha_salida);
          setNotification('Se ha registrado la salida')
        })
        .catch((error) => {
          if (error.response) {
            console.error('Server responded with status code', error.response.status);
            console.error('Response data:', error.response.data);
          } else if (error.request) {
            console.error('No response was received', error.request);
          } else {
            console.error('Error', error.message);
          }
        });
    }
  };

  //6
  const [idEspacio, setIdEspacio] = useState('-');
  const [ingreso, setIngreso] = useState('-');
  const [salida, setSalida] = useState('-');
  const [duracion, setDuracion] = useState('-');
  const [costo, setCosto] = useState('-');

  const [fechaIngreso, setFechaIngreso] = useState("-")
  const [fechaSalida, setFechaSalida] = useState("-")

  const pagarEfectivo = () => {
    const postData = {
      placa: licensePlate2,
      id_salida: idSalida,
      monto: costo,
      id_espacio: idEspacio,
    }
    axiosClient.post('pagar-efectivo', postData)
      .then((response) => {
        setIngreso("-")
        setSalida("-")
        setDuracion("-")
        setCosto("-")
        setIdEspacio("-")
        setFechaIngreso("-")
        setFechaSalida("-")
        setEditando2(true)
        setNotification('Se realizado el pago con exito')
      })
      .catch((error) => {
        if (error.response) {
          console.error('Server responded with status code', error.response.status);
          console.error('Response data:', error.response.data);
        } else if (error.request) {
          console.error('No response was received', error.request);
        } else {
          console.error('Error', error.message);
        }
      });

  }

  const pagarQr = () => {
    const postData = {
      placa: licensePlate2,
      id_salida: idSalida,
      monto: costo,
      id_espacio: idEspacio,
    }
    axiosClient.post('pagar-QR', postData)
      .then((response) => {
        setIngreso("-")
        setSalida("-")
        setDuracion("-")
        setCosto("-")
        setIdEspacio("-")
        setFechaIngreso("-")
        setFechaSalida("-")
        setEditando2(true)
        setNotification('Se realizado el pago con exito')
      })
      .catch((error) => {
        if (error.response) {
          console.error('Server responded with status code', error.response.status);
          console.error('Response data:', error.response.data);
        } else if (error.request) {
          console.error('No response was received', error.request);
        } else {
          console.error('Error', error.message);
        }
      });

  }

  return (
    <>
      <div className='flex flex-col'>
        <div className='h-[430px]'>
          <div className='flex flex-row'>
            <div id='1' className='w-1/3'>
              <div className='flex flex-col'>
                <div className='font-extrabold text-5xl'>Ingresos</div>
                <div className='font-extrabold text-4xl mt-5 text-center'>Placa Vehiculo:</div>
                <div className='flex justify-center content-center'>
                  <Input
                    className={`w-[250px] h-[100px] text-4xl border-slate-700 mt-5${editando ? '' : ' bg-gray-200'}`}
                    disabled={!editando}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='flex justify-center content-center'>
                  <Button className='mr-5 bg-green-600 hover:bg-green-800' onClick={handleAceptar} disabled={!editando}>
                    Aceptar
                  </Button>
                  <Button className='ml-5' onClick={handleEditar} disabled={editando}>
                    Editar
                  </Button>
                </div>
              </div>
            </div>
            <div id='2' className='w-1/3 ml-10 mr-10'>
              <Tabs defaultValue='simple'>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="simple">Ingreso Simple</TabsTrigger>
                  <TabsTrigger value="detallado">Ingreso detallado</TabsTrigger>
                </TabsList>
                <TabsContent value="simple">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        Ingreso simple:
                      </CardTitle>
                      <CardDescription>
                        Se asigna un espacio aleatorio
                      </CardDescription>

                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className='flex justify-center content-center'>
                        <Card className='w-[150px] h-[100px]'>
                          <CardContent className='text-6xl mt-4 text-center'>
                          {spaceId}
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="detallado">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        Ingreso detallado:
                      </CardTitle>
                      <CardDescription>
                        Seleccione un espacio
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className='flex justify-center content-center'>
                        <Card className='border-white'>
                          <CardContent className='text-6xl mt-4'>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>

                                <Button variant="link" className='w-[250px]'>
                                  <Card className='w-[150px] h-[100px]  '>
                                    <CardContent>
                                      <div className='text-6xl mt-5 text-black'>
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
                          </CardContent>
                        </Card>

                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            <div className='w-1/3'>
              <div className='flex content-center justify-center'>
                <Button className='w-[200px] h-[120px] text-3xl mt-20' onClick={handleRegister}>Registrar</Button>
              </div>

            </div>
          </div>
        </div>

        <div className='h-[430px]'>
          <div className='flex flex-row'>
            <div className='w-1/3'>
              <div className='flex flex-col'>
                <div className='font-extrabold text-5xl'>Salidas</div>
                <div className='font-extrabold text-4xl mt-5 text-center'>Placa Vehiculo:</div>
                <div className='flex justify-center content-center'>
                  <Input
                    className={`w-[250px] h-[100px] text-4xl border-slate-700 mt-5${editando2 ? '' : ' bg-gray-200'}`}
                    disabled={!editando2}
                    onChange={handleInputChange2}
                  />
                </div>
                <div className='flex justify-center content-center'>
                  <Button className='mr-5 bg-green-600 hover:bg-green-800' onClick={handleAceptar2} disabled={!editando2}>
                    Aceptar
                  </Button>
                  <Button className='ml-5' onClick={handleEditar2} disabled={editando2}>
                    Editar
                  </Button>
                </div>
              </div>
            </div>
            <div className='w-1/6'>
              <div className='flex content-center justify-center'>
                <Button className='w-[200px] h-[120px] text-3xl mt-20' onClick={handleRegister2}>Registrar</Button>
              </div>
            </div>
            <div className='w-3/6'>
              <Card className='ml-20 mr-20'>
                <CardHeader className='text-2xl font-extrabold'>
                  Detalle de pago:
                </CardHeader>
                <CardContent>
                  <div className='flex flex-col ml-[10px]'>

                    <div className='flex flex-row'>
                      <div className='w-1/2 ml-10'>
                        <div className='font-bold text-black text-xl'>Fecha ingreso:</div>
                        <div className="text-xl text-muted-foreground">{fechaIngreso}</div>
                      </div>
                      <div className='w-1/2'>
                        <div className='font-bold text-black text-xl'>Fecha salida:</div>
                        <div className="text-xl text-muted-foreground">{fechaSalida}</div>
                      </div>
                    </div>
                    <div className='flex flex-row mt-5'>
                      <div className='w-1/2 ml-10'>
                        <div className='font-bold text-black text-xl'>Hora ingreso:</div>
                        <div className="text-xl text-muted-foreground">{ingreso}</div>
                      </div>
                      <div className='w-1/2'>
                        <div className='font-bold text-black text-xl'>Hora salida:</div>
                        <div className="text-xl text-muted-foreground">{salida}</div>
                      </div>
                    </div>

                    <div className='ml-10 mt-5'>
                      <p className="text-xl font-bold leading-none">Duracion de la estadia:</p>
                      <p className="text-xl text-muted-foreground">{duracion}</p>
                    </div>

                    <div className='flex flex-row'>
                      <div className='w-1/2 ml-10'>
                        <div className='font-bold text-black text-xl'>Costo:</div>
                        <div className="text-xl text-muted-foreground">{costo} Bs.</div>
                      </div>
                      <div className='w-1/2'>
                        <div className='font-bold text-black text-xl'>Espacio:</div>
                        <div className="text-xl text-muted-foreground">{idEspacio}</div>
                      </div>
                    </div>

                    <div className='flex flex-row mt-5 ml-[100px]'>
                      <Button className='text-xl' onClick={pagarEfectivo}>Efectivo</Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className='ml-10 text-xl' >QR</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>DATOS DE LA RESERVA</AlertDialogTitle>
                            <AlertDialogDescription>
                              <div className='flex flex-row'>
                                <div className='w-1/2'>
                                  <div className='flex flex-row'>
                                    <div className='w-1/2'>
                                      <div className='font-bold text-black'>Fecha ingreso:</div>
                                      <div>{fechaIngreso}</div>
                                    </div>
                                    <div className='w-1/2'>
                                      <div className='font-bold text-black'>Fecha salida:</div>
                                      <div>{fechaSalida}</div>
                                    </div>
                                  </div>
                                  <div className='flex flex-row mt-5'>
                                    <div className='w-1/2'>
                                      <div className='font-bold text-black'>Hora ingreso:</div>
                                      <div>{ingreso}</div>
                                    </div>
                                    <div className='w-1/2'>
                                      <div className='font-bold text-black'>Hora salida:</div>
                                      <div>{salida}</div>
                                    </div>
                                  </div>
                                  <div className='font-bold text-black mt-5'>Estadia:</div>
                                  <div>{duracion}</div>
                                  <div className='font-bold text-black mt-5'>Costo:</div>
                                  <div>{costo} Bs.</div>
                                </div>
                                <div className='flex justify-center items-center w-1/2'>
                                  <QRCode value={`http://localhost:8000/${idDeuda}`} />
                                </div>
                              </div>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={pagarQr}>Pagar</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                    </div>

                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
