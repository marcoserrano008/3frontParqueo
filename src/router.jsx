import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Users from "./views/Users";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import UserForm from "./views/UserForm";

import ReservaSimple from "./views/ReservaSimple";
import ReservaDetallada from "./views/ReservaDetallada";
import Accesos from "./views/Accesos";
import Reservas from "./views/Reservas";
import Cobros from "./views/Cobros";
import Reportes from "./views/Reportes";
import Guardias from "./views/Guardias";
import Historial from "./views/Historial";
import Deudas from "./views/Deudas";
import Precios from "./views/Precios";
import Cuenta from "./views/Cuenta";
import OpcionesAdministrador from "./views/OpcionesAdministrador";
import OpcionesGuardia from "./views/OpcionesGuardia";
import OpcionesCliente from "./views/OpcionesCliente";
import Comunicados from "./views/Comunicados";
import ParqueoFormulario from "./views/ParqueoFormulario";
import {Mensajes} from "./views/Mensajes";
import {Usuarios} from "./views/Usuarios";

import ReporteDinero from "./views/subReportes/ReporteDinero"
import ReporteIngresosSalidas from "./views/subReportes/ReporteIngresosSalidas"
import ReporteRegistros from "./views/subReportes/ReporteRegistros"
import ReporteReservas from "./views/subReportes/ReporteReservas"

import { TableBasic } from "./views/usuarios2/TableBasic";
import Accesosos from "./views/Accesosos";
import EditarParqueo from "./views/EditarParqueo";
import RegistrarVehiculo from "./views/RegistrarVehiculo";
// import Page from "./views/payments/page"
const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {path: '/users', element: <Users />}, 
            {path: '/dashboard', element: <Dashboard />},
            {path: '/', element: <Navigate to = "/parqueo" />},
            {path: '/users/new', element: <UserForm key="userCreate"/>},
            {path: '/users/:id', element: <UserForm key="userUpdate"/>},

            {path: '/parqueo', element: <ParqueoFormulario/>},
            {path: '/reservaSimple', element: <ReservaSimple/>},
            {path: '/reservaDetallada', element: <ReservaDetallada/>},
            {path: '/accesos', element: <Accesosos/>},
            {path: '/reservas', element: <Reservas/>},
            {path: '/cobros', element: <Cobros/>},
            {path: '/reportes', element: <Reportes/>},
            {path: '/guardias', element: <Guardias/>},
            {path: '/historial', element: <Historial/>},
            {path: '/deudas', element: <Deudas/>},
            {path: '/comunicados', element: <Comunicados/>},
            {path: '/precios', element: <Precios/>},
            // {path: '/cuenta', element: <Cuenta/>},
            {path: '/cuenta', element: <Cuenta/>},
            {path: '/opcionesAdministrador', element: <OpcionesAdministrador/>},
            {path: '/opcionesGuardia', element: <OpcionesGuardia/>},
            {path: '/opcionesCliente', element: <OpcionesCliente/>},
            {path: '/enviar-mensajes', element: <Mensajes/>},
            {path: '/usuarios', element: <Usuarios/>},

            {path: '/reporteDinero', element: <ReporteDinero/>},
            {path: '/reporteIngresosSalidas', element: <ReporteIngresosSalidas/>},
            {path: '/reporteRegistros', element: <ReporteRegistros/>},
            {path: '/reporteReservas', element: <ReporteReservas/>},
            {path: '/editarParqueo', element: <EditarParqueo/>},
            {path: '/registrarVehiculo', element: <RegistrarVehiculo/>},
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }, 
])

export default router;