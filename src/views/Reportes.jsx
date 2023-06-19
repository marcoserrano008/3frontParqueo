import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"

import { Activity, CreditCard, DollarSign, Download, Users, Car, Newspaper } from "lucide-react"
import { Button } from "../../components/ui/button"

import { Input } from "../../components/ui/input"

import { Label } from "../../components/ui/label"
import { Link } from 'react-router-dom'


export default function Reportes() {
  return (
    <>
      <div className='text-4xl font-extrabold mb-5'>Reportes</div>
      <div className='flex flex-col'>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Ingresos de Dinero</CardTitle>
              <CardDescription>Detalle global de los ingresos de dinero</CardDescription>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Ingresos del dia
                      </CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>

                    <CardContent>


                      <div className="text-2xl font-bold">Bs.160</div>
                      <p className="text-xs text-muted-foreground">
                        +20.1% mas que ayer
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Ingresos de la semana
                      </CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Bs.480</div>
                      <p className="text-xs text-muted-foreground">
                        +180.1% mas que la anterior semana
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Ingresos del mes</CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Bs. 260</div>
                      <p className="text-xs text-muted-foreground">
                        +19% mas que la anterior semana
                      </p>
                    </CardContent>
                  </Card>
                  <Button className='h-full font-semibold text-lg bg-slate-700'>
                    <Link to="/reporteDinero">Ver Reporte de Ingresos de dinero</Link>
                  </Button>


                </div>


              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <div className='mt-10'>
          <Card>
            <CardHeader>
              <CardTitle>Ingresos y salidas de vehiculos</CardTitle>
              <CardDescription>Detalle global de los ingresos de dinero</CardDescription>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Ingresos y salidas del dia
                      </CardTitle>
                      <Car className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>

                    <CardContent>


                      <div className="text-2xl font-bold">46</div>
                      <p className="text-xs text-muted-foreground">
                        +20.1% respecto al mes anterior
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Ingresos y salidas de la semama
                      </CardTitle>
                      <Car className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">290</div>
                      <p className="text-xs text-muted-foreground">
                        +180.1% respecto al anterior mes
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Ingresos y salidas del mes</CardTitle>
                      <Car className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">820</div>
                      <p className="text-xs text-muted-foreground">
                        +19% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Button className='h-full font-semibold text-lg bg-slate-700'>
                    <Link to="/reporteIngresosSalidas">Ver Reporte de Ingresos y Salidas de Vehiculos</Link>
                  </Button>


                </div>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <div className='mt-10'>
          <Card>
            <CardHeader>
              <CardTitle>Registro de Clientes</CardTitle>
              <CardDescription>Detalle global de los usuarios registrados</CardDescription>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Clientes registrados hoy
                      </CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>

                    <CardContent>


                      <div className="text-2xl font-bold">7</div>
                      <p className="text-xs text-muted-foreground">
                        +20.1% respecto al anterior mes
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Clientes registrados esta semana
                      </CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">60</div>
                      <p className="text-xs text-muted-foreground">
                        +180.1% respecto al anterior mes
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Clientes registrados este mes</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">139</div>
                      <p className="text-xs text-muted-foreground">
                        +19% respecto al anterior mes
                      </p>
                    </CardContent>
                  </Card>
                  <Button className='h-full font-semibold text-lg bg-slate-700'>
                    <Link to="/reporteRegistros">Ver Reporte de Registro de clientes</Link>
                  </Button>


                </div>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <div className='mt-10'>
          <Card>
            <CardHeader>
              <CardTitle>Reservas</CardTitle>
              <CardDescription>Detalle global de las reservas realizadas</CardDescription>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Reservas realizadas hoy
                      </CardTitle>
                      <Newspaper className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">25</div>
                      <p className="text-xs text-muted-foreground">
                        +20.1% mas que ayer
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Reservas esta semana
                      </CardTitle>
                      <Newspaper className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">120</div>
                      <p className="text-xs text-muted-foreground">
                        +180.1% mas que el anterior mes
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Reservas este mes</CardTitle>
                      <Newspaper className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">220</div>
                      <p className="text-xs text-muted-foreground">
                        +19% mas que el anterior mes
                      </p>
                    </CardContent>
                  </Card>
                  <Button className='h-full font-semibold text-lg bg-slate-700'>
                    <Link to="/reporteReservas">Ver Reporte de Reservas</Link>
                  </Button>
                </div>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
      </div>
    </>


  )
}
