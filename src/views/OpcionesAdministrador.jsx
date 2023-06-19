import React, { useEffect, useState } from 'react'


import axiosClient from '../axios-client'

import { CustomCalendar } from '../../components/custom/custom-calendar'
import { Textarea } from "../../components/ui/textarea"
import { Button } from "../../components/ui/button";
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
} from "../../components/ui/alert-dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { useStateContext } from '../contexts/ContextProvider';
 

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"


export default function OpcionesAdministrador() {
  const [image, setImage] = useState(null);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFinal, setFechaFinal] = useState(null);
  const [invalidInterval, setInvalidInterval] = useState(false);
  const [message, setMessage] = useState("");

  const handleTextChange = (event) => {
    setMessage(event.target.value);
  };

  const [loading, setLoading] = useState(false)
  const { setNotification } = useStateContext()

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileType = file["type"];
    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    
  
    if (file && validImageTypes.includes(fileType)) {
      setImage(file);  // Guarda el archivo, no la URL del objeto
    } else {
      alert("Por favor, sube una imagen en formato .jpg, .jpeg o .png");
    }
  };
  
  const handleSubmit = async () => {
    // Crea un nuevo objeto FormData
    let formData = new FormData();
    formData.append('message', message);
    formData.append('image', image);

    let fechaInicioIso = new Date(fechaInicio).toISOString().substring(0, 10);
    let fechaFinalIso = new Date(fechaFinal).toISOString().substring(0, 10);

    formData.append('fechaInicio', fechaInicioIso);
    formData.append('fechaFinal', fechaFinalIso);
    // Imprime el contenido del objeto FormData en la consola
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {

      axiosClient.post('/posts', formData)
      .then(({data}) => {
        console.log(data)
        setNotification("Se publico el comunicado con exito")
    })
    .catch(err => {
        const response = err.response;
        if(response && response.status === 422){
            console.log(response.data.errors);
            setErrors(response.data.errors);
        }
        console.log(err)
    })
      console.log(formData)
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const [errors, setErrors] = useState({});

  const [posts, setPosts] = useState([])

  useEffect(() => {
    getPosts();
  }, [])

  const onDelete = (p) => {
    if (!window.confirm("Estas seguro que quieres eliminar esta reserva")) {
      return
    }

    axiosClient.delete(`/delete-post/${p.id}`)
      .then(() => {
        setNotification('El usuario fue eliminado correctamente')
        getUsers()
      })
  }

  const getPosts = () => {
    setLoading(true)
    axiosClient.get('/list-all-posts')
      .then(({ data }) => {
        setLoading(false)
        console.log(data);
        setPosts(data)
      })
      .catch(() => {
        setLoading(false)
      })
  }



  return (
    <div>
      <div className='flex flex-col'>
        <div className="text-4xl font-semibold">Enviar Comunicado</div>

        <div>
          <div className='flex flex-col'>
            <div className='flex-grow text-slate-500'>
              Seleccione un intervalo
            </div>
            <div className='flex justify-center content-center'>
              <div className='w-[600px]'>
                <div className='flex flex-row mt-5'>

                  <div className='flex justify-center content-center text-center text-lg font-bold w-1/2'>
                    <div className='flex flex-col'>
                      <div>Desde fecha: </div>
                      <CustomCalendar setDateExternally={setFechaInicio}></CustomCalendar>
                    </div>
                  </div>
                  <div className='flex justify-center content-center text-center text-lg font-bold w-1/2'>
                    <div className='flex flex-col'>
                      <div style={{ color: invalidInterval ? 'red' : 'black' }}>Hasta fecha:</div>
                      <CustomCalendar setDateExternally={setFechaFinal}></CustomCalendar>

                    </div>
                  </div>

                </div>
              </div>
            </div>
            {invalidInterval &&
              <div style={{ color: 'red' }} className='flex justify-center content-center text-center mt-5'>
                ***Intervalo no valido
              </div>}
          </div>
          <div className="flex flex-row mt-10">
            <div className="flex w-1/5 justify-end content-center mt-5 mr-5 font-bold text-lg">
              Mensaje:
            </div>
            <div className="w-3/5">
              <Textarea className="h-[150px]" placeholder="Ingrese el mensaje." onChange={handleTextChange} />
            </div>

          </div>
          <div className='flex justify-center content-center'>
            <div className='flex mt-10'>
              <Card>
                <CardHeader className='font-bold text-lg'>
                  Subir Imagen:
                </CardHeader>
                <CardContent>
                  <div>
                    <input type="file" name="image" onChange={handleImageChange} />
                    {image && <img src={URL.createObjectURL(image)} alt="Imagen cargada" style={{ width: '200px' }} />}
                    </div>
                </CardContent>
              </Card>
            </div>
          </div>


          <div className="flex justify-center content-center mt-5">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button >Enviar Mensaje</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>CONFIRMAR ENVIO</AlertDialogTitle>
                  <AlertDialogDescription>
                    
                      ¿Esta seguro que desea enviar el mensaje a todos los usuarios?
                    


                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSubmit}> Enviar</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      <div className='text-4xl font-semibold'>Lista de Comunicados</div>
      <div className='flex justify-center content-center'>
        <div className='w-[800px] mt-10'>
          <Table>
            <TableCaption>Lista de Comunicados</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Mensaje</TableHead>
                <TableHead>Desde fecha</TableHead>
                <TableHead>Hasta fecha</TableHead>
                <TableHead>Opciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.id}</TableCell>
                  <TableCell>{post.message}</TableCell>
                  <TableCell>{post.fechaInicio}</TableCell>
                  <TableCell>{post.fechaFinal}</TableCell>

                  <TableCell>
                    <Button onClick={ev => onDelete(post)} className='bg-red-800'>Eliminar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>

  )
}
