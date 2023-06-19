import React, { useEffect, useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"

import { Button } from "../../components/ui/button"
import axiosClient from '../axios-client'
import { Link } from 'react-router-dom'

export default function OpcionesCliente() {

  const [vehiculos, setVehiculos] = useState([])
  const [loading, setLoading] = useState(false)

  const { setNotification } = useStateContext()

  useEffect(() => {
    getVehiculos();
  }, [])

  const onDelete = (vehiculo) => {
    if (!window.confirm("Estas seguro que quieres eliminar esta reserva")) {
      return
    }

    axiosClient.put(`/delete-vehiculo/${vehiculo.id_vehiculo}`)
      .then(() => {
        setNotification('El vehiculo fue eliminado correctamente, recargue la pagina')
        getVehiculos()
      })
  }

  const getVehiculos = () => {
    setLoading(true)
    axiosClient.get('/list-vehiculo')
      .then(({ data }) => {
        setLoading(false)
        console.log(data);
        setVehiculos(data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (

    <>
      <div className='text-4xl font-bold'>Mis vehiculos
      <Link to="/registrarVehiculo"><Button className='ml-10'>Registrar vehiculo</Button></Link>
      </div>
      <div className='flex justify-center content-center'>
        <div className='w-[1200px] mt-10'>
          <Table>
            <TableCaption>Lista de Vehiculos</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead>Placa</TableHead>
                <TableHead>Opciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehiculos.map((vehiculo) => (
                <TableRow key={vehiculo.id_vehiculo}>
                  <TableCell className="font-medium">{vehiculo.id_vehiculo}</TableCell>
                  <TableCell>{vehiculo.marca}</TableCell>
                  <TableCell>{vehiculo.colo}</TableCell>
                  <TableCell>{vehiculo.modelo}</TableCell>
                  <TableCell>{vehiculo.placa}</TableCell>
                  <TableCell>
                    <Button onClick={ev => onDelete(vehiculo)} className='bg-red-800'>Eliminar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

    </>
  )
}
