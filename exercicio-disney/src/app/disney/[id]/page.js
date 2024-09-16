'use client'

import Pagina from "@/app/components/Pagina";
import apiDisney from "@/services/apiDisney";
import { useEffect, useState } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
export default function Page({ params }) {

    const [personagem, setPersonagem] = useState({}) //se eu quero apenas retornar um objeto, coloco {} ao invés de []

    useEffect(() => {
        apiDisney.get(`character/ ${params.id}`).then(resultado => {
            setPersonagem(resultado.data.data)
        })
    }, [])



    return (
        <Pagina titulo="Disney Detalhes">

            {personagem._id && //Isto é um if, se tiver o que vem abaixo, execute o que vem abaixo

                <div>

                    <Row className="mt-3">
                        <Col md={4}>
                            <img src={personagem.imageUrl} />
                        </Col>
                        <Col>
                            <p><b>Nome: </b>{personagem.name}</p>
                            <p><b>Data Criação: </b>{personagem.createdAt}</p>
                            <p><a target="blank" href={personagem.sourceUrl}>Link</a></p>
                        </Col>
                        <Col md={8} className="mt-3">

                            <Card border="primary" >
                                <Card.Header className="bg-primary text-white">Filmes</Card.Header>
                                <Card.Body>
                                    <ListGroup>
                                        {personagem.films.map(item => (

                                            <ListGroup.Item key={item._id}>{item}</ListGroup.Item>


                                        ))}

                                    </ListGroup>
                                </Card.Body>
                            </Card>




                        </Col>


                      
                      
                        <Col md={4} className="mt-3">

                            <Card border="warning" >
                                <Card.Header className="bg-warning text-white">Filmes</Card.Header>
                                <Card.Body>
                                    <ListGroup>
                                        {personagem.tvShows.map(item => (

                                            <ListGroup.Item key={item._id}>{item}</ListGroup.Item>


                                        ))}

                                    </ListGroup>
                                </Card.Body>
                            </Card>




                        </Col>
                    </Row>

                </div>}



        </Pagina>
    )
}