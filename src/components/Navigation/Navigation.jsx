import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className="Navigation">
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" data-bs-theme="dark" bg="dark">
                <Container>
                    <Navbar.Brand to="/" as={Link}>LA PREMIERE</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link to="/cines" as={Link}>Cines</Nav.Link>
                            <Nav.Link to="/peliculas" as={Link}>Películas</Nav.Link>
                        </Nav>
                        <Nav>
                            <NavDropdown title="Administrar" id="collapsible-nav-dropdown">
                                <NavDropdown.Item to="/cines/crear" as={Link}>Añadir nuevo cine</NavDropdown.Item>
                                <NavDropdown.Item to="/peliculas/crear" as={Link}>Añadir nueva película</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item to="/cines/eliminados" as={Link}>Recuperar Cine</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Navigation