import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";

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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../components/ui/card"




const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    }
})



// import axios from 'axios'; // Para las solicitudes HTTP. Puedes usar cualquier biblioteca o fetch

export class Usuarios extends React.Component {
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
                ["James Houston", "3030ABC", "69459869", 'marcoserrano008@gmail.com'],
                ["James Houston", "2020CBA", "69459869", 'marcoserrano008@gmail.com']
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
                    <div className="font-extrabold text-xl">Lista de Usuarios</div>





                    <div className='flex justify-center items-center'>
                        <div>
                        <Card className='h-[1000px]'>
                                        <CardHeader>
                                            <CardTitle>Lista de usuarios</CardTitle>
                                            <CardDescription>

                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <div className='flex justify-center content-center'>
                                                <div className="mt-1">
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

                                        </CardContent>
                                    </Card>
                        </div>
                    </div>


                </div>

            </>

        )
    }
}