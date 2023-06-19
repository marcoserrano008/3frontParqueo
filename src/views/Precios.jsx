import React from 'react'
import { Button } from "../../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"


import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion"

const precioDia = [
  { tiempo: "1 dia", costo: "30 Bs." },
  { tiempo: "2 dias", costo: "50 Bs." },
  { tiempo: "3 dias", costo: "70 Bs." },
  { tiempo: "4 dias", costo: "90 Bs." },
  { tiempo: "5 dias", costo: "110 Bs." },
  { tiempo: "6 dias", costo: "130 Bs." },
]

const precioHora = [
  { tiempo: "1 hora", costo: "3 Bs." },
  { tiempo: "2 horas", costo: "5 Bs." },
  { tiempo: "3 horas", costo: "7 Bs." },
  { tiempo: "4 horas", costo: "9 Bs." },
  { tiempo: "5 horas", costo: "11 Bs." },
  { tiempo: "6 horas", costo: "13 Bs." },
]

const precioSemana = [
  { tiempo: "1 semana", costo: "150 Bs." },
  { tiempo: "2 semanas", costo: "250 Bs." },
  { tiempo: "3 semanas", costo: "350 Bs." },
]

const precioMes = [
  { tiempo: "1 mes", costo: "400 Bs." },
  { tiempo: "2 meses", costo: "700 Bs." },
]


