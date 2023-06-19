import React, { useState, useEffect } from "react";

import '../styles/ParqueoFormulario/ParqueoFormulario.css';

import { Link } from 'react-router-dom'

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

import Parqueo from './ParqueoFormulario/Parqueo';
import axiosClient from "../axios-client";

const ParqueoFormulario = () => {

  const [filaSeleccionada, setFilaSeleccionada] = useState(null);
  const [columnaSeleccionada, setColumnaSeleccionada] = useState(null);
  const [estadoEspacio, setEstadoEspacio] = useState("");

  const [totalEspacios, setTotalEspacios] = useState("")
  const [espaciosLibres, setEspaciosLibres] = useState("")
  const [espaciosOcupados, setEspaciosOcupados] = useState("")


  const handleParqueoClick = (fila, columna) => {
    setFilaSeleccionada(fila);
    setColumnaSeleccionada(columna);
  }

  useEffect(() => {
    axiosClient.get('/dato-espacios')
    .then(({data}) => {
      console.log(data)
      setTotalEspacios(data.totalEspacios)
      setEspaciosLibres(data.espaciosLibres)
      setEspaciosOcupados(data.espaciosOcupados)
    })
    .catch(error => {
      console.log(error);
    })
  }, []);

  return (
    <div className="flex flex-row">


      <div className="flex w-1/2 ">
        <div className="flex-grow-0">
          <div className="flex content-center justify-center">
            <Card className="w-[700px]">
              <CardHeader className="text-4xl font-bold">
                Parqueo
              </CardHeader>
              <CardContent>
                <Parqueo onParqueoClick={handleParqueoClick} />
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
                  <div className="flex flex-col text-center">
                    <div className="text-2xl font-bold">Cantidad de espacios</div>
                    <div className="flex justify-center content-center">
                      <Card className="w-[120px] h-[65px]">
                        <CardContent className="text-4xl mt-3">{totalEspacios}</CardContent>
                      </Card>
                    </div>

                    <div className="text-2xl font-bold mt-5">Espacios Libres</div>
                    <div className="flex justify-center content-center">
                      <Card className="w-[120px] h-[65px]">
                        <CardContent className="text-4xl mt-3">{espaciosLibres}</CardContent>
                      </Card>
                    </div>

                    <div className="text-2xl font-bold mt-5">Espacios Ocupados</div>
                    <div className="flex justify-center content-center">
                      <Card className="w-[120px] h-[65px]">
                        <CardContent className="text-4xl mt-3">{espaciosOcupados}</CardContent>
                      </Card>
                    </div>

                  </div>

                </CardContent>
              </CardHeader>
            </Card>
          </div>
          <div className="flex mt-10 justify-center content-center">

            
            <Link to="/editarParqueo"><Button className="text-xl w-[200px] h-[50px]">Editar Parqueo</Button></Link>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParqueoFormulario;
