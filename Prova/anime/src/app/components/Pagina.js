import { useEffect, useState } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import apiAnime from "../services/apiAnime";

export default function Pagina(props) {

    const [generos, setGeneros] = useState([])

    useEffect(() => {
        apiAnime.get('genres/anime').then(resultado => {
            setGeneros(resultado.data.data)
        })
    }, [])


    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/anime">Animes</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/anime">Anime</Nav.Link>
                            <NavDropdown title="Gêneros" id="basic-nav-dropdown">
                                {generos.map(item => (
                                    <div key={item.mal_id}>
                                        <NavDropdown.Item href="#action/3.1">
                                            {item.name} ({item.count})
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                    </div>
                                ))}
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="bg-secondary text-white text-center py-4">
                <h1>{props.titulo}</h1>
            </div>

            <Container className="my-3">
                {props.children}
            </Container>
        </>
    )
}