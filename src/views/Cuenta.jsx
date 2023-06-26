import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"

import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Link } from 'react-router-dom'
export default function Cuenta() {
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    ci: '',
    apellido_paterno: '',
    apellido_materno: '',
    fecha_nacimiento: '',
    celular: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axiosClient.get('/user')
      .then(({ data }) => {
        setLoading(false)
        setUser(data)
        console.log(data)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])


  return (
    <>
    <div className='text-2xl font-bold'>Mi cuenta</div>

      <div className='flex mt-10 justify-center content-center'>
        <Card className='w-[850px] mt-5'>

          <CardContent>
            <div className='flex flex-row'>

              <div className='flex flex-col mt-5  ml-5 w-[350px]'>
                <div className='text-lg font-bold'>Nombres:</div>
                <Input value={user.name} className='mt-1'></Input>

                <div className='text-lg font-bold mt-3'>Apellido Paterno:</div>
                <Input value={user.apellido_paterno} className='mt-1'></Input>

                <div className='text-lg font-bold mt-3'>Apellido Materno:</div>
                <Input value={user.apellido_materno} className='mt-1'></Input>

                <div className='text-lg font-bold mt-3'>Correo Electronico:</div>
                <Input type='email' value={user.email} className='mt-1'></Input>
              </div>
              <div className='flex flex-col mt-2 ml-10 w-[350px]'>
                <div className='text-lg font-bold mt-3'>Celular:</div>
                <Input value={user.celular} className='mt-1'></Input>

                <div className='text-lg font-bold mt-3'>CI:</div>
                <Input value={user.ci} className='mt-1'></Input>

              </div>

              



            </div>

          </CardContent>
        </Card>
        
      </div>

      <div className='flex justify-center content-center mt-10'>
      
        
          <Link to={'/editarCuenta/'+user.id} >
          <Button className='bg-orange-400 w-[200px] h-[60px] text-lg hover:bg-orange-600'>
            Editar
            </Button>
            </Link>
          
        </div>
    </>
  )
}
