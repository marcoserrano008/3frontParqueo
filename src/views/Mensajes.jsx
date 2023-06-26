import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import axios from 'axios';
import imagenQR from "../imgs/qr1.png"
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
import axiosClient from "../axios-client";

const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    }
})

export class Mensajes extends React.Component {

   
    constructor(props) {
        super(props);
        this.state = {
            selectedRows: [],
            data: [],
            mensaje: '', // Agrega esto para mantener el estado del mensaje
        };
    }

    componentDidMount() {
        axiosClient.get('/list-all-usuarios')
            .then(response => {
                let data = response.data.map(usuario => [usuario.name, usuario.apellido_paterno, usuario.apellido_materno, usuario.celular]);
                this.setState({ data: data });
            })
            .catch(error => {
                console.error('Error obteniendo datos de la API: ', error);
            });
    }

    postData = async () => { // Remueve 'selectedRows' ya que puedes acceder a través del estado
        try {
            let numeros = [];
            this.state.selectedRows.forEach(row => { // Usar 'this.state.selectedRows'
                numeros.push(String(row[3]));
            });
            let body = {
                "mensaje": this.state.mensaje, // Usa 'this.state.mensaje'
                "destinatarios": numeros
            }
            console.log(body)
            axiosClient.post('/enviar-mensaje', body)
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.error('Error al hacer la solicitud a la API: ', error);
            });
        } catch (error) {
            console.error('Error enviando datos a la API: ', error);
        }
    }

    handleRowSelectionChange = (currentRowsSelected, allRowsSelected, rowsSelected) => {
        let selectedData = rowsSelected.map(index => this.state.data[index]);
        this.setState({ selectedRows: selectedData });
    }

    // Método para manejar el cambio del mensaje
    handleMensajeChange = (e) => {
        this.setState({ mensaje: e.target.value });
    }

    render() {
        const columns = ["Nombre", "Apellido Paterno", "Apellido Materno", "Celular"];
        const options = {
            filterType: 'checkbox',
            onRowSelectionChange: this.handleRowSelectionChange,
        }
    
        return (
            <>
                <div className="flex flex-col">
                    <div className="font-extrabold text-xl">Enviar Mensajesss</div>
                    <div>
                        <div className="flex flex-row mt-10">
                            <div className="flex w-1/5 justify-end content-center mt-5 mr-5 font-bold text-lg">
                                Mensaje:
                            </div>
                            <div className="w-3/5">
                                <Textarea 
                                    className="h-[150px]" 
                                    placeholder="Ingrese el mensaje."
                                    value={this.state.mensaje} // Usa 'this.state.mensaje'
                                    onChange={this.handleMensajeChange} // Agrega este método para manejar los cambios
                                />
                            </div>
                            <div className="w-1/5">
                            </div>
                        </div>


                        <div className="flex justify-center content-center mt-5">
                            <div>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button >Enviar Mensaje</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>CONFIRMAR ENVIO</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            <>
                                                Enviar mensajes
                                            </>
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => this.postData(this.state.selectedRows)}>Enviar</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            </div>

                            <div className="ml-10">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button >Habilitar Numero</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Habilitar Numero</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            <>
                                                Escanee el QR
                                            </>
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <div className="borded border-black ">
                                    <img  src={imagenQR} alt="Descripción de la imagen" />
                                    </div>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction>Aceptar</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            </div>

                        </div>
                    </div>

                    <div className="mt-10 font-extrabold text-xl"> Seleccione los destinatarios: </div>
                    <div className="mt-10">
                        <div className="flex justify-center content-center">
                            <div className="w-[900px]">
                                <ThemeProvider theme={darkTheme}>
                                    {/* <button onClick={() => this.postData(this.state.selectedRows)}>
                                        Enviar filas seleccionadas
                                    </button> */}
                                    <MUIDataTable
                                        title={"Lista de empleados"}
                                        data={this.state.data}
                                        columns={columns}
                                        options={options}
                                    />
                                </ThemeProvider>
                            </div>
                        </div>


                    </div>

                </div>

            </>

        )
    }
}