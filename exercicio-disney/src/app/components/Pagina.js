import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

export default function Pagina(props) {
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">Fundamentos</Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Fundamentos</Nav.Link>
                        <Nav.Link href="/clientes">Clientes</Nav.Link>
                        <Nav.Link href="/array">Array</Nav.Link>
                        <Nav.Link href="/cards">Cards</Nav.Link>
                        <Nav.Link href="/nomes">Nomes</Nav.Link>
                        <Nav.Link href="/contador">Contador</Nav.Link>

                        {/* Dropdown Menu */}
                        <NavDropdown title="Disney" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/disney/cards">Cards</NavDropdown.Item>
                            <NavDropdown.Item href="/disney/carrossel">Carrossel</NavDropdown.Item>
                            <NavDropdown.Item href="/disney/tabela">Tabela</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <div className="bg-secondary text-white text-center p-3">
                <h1>{props.titulo}</h1>
            </div>

            <Container>
                {props.children}
            </Container>
        </>
    )
}
