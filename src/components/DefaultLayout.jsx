import React, { useEffect } from 'react'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios-client'
import {
    PresentationChartBarIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    CursorArrowRippleIcon,
    TruckIcon,
    ShieldCheckIcon,
    UserGroupIcon,
    ArrowsUpDownIcon,
    TableCellsIcon,
    QrCodeIcon,
    DocumentChartBarIcon,
    ChatBubbleBottomCenterIcon,
    ListBulletIcon,
    ChartPieIcon,
    MegaphoneIcon,
    CurrencyDollarIcon,



} from "@heroicons/react/24/solid";
import { Card, Typography, List, ListItem, ListItemPrefix } from "@material-tailwind/react";

export default function DefaultLayout() {
    const { user, token, notification, setUser, setToken, setRol, rol } = useStateContext()
    const asideClass = `aside-${rol.rol}`;
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" />
    }

    const onLogout = (e) => {
        e.preventDefault()
        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
            })
    }

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data)
            })
    }, [])

    useEffect(() => {
        axiosClient.get('/rol')
            .then(({ data }) => {
                setRol(data)
            })
    }, [])

    return (
        <div id="defaultLayout" style={{ display: 'flex' }}>
            <Card className="fixed top-4 left-4 h-[calc(100vh-2rem)] w-full max-w-[17rem] p-4 shadow-blue-gray-900/5 bg-black text-white rounded-lg border-2 border-white shadow-3xl">
                <div className="mb-2 p-4">
                    <Typography variant="h5" color="blue-gray">
                        PARQUEO
                    </Typography>
                </div>
                <List>

                    <Link to="/parqueo">
                        <ListItem className={location.pathname === "/parqueo" ? "bg-white text-black" : "" + " hover:bg-gray-700 hover:text-white"}>
                            <ListItemPrefix>
                                <TruckIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Parqueo
                        </ListItem>
                    </Link>

                    <Link to="/reservaSimple">
                        <ListItem className={location.pathname === "/reservaSimple" ? "bg-white text-black" : "" + " hover:bg-gray-700 hover:text-white"}>
                            <ListItemPrefix>
                                <CursorArrowRippleIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Reserva Continua
                        </ListItem>
                    </Link>

                    <Link to="/reservaDetallada">
                        <ListItem className={location.pathname === "/reservaDetallada" ? "bg-white text-black" : "" + " hover:bg-gray-700 hover:text-white"}>
                            <ListItemPrefix>
                                <CursorArrowRippleIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Reserva por intervalos
                        </ListItem>
                    </Link>

                    {rol.rol === 'administrador' &&
                        <>
                            <Link to="/opcionesAdministrador">
                                <ListItem className={location.pathname === "/opcionesAdministrador" ? "bg-white text-black" : "" + " hover:bg-gray-700 hover:text-white"}>
                                    <ListItemPrefix>
                                        <ShieldCheckIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    Opciones Administrador
                                </ListItem>
                            </Link>

                            <Link to="/accesos">
                                <ListItem className={location.pathname === "/accesos" ? "bg-white text-black" : "" + " hover:bg-gray-700 hover:text-white"}>
                                    <ListItemPrefix>
                                        <ArrowsUpDownIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    Accesos
                                </ListItem>
                            </Link>

                            <Link to="/users">
                                <ListItem className={location.pathname === "/users" ? "bg-white text-black" : "" + " hover:bg-gray-700 hover:text-white"}>
                                    <ListItemPrefix>
                                        <UserGroupIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    Usuarios
                                </ListItem>
                            </Link>

                            <Link to="/reservas">
                                <ListItem className={location.pathname === "/reservas" ? "bg-white text-black" : "" + " hover:bg-gray-700 hover:text-white"}>
                                    <ListItemPrefix>
                                        <TableCellsIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    Ver Reservas
                                </ListItem>
                            </Link>


                            <Link to="/reportes">
                                <ListItem className={location.pathname === "/reportes" ? "bg-white text-black" : "" + " hover:bg-gray-700 hover:text-white"}>
                                    <ListItemPrefix>
                                        <ChartPieIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    Reportes
                                </ListItem>
                            </Link>

                            <Link to="/guardias">
                                <ListItem className={location.pathname === "/guardias" ? "bg-white text-black" : "" + " hover:bg-gray-700 hover:text-white"}>
                                    <ListItemPrefix>
                                        <Cog6ToothIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    Guardias
                                </ListItem>
                            </Link>

                            <Link to="/enviar-mensajes">
                                <ListItem className={location.pathname === "/enviar-mensajes" ? "bg-white text-black" : "" + " hover:bg-gray-700 hover:text-white"}>
                                    <ListItemPrefix>
                                        <ChatBubbleBottomCenterIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    Enviar Mensajes
                                </ListItem>
                            </Link>

                            {/* <Link to="/usuarios">
                                <ListItem className={location.pathname === "/usuarios" ? "bg-white text-black" : "" + " hover:bg-gray-700 hover:text-white"}>
                                    <ListItemPrefix>
                                        <UserGroupIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    Usuarios
                                </ListItem>
                            </Link> */}
                            {/* (resto de los ListItem para administrador...) */}
                        </>
                    }
                    {rol.rol === 'guardia' &&
                        <>
                            <Link to="/opcionesGuardia">
                                <ListItem className={location.pathname === "/opcionesGuardia" ? "bg-white text-black" : "" + " hover:bg-gray-700 hover:text-white"}>
                                    <ListItemPrefix>
                                        <UserCircleIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    Opciones Guardia
                                </ListItem>
                            </Link>

                            <Link to="/accesos">
                                <ListItem>
                                    <ListItemPrefix>
                                        <ArrowsUpDownIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    Accesos
                                </ListItem>
                            </Link>
                            {/* (resto de los ListItem para guardia...) */}
                        </>
                    }
                    {rol.rol === 'cliente' &&
                        <>
                            <Link to="/opcionesCliente">
                                <ListItem className={location.pathname === "/opcionesCliente" ? "bg-white text-black" : "" + " hover:bg-gray-700 hover:text-white"}>
                                    <ListItemPrefix>
                                        <UserCircleIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    Mis Vehiculos
                                </ListItem>
                            </Link>

                            <Link to="/historial">
                                <ListItem className={location.pathname === "/historial" ? "bg-white text-black" : "" + " hover:bg-gray-700 hover:text-white"}>
                                    <ListItemPrefix>
                                        <ListBulletIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    Historial
                                </ListItem>
                            </Link>
                            {/* (resto de los ListItem para cliente...) */}
                        </>
                    }
                    <Link to="/comunicados">
                        <ListItem className={location.pathname === "/comunicados" ? "bg-white text-black" : "" + " hover:bg-gray-700 hover:text-white"}>
                            <ListItemPrefix>
                                <MegaphoneIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Comunicados
                        </ListItem>
                    </Link>

                    <Link to="/precios">
                        <ListItem className={location.pathname === "/precios" ? "bg-white text-black" : "" + " hover:bg-gray-700 hover:text-white"}>
                            <ListItemPrefix>
                                <CurrencyDollarIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Precios
                        </ListItem>
                    </Link>

                    <Link to="/cuenta">
                        <ListItem className={location.pathname === "/cuenta" ? "bg-white text-black" : "" + " hover:bg-gray-700 hover:text-white"}>
                            <ListItemPrefix>
                                <UserCircleIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Cuenta
                        </ListItem>
                    </Link>

                    {/* Similar changes to all ListItems... */}
                </List>
            </Card>

            <div className='flex-grow mr-0' style={{ marginLeft: '18rem' }}>
                <div>

                </div>
                <header className="fixed right-3 flex items-center justify-between px-6 py-2 bg-black text-white shadow-md mt-5 rounded-lg w-[250px] transition-all duration-200 hover:w-[500px] group">
                    <div className="flex text-2xl font-semibold">
                        TIS
                    </div>
                    <div className='mr-5'>
                        <div className="flex items-center ">
                            <span className="w-24 opacity-0 group-hover:opacity-100 transition-opacity duration-200">{user.name}</span>
                            <div className=''>
                                <a href='#' onClick={onLogout} className='btn-logout  bg-white text-black rounded hover:bg-red-700 transition-colors'>Logout</a>
                            </div>

                        </div>
                    </div>

                </header>



                <main className='mt-10'>
                    <Outlet />
                </main>
            </div>

            {notification &&
                <div className='notification'>
                    {notification}
                </div>
            }
        </div>
    )
}
