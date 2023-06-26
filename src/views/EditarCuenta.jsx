import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider';
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
export default function EditarCuenta() {
  const { id } = useParams()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null);
  const { setNotification } = useStateContext()

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

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false)
          setUser(data)
          console.log(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    if (user.id) {
      axiosClient.put(`/users/${user.id}`, user)
        .then(() => {
          //todo show notification
          setNotification('Se ha modificado su cuenta')
          navigate('/cuenta')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            console.log(response.data.errors);
            setErrors(response.data.errors);
          }
        })
    } else {
      axiosClient.post(`/users`, user)
        .then(() => {
          setNotification('Se ha creado el usuario')
          navigate('/users')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            console.log(response.data.errors);
            setErrors(response.data.errors);
          }
        })
    }
  }

  return (
    <>
      {user.id &&
        <div className='flex flex-row'><div className='font-bold text-2xl'>Modificar mi cuenta</div>


          <Link to="/cuenta"><Button className='ml-[850px]'>Regresar</Button></Link>
        </div>

      }
      {!user.id && <h1>New user</h1>}
      <div className='flex justify-center content-center' >
        {loading && (
          <div className='text-centered'>Cargando...</div>
        )}
        {errors && <div className="alert">
          {Object.keys(errors).map(key => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>}

        {!loading &&
          <form className=" " onSubmit={onSubmit}>
            <div className='flex flex-col'>
              <div className='mt-10'>
                <Card className='w-[850px] mt-5'>

                  <CardContent>
                    <div className='flex flex-row'>
                      
                        <div className='flex flex-col mt-5  ml-5 w-[350px]'>
                          <div className='text-lg font-bold'>Nombres:</div>
                          <Input value={user.name} onChange={ev => setUser({ ...user, name: ev.target.value })} className='mt-1'></Input>

                          <div className='text-lg font-bold mt-3'>Apellido Paterno:</div>
                          <Input value={user.apellido_paterno} onChange={ev => setUser({ ...user, apellido_paterno: ev.target.value })} className='mt-1'></Input>

                          <div className='text-lg font-bold mt-3'>Apellido Materno:</div>
                          <Input value={user.apellido_materno} onChange={ev => setUser({ ...user, apellido_materno: ev.target.value })} className='mt-1'></Input>

                          <div className='text-lg font-bold mt-3'>Correo Electronico:</div>
                          <Input type='email' onChange={ev => setUser({ ...user, email: ev.target.value })} value={user.email} className='mt-1'></Input>
                        </div>
                        <div className='flex flex-col mt-2 ml-10 w-[350px]'>
                          <div className='text-lg font-bold mt-3'>Celular:</div>
                          <Input value={user.celular} onChange={ev => setUser({ ...user, celular: ev.target.value })} className='mt-1'></Input>

                          <div className='text-lg font-bold mt-3'>CI:</div>
                          <Input value={user.ci} onChange={ev => setUser({ ...user, ci: ev.target.value })} className='mt-1'></Input>

                          <div className='text-lg font-bold mt-3'>Contraseña:</div>
                          <Input type='password' onChange={ev => setUser({ ...user, password: ev.target.value })} className='mt-1'></Input>

                          <div className='text-lg font-bold mt-3'>Confirmar contraseña:</div>
                          <Input type="password" className='mt-1' onChange={ev => setUser({ ...user, password_confirmation: ev.target.value })}></Input>
                        </div>
                      




                    </div>

                  </CardContent>
                </Card>

              </div>
              <div className='flex justify-center content-center mt-5'>
                <Button className='h-[50px] w-[200px] text-lg'>Guardar</Button>
              </div>

            </div>
          </form>
        }
      </div>

    </>
  )
}
