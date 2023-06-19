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

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  const{setNotification} = useStateContext()

  useEffect(() => {
    getUsers();
  }, [])

  const onDelete = (u) => {
    if(!window.confirm("Estas seguro que quieres eliminar este usuario")){
      return
    }

    axiosClient.delete(`/users/${u.id}`)
      .then(() => {
        setNotification('El usuario fue eliminado correctamente')
        getUsers()
      })
  }

  const getUsers = () => {
    setLoading(true)
    axiosClient.get('/users')
      .then(({data}) => {
        setLoading(false)
        console.log(data);
        setUsers(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }



  return (
    <>
    <div className='text-4xl font-semibold'>Lista de Usuarios    </div>
<div className='flex justify-center content-center'>
<div className='w-[1200px] mt-10'>
    <Table>
      <TableCaption>Lista de Usuarios</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Correo</TableHead>
          <TableHead>Fecha de creacion</TableHead>
          <TableHead>Opciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.created_at}</TableCell>
            <TableCell>
              
              <Button className='mr-2 bg-orange-400 text-black'>
                <Link to={'/users/'+user.id} >Editar</Link>
              </Button>
              <Button onClick={ev => onDelete(user)} className='bg-red-800'>Eliminar</Button>
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
