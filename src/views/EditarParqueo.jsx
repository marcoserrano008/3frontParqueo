import React, { useState } from 'react'

import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
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
  SelectLabel,
} from "../../components/ui/select"

import EditorEspacios from './ParqueoFormulario/EditorEspacios';

import { Link } from 'react-router-dom'
import { SelectGroup } from '@radix-ui/react-select'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'

export default function EditarParqueo() {
  const [filaSeleccionada, setFilaSeleccionada] = useState(null);
  const [columnaSeleccionada, setColumnaSeleccionada] = useState(null);
  const [estadoEspacio, setEstadoEspacio] = useState("");

  const [selectedAction, setSelectedAction] = useState(null);

  const handleClick = () => {
    let endpoint;
    // Dependiendo del valor seleccionado, elige el endpoint
    switch (selectedAction) {
        case 'Eliminar':
            endpoint = '/api/eliminar';
            break;
        case 'Mostrar':
            endpoint = '/api/mostrar';
            break;
        default:
            // Puedes decidir qué hacer si no se selecciona ninguna opción
            return;
    }

    if(filaSeleccionada && columnaSeleccionada){
      const postData = {
        espacio: `${filaSeleccionada}${columnaSeleccionada}`,
        accion: selectedAction
      }

      axiosClient.post('/modificar-espacio', postData)
      .then(response => {
        console.log(response.data);
        setNotification('Espacio Modificado con exito, actualice la pagina')
      })
      .catch(error => {
        console.error('Error al hacer la solicitud a la API: ', error);
      });
      console.log(postData)
    }

    const data = { filaSeleccionada, columnaSeleccionada }; // Asegúrate de que estas variables existen en el scope

    console.log(selectedAction)
    // Haz la solicitud POST
  
}


  const handleParqueoClick = (fila, columna) => {
    setFilaSeleccionada(fila);
    setColumnaSeleccionada(columna);
  } 

  const { setNotification } = useStateContext()

  return (
    <>
      <div className='flex flex-row'>
        <div className='flex w-1/2 text-2xl font-extrabold'>Editar Parqueo</div>
        <div className='text-right w-1/2'>
          <Link to="/parqueo"><Button>Regresar</Button></Link>
        </div>
      </div>

      <div className="flex flex-row">


        <div className="flex w-1/2 ">
          <div className="flex-grow-0">
            <div className="flex content-center justify-center">
              <Card className="w-[700px]">
                <CardHeader className="text-4xl font-bold">
                  Parqueo
                </CardHeader>
                <CardContent>
                  <EditorEspacios onParqueoClick={handleParqueoClick} />
                </CardContent>
              </Card>
            </div>

          </div>

        </div>
        <div className="flex w-1/2 justify-center content-center">
          <div className="flex flex-col">
            <div className="flex h-[320px] ">
              <div className="flex justify-center content-center ">
                <Card className="w-[500px] h-[300px]">
                  <CardHeader >
                    <CardContent>
                      <div className="flex flex-col mt-8">
                        <div className="flex flex-row">
                          <div className="h-[50px] w-[35px] bg-green-700 rounded-md border-white">
                          </div>
                          <div className="ml-5 text-2xl mt-2">Espacio Libre</div>
                        </div>

                        <div className="flex flex-row mt-5">
                          <div className="h-[50px] w-[35px] bg-red-700 rounded-md border-white">
                          </div>
                          <div className="ml-5 text-2xl mt-2">Espacio Ocupado</div>
                        </div>
                        <div className="flex flex-row mt-5">
                          <div className="h-[50px] w-[35px] bg-orange-400 rounded-md border-white">
                          </div>
                          <div className="ml-5 text-2xl mt-2">Espacio Reservado</div>
                        </div>

                      </div>

                    </CardContent>
                  </CardHeader>
                </Card>
              </div>
            </div>
            <div className="flex justify-center content-center h-[400px]">
              <Card className="w-[500px] h-[400px]">
                <CardHeader >
                  <CardContent>
                    <div className="flex flex-col text-center mt-10">
                      <div className="text-2xl font-bold">Espacio Seleccionado</div>
                      <div className="flex justify-center content-center">
                        <Card className="w-[120px] h-[65px] mt-5">
                          <CardContent className="text-4xl mt-3">{filaSeleccionada}{columnaSeleccionada}</CardContent>
                        </Card>
                      </div>

                      <div className="text-2xl font-bold mt-10">Accion:</div>
                      <div className="flex justify-center content-center">
                        <div className='flex justify-center content-center w-[150px]'>
                        <Select onValueChange={setSelectedAction}>
                          <SelectTrigger className="w-[180px] text-xl mt-5">
                            <SelectValue placeholder="Accion" />
 
                          </SelectTrigger>
                          <SelectContent className='text-xl'>
                            <SelectGroup>
                            
                            <SelectItem value="Eliminar" className='text-xl'>Eliminar</SelectItem>
                              <SelectItem value="Mostrar" className='text-xl'>Mostrar</SelectItem>
                            </SelectGroup>

                            </SelectContent>
                        </Select>
                        </div>

                      </div>


                    </div>

                  </CardContent>
                </CardHeader>
              </Card>
            </div>
            <div className="flex mt-10 justify-center content-center">


              <Button className="text-xl w-[200px] h-[50px] bg-blue-500 hover:bg-blue-600" onClick={handleClick}>
                Aceptar</Button>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
