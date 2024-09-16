'use client'

import { Button, Card, Col, Row } from "react-bootstrap";
import Pagina from "../components/Pagina";


export default function Objetos() {
     
    
    const carros = [
        { id: 1, marca: 'LB', modelo: 'Lamborghini A', ano: 2024, foto:'/images/lambor-01.jpg'},
        { id: 2, marca: 'VW', modelo: 'Fusca', ano: 1966, foto:'/images/fusca-02.jpg'},
        { id: 3, marca: 'Chevrolet', modelo: 'Opala', ano: 1982, foto:'/images/opala-03.jpg'},
        { id: 4, marca: 'Chevrolet', modelo: 'Chevette', ano: 1973, foto:'/images/chevette-04.jpg'},
        { id: 5, marca: 'Ferrari', modelo: 'Ferrari O', ano: 2018, foto:'/images/ferrari-05.jpg'}
    ];
//
    return (
        <Pagina titulo="Objetos">
            <Row> {/* Row representa uma linha da tabela*/}
                {carros.map(item => (
                    <Col   key={item.id} md={4} className="mt-3"> {/* Col representa uma coluna, mt significa margin top, espaçamento*/}
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={item.foto} />
                            <Card.Body>
                                  
                                <Card.Title>{`${item.marca} - ${item.modelo}`}
                                
                                <Row>
                                    <Col>
                                    <b>Ano</b>:{item.ano}
                                    </Col>
                                </Row>

                                </Card.Title>
                                <Card.Text>
                                    
                                </Card.Text>
                                <Button variant="primary">Detalhes</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Pagina>
    )
}