import React, { useState, useEffect } from 'react'
import axiosClient from '../axios-client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"

export default function Comunicados() {
    const [comunicados, setComunicados] = useState([])
    
    useEffect(() => {
        axiosClient.get('/posts')
            .then(res => {
                console.log(res)
                setComunicados(res.data)

            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
      <>
        <div className='text-2xl font-extrabold'>COMUNICADOS</div>
        <div className='flex flex-col'>
          <div className='flex justify-center content-center' >
            <div className='w-[600px]'>
            {comunicados.map(comunicado => (
              <Card className='mt-10'>
                <CardHeader> 
                  
                </CardHeader>

                <CardContent> 
                
                <div className='flex flex-col' key={comunicado.id}>
                  <div className='flex flex-row'>
                      <div className='font-extrabold'> Comunicado: </div>
                      <div> {comunicado.message}</div>
                  </div>
                  <div className='flex flex-row'>
                      <div className='font-extrabold'> Desde: </div>
                      <div>{comunicado.fechaInicio}</div>
                  </div>
                  <div className='flex flex-row'>
                      <div className='font-extrabold'> Hasta: </div>
                      <div>{comunicado.fechaFinal}</div>
                  </div>
                  <img src={`https://4backendparqueo-production.up.railway.app${comunicado.image}`} alt="Imagen de Comunicado" />
                  <div>

                  </div>
                </div>
                
                </CardContent>
              </Card>
              ))}
            </div>
          </div>

        </div>
      </>

    )
}
