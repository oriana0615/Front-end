'use client'

import Pagina from "@/app/components/Pagina"
import apiDisney from "@/services/apiDisney"
import { useState } from "react"
import { Table } from "react-bootstrap"

export default function Tabela() {

    const [princesas, setPrincesas] = useState([])

    apiDisney.get('/character').then(resultado => (

        setPrincesas(resultado.data.data)



    ))



    return (

        <>

            <Pagina titulo='Tabela'>



            <Table className="mt-3" striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Foto</th>
                            </tr>

                            </thead>
                            <tbody>

                                {/* só coloquei a parte que quero repetir da tabela, que no caso são os dados, o resto deixo de fora do meu loop */}

                {princesas.map(item => (


                   
                        
                      
                       
                            <tr key= {item._id}>
                                <td>{item._id}</td>
                                <td>{item.name}</td>
                                <td> <img height={50} src={item.imageUrl}/></td>
                                
                            </tr>
                            
                     


                ))}

                </tbody>
                    </Table>






            </Pagina>


        </>


    )




}