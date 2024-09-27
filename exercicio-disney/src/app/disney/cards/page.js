'use client'

import Pagina from "@/app/components/Pagina"
import apiDisney from "@/services/apiDisney"
import { useState } from "react"
import { Button, Card, Col, Row } from "react-bootstrap"

export default function Cards() {

   
    const [princesas, setPrincesas] = useState([]) 

    
  

    apiDisney.get('/character').then(resultado => {
       
        setPrincesas(resultado.data.data) 
    
}, [])

    return (


        

            <Pagina titulo='Disney Cards'>

                
                <Row md={4}>
                    
                    
                    
                    {princesas.map(item => (
                    
                   

                    <Col key={item._id} className="mt-3">  

                        

                            <Card>
                            <Card.Img height={150} variant="top" src={item.imageUrl} />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

        </Pagina>
    )
}

