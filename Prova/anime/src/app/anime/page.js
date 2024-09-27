'use client'

import { useEffect, useState } from "react";
import { Container, Nav, NavDropdown, Navbar, Table } from "react-bootstrap";
import apiAnime from "../services/apiAnime";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";

import Pagina from "../components/Pagina";

export default function PageJS() {

    const [animes, setAnimes] = useState([])

    useEffect(() => {
        apiAnime.get('anime').then(resultado => {
            setAnimes(resultado.data.data)
        })
    }, [])


    return (
        <Pagina titulo="Animes">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Detalhes</th>
                        <th>Título</th>
                        <th>Duração</th>
                        <th>Ano</th>
                    </tr>
                </thead>
                <tbody>
                    {animes.map(item => (
                        <tr>
                            <td>
                                <Link href={`/anime/${item.mal_id}`}>
                                    <IoIosSearch className="text-primary" />
                                </Link>
                            </td>
                            <td>{item.title}</td>
                            <td>{item.duration}</td>
                            <td>{item.year}</td>
                        </tr>
                    ))}

                </tbody>
            </Table>
        </Pagina>
    )
}