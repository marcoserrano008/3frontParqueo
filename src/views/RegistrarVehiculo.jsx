import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { Button } from "../../components/ui/button"
import { useStateContext } from '../contexts/ContextProvider';

export default function RegistrarVehiculo() {
    const marcaRef = useRef();
    const colorRef = useRef();
    const modeloRef = useRef();
    const placaRef = useRef();

    const { setNotification } = useStateContext()

    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            marca: marcaRef.current.value,
            color: colorRef.current.value,
            modelo: modeloRef.current.value,
            placa: placaRef.current.value,
        }

        console.log(payload)
        axiosClient.post('/create-vehiculo', payload)
            .then(({ data }) => {
                setNotification("Vehiculo registrado")         
            })
            .catch(err => {
                console.log(err)
            })
    }
  return (
    <>
        <Link to="/opcionesCliente"><Button>Regresar</Button></Link>

        <div className='w-[500px] h-[100px] ml-[500px]'>

        <div className='login-signup-form animated fadeInDown w-[500px] h-[500px] ' >
            <div className='form '>
                <form onSubmit={onSubmit} >
                    <h1 className='title'>
                        Registrar Vehiculo
                    </h1>
                      <input ref={marcaRef} placeholder='Marca' />
                    <input ref={colorRef} placeholder='Color' />
                    <input ref={modeloRef} placeholder='Modelo' />
                    <input ref={placaRef} placeholder='Placa' />
                
                    <button className='btn btn-block'>Registrar</button>
                </form>
            </div>
        </div>
        </div>

    </>

  )
}
