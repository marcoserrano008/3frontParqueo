import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client'
import { Link } from 'react-router-dom'
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

export default function Reservas() {

  const [reservas, setReservas] = useState([])
  const [loading, setLoading] = useState(false)

  const { setNotification } = useStateContext()

  useEffect(() => {
    getUsers();
  }, [])

  const onDelete = (r) => {
    if (!window.confirm("Estas seguro que quieres eliminar esta reserva")) {
      return
    }

    axiosClient.delete(`/delete-reserva/${r.id_reserva}`)
      .then(() => {
        setNotification('El usuario fue eliminado correctamente')
        getUsers()
      })
  }

  const getUsers = () => {
    setLoading(true)
    axiosClient.get('/list-all-reservas')
      .then(({ data }) => {
        setLoading(false)
        console.log(data);
        setReservas(data)
      })
      .catch(() => {
        setLoading(false)
      })
  }


  return (
    <>
      <div className='text-4xl font-semibold'>Lista de Reservas</div>
      <div className='flex justify-center content-center'>
        <div className='w-[1200px] mt-10'>
          <Table>
            <TableCaption>Lista de Usuarios</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Espacio</TableHead>
                <TableHead>Desde fecha</TableHead>
                <TableHead>Hasta fecha</TableHead>
                <TableHead>Desde hora</TableHead>
                <TableHead>Hasta hora</TableHead>
                <TableHead>Placa</TableHead>
                <TableHead>Costo</TableHead>
                <TableHead>ID usuario</TableHead>
                <TableHead>Opciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservas.map((reserva) => (
                <TableRow key={reserva.id_reserva}>
                  <TableCell className="font-medium">{reserva.id_reserva}</TableCell>
                  <TableCell>{reserva.id_espacio}</TableCell>
                  <TableCell>{reserva.reservada_desde_fecha}</TableCell>
                  <TableCell>{reserva.reservada_hasta_fecha}</TableCell>
                  <TableCell>{reserva.reservada_desde_hora}</TableCell>
                  <TableCell>{reserva.reservada_hasta_hora}</TableCell>
                  <TableCell>{reserva.placa_vehiculo}</TableCell>
                  <TableCell>{reserva.costo}</TableCell>
                  <TableCell>{reserva.id_usuario}</TableCell>

                  <TableCell>
                    <Button onClick={ev => onDelete(reserva)} className='bg-red-800'>Eliminar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

    </>

  );
}
