import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";

import { Textarea } from "../../../components/ui/textarea"
import { Button } from "../../../components/ui/button";

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
} from "../../../components/ui/alert-dialog"


const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    }
})



// import axios from 'axios'; // Para las solicitudes HTTP. Puedes usar cualquier biblioteca o fetch

export class TableBasic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRows: [],
            data: [
                ["Joe James", "3030ABC", "69459869", 'marcoserrano008@gmail.com'],
                ["John Walsh", "3030ABC", "69459869", 'marcoserrano008@gmail.com'],
                ["Bob Herm", "3030ABC", "69459869", 'marcoserrano008@gmail.com'],
                ["James Houston", "3030ABC", "69459869", 'marcoserrano008@gmail.com'],
                ["Joe James", "3030ABC", "69459869", 'marcoserrano008@gmail.com'],
                ["John Walsh", "3030ABC", "69459869", 'marcoserrano008@gmail.com'],
                ["Bob Herm", "3030ABC", "69459869", 'marcoserrano008@gmail.com'],
                ["James Houston", "3030ABC", "69459869", 'marcoserrano008@gmail.com'],
                ["Joe James", "3030ABC", "69459869", 'marcoserrano008@gmail.com'],
                ["John Walsh", "3030ABC", "69459869", 'marcoserrano008@gmail.com'],
                ["Bob Herm", "3030ABC", "69459869", 'marcoserrano008@gmail.com'],
                ["James Houston", "3030ABC", "69459869", 'marcoserrano008@gmail.com'],
                ["Joe James", "3030ABC", "69459869", 'marcoserrano008@gmail.com'],
                ["John Walsh", "3030ABC", "69459869", 'marcoserrano008@gmail.com'],
                ["Bob Herm", "3030ABC", "69459869", 'marcoserrano008@gmail.com'],
                ["James Houston", "3030ABC", "69459869", 'marcoserrano008@gmail.com']
            ]
        };
    }

    postData = async (selectedRows) => {

        try {
            // const response = await axios.post('http://example.com/api', selectedRows);
            // console.log('Respuesta de la API: ', response);
            console.log(selectedRows);
        } catch (error) {
            console.error('Error enviando datos a la API: ', error);
        }
    }

    handleRowSelectionChange = (currentRowsSelected, allRowsSelected, rowsSelected) => {
        let selectedData = rowsSelected.map(index => this.state.data[index]);
        this.setState({ selectedRows: selectedData });
    }
    render() {
        const columns = ["Nombre", "Placa Vehiculo", "Celular", "Correo"];
        const options = {
            filterType: 'checkbox',
            onRowSelectionChange: this.handleRowSelectionChange,
        }

        return (
            <>
                <div className="flex flex-col">
                    <div className="font-extrabold text-xl">Enviar Mensaje</div>
                    <div>
                        <div className="flex flex-row mt-10">
                            <div className="flex w-1/5 justify-end content-center mt-5 mr-5 font-bold text-lg">
                                Mensaje:
                            </div>
                            <div className="w-3/5">
                                <Textarea className="h-[150px]" placeholder="Ingrese el mensaje." />
                            </div>
                            <div className="w-1/5">
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
                                            <div>
                                                Se enviara el mensaje a los siguientes usuarios:
                                                <div>
                                                    Marco Antonio Serrano 69459869
                                                </div>
                                                <div>
                                                    Marco Antonio Serrano 69459869
                                                </div>
                                                <div>
                                                    Marco Antonio Serrano 69459869
                                                </div>
                                            </div>


                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction>Enviar</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>

                    <div className="mt-10 font-extrabold text-xl"> Seleccione los destinatarios: </div>
                    <div className="mt-10">
                        <div className="flex justify-center content-center">
                            <div className="w-[900px]">
                                <ThemeProvider theme={darkTheme}>
                                    <button onClick={() => this.postData(this.state.selectedRows)}>
                                        Enviar filas seleccionadas
                                    </button>
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