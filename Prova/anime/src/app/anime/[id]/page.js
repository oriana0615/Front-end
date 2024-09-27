'use client'

import Pagina from "@/app/components/Pagina";
import apiAnime from "@/app/services/apiAnime";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { BsArrowLeftShort } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function Page({ params }) {

    const [anime, setAnime] = useState({})

    useEffect(() => {
        apiAnime.get(`anime/${params.id}`).then(resultado => {
            setAnime(resultado.data.data)
        })
    }, [])

    return (
        <Pagina titulo={anime.title}>
            {
                anime.mal_id &&
                <>
                    <Row>
                        <Col md={4}>
                            <Card border="danger">
                                <Card.Header className="bg-danger text-white" >Foto</Card.Header>
                                <Card.Body>
                                    <Card.Img variant="top" src={anime.images.jpg.image_url} />
                                    <a target="_blank" className="btn btn-primary mt-3" href={anime.images.jpg.image_url}>
                                        Ampliar <FaExternalLinkAlt  />
                                    </a>
                                </Card.Body>
                            </Card>
                            <Link href={'/anime'} className="mt-3 btn btn-success">
                                <BsArrowLeftShort /> Voltar
                            </Link>

                        </Col>
                        <Col md={8}>
                            <Card border="danger">
                                <Card.Header className="bg-danger text-white" >{anime.title}</Card.Header>
                                <Card.Body>
                                    <p><b>Episódios: </b>{anime.episodes}</p>
                                    <p><b>Status: </b>{anime.status}</p>
                                    <p><b>Ano: </b>{anime.year}</p>
                                    <p><b>Duração: </b>{anime.duration}</p>
                                    <p><b>Score: </b>{anime.score}</p>
                                    <p>{anime.synopsis}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </>
            }
        </Pagina>
    )

}