export default function Precios() {
  return (
    <>
      <div className='flex flex-col'>
        <div className='flex font-extrabold text-3xl'>Precios</div>
        <div className='flex justify-center items-center'>
          <div>
            <Tabs defaultValue="hora" className="w-[600px]">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="hora">Hora</TabsTrigger>
                <TabsTrigger value="diario">Diario</TabsTrigger>
                <TabsTrigger value="semanal">Semanal</TabsTrigger>
                <TabsTrigger value="mensual">Mensual</TabsTrigger>
              </TabsList>
              <TabsContent value="hora">
                <Card className='h-[590px]'>
                  <CardHeader>
                    <CardTitle>Costo por Horas</CardTitle>
                    <CardDescription>

                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className='flex justify-center content-center'>
                      <div className='w-[300px]'>
                        <Table >
                          <TableCaption>
                            <div className='flex flex-col '>
                              <div className='flex flex-row'>
                                <div className='text-black font-semibold'>Costo de la primera hora :</div>
                                <div>3 Bs.</div>
                              </div>
                              <div className='flex flex-row'>
                                <div className='text-black font-semibold'>Costo hora adicional :</div>
                                <div>2 Bs.</div>
                              </div>
                            </div>
                          </TableCaption>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[50px] text-center">Tiempo</TableHead>
                              <TableHead className="w-[50px] text-center">Costo</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {precioHora.map((precio) => (
                              <TableRow key={precio.tiempo}>
                                <TableCell className="font-medium text-center">{precio.tiempo}</TableCell>
                                <TableCell className="font-medium text-center" >{precio.costo}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>


                  </CardContent>
                  <CardFooter>
                    <Button>Reservar</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="diario">
                <Card className='h-[590px]'>
                  <CardHeader>
                    <CardTitle>Costo por dia</CardTitle>
                    <CardDescription>

                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className='flex justify-center content-center'>
                      <div className='w-[300px]'>
                        <Table >
                          <TableCaption>
                            <div className='flex flex-col '>
                              <div className='flex flex-row'>
                                <div className='text-black font-semibold'>Costo del primer dia :</div>
                                <div>30 Bs.</div>
                              </div>
                              <div className='flex flex-row'>
                                <div className='text-black font-semibold'>Costo dia adicional :</div>
                                <div>20 Bs.</div>
                              </div>
                            </div>
                          </TableCaption>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[50px] text-center">Tiempo</TableHead>
                              <TableHead className="w-[50px] text-center">Costo</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {precioDia.map((precio) => (
                              <TableRow key={precio.precioDia}>
                                <TableCell className="font-medium text-center">{precio.tiempo}</TableCell>
                                <TableCell className="font-medium text-center" >{precio.costo}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>


                  </CardContent>
                  <CardFooter>
                    <Button>Reservar</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="semanal">
                <Card className='h-[590px]'>
                  <CardHeader>
                    <CardTitle>Costo por semana</CardTitle>
                    <CardDescription>

                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className='flex justify-center content-center'>
                      <div className='w-[300px]'>
                        <Table >
                          <TableCaption>
                            <div className='flex flex-col '>
                              <div className='flex flex-row'>
                                <div className='text-black font-semibold'>Costo de la primera semana :</div>
                                <div>150 Bs.</div>
                              </div>
                              <div className='flex flex-row'>
                                <div className='text-black font-semibold'>Costo semana adicional :</div>
                                <div>100 Bs.</div>
                              </div>
                            </div>
                          </TableCaption>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[50px] text-center">Tiempo</TableHead>
                              <TableHead className="w-[50px] text-center">Costo</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {precioSemana.map((precio) => (
                              <TableRow key={precio.tiempo}>
                                <TableCell className="font-medium text-center">{precio.tiempo}</TableCell>
                                <TableCell className="font-medium text-center" >{precio.costo}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>


                  </CardContent>
                  <CardFooter>
                    <Button>Reservar</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="mensual">
                <Card className='h-[590px]'>
                  <CardHeader>
                    <CardTitle>Costo por mes</CardTitle>
                    <CardDescription>

                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className='flex justify-center content-center'>
                      <div className='w-[300px]'>
                        <Table >
                          <TableCaption>
                            <div className='flex flex-col '>
                              <div className='flex flex-row'>
                                <div className='text-black font-semibold'>Costo del primer mes :</div>
                                <div>400 Bs.</div>
                              </div>
                              <div className='flex flex-row'>
                                <div className='text-black font-semibold'>Costo mes adicional :</div>
                                <div>300 Bs.</div>
                              </div>
                            </div>
                          </TableCaption>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[50px] text-center">Tiempo</TableHead>
                              <TableHead className="w-[50px] text-center">Costo</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {precioMes.map((precio) => (
                              <TableRow key={precio.precioDia}>
                                <TableCell className="font-medium text-center">{precio.tiempo}</TableCell>
                                <TableCell className="font-medium text-center" >{precio.costo}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>


                  </CardContent>
                  <CardFooter>
                    <Button>Reservar</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className='flex font-extrabold text-3xl'>
          Preguntas Frecuentes
        </div>

        <div className='flex flex-row mt-4'>
          <div className='flex w-1/2 mr-20'>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className='font-bold text-xl'>¿Es necesario estar registrado para poder reservar?</AccordionTrigger>
                <AccordionContent>
                  Si. Necesita estar registrado.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className='font-bold text-xl'>¿Es posible realizar una reserva directamente en el parqueo?</AccordionTrigger>
                <AccordionContent>
                  Si. Puede realizar su reserva en el parqueo
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className='font-bold text-xl'>¿Solo se puede ingresar al parqueo con reserva previa?</AccordionTrigger>
                <AccordionContent>
                  No. Puede ingresar al parqueo en cualquier momento y sin reserva previa.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className='flex w-1/2 '>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className='font-bold text-xl'>¿Se puede pagar en efectivo?</AccordionTrigger>
                <AccordionContent>
                  Si. Si realiza la reserva en el parqueo es posible realizar el pago en efectivo
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className='font-bold text-xl'>¿Cuales son los horarios de Apertura del parqueo?</AccordionTrigger>
                <AccordionContent>
                  <div>
                  Lun - Vie : 06:00 - 23:00
                  </div>
                  <div>
                  Sab - Dom: 06:00 - 22:00
                  </div>
                  
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className='font-bold text-xl'>¿Que pasa si excedo mi tiempo reservado?</AccordionTrigger>
                <AccordionContent>
                  Se cobrara el tiempo adicional que ha estado en el parqueo.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

      </div>

    </>
  )
}
