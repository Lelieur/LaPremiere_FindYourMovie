import { Container, Nav, Navbar, NavDropdown, Form, Row, Col } from 'react-bootstrap';

import CinemasGlobalFilter from '../CinemasGlobalFilter/CinemasGlobalFilter';
import MoviesGlobalFilter from '../MoviesGlobalFilter/MoviesGlobalFilter';

import { Link } from 'react-router-dom';

const Navigation = currentFamilyPath => {

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
                        <Form>
                            <Row>
                                <Col xs="auto">


                                    {

                                        currentFamilyPath.currentFamilyPath === 'cines' ?
                                            <CinemasGlobalFilter />
                                            : currentFamilyPath.currentFamilyPath === 'peliculas' ?
                                                <MoviesGlobalFilter />
                                                :
                                                null
                                    }
                                </Col>
                            </Row>
                        </Form>
                        <Nav>
                            <NavDropdown title="Administrar" id="collapsible-nav-dropdown">
                                <NavDropdown.Item to="/cines/crear" as={Link}>Añadir nuevo cine</NavDropdown.Item>
                                <NavDropdown.Item to="/peliculas/crear" as={Link}>Añadir nueva película</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item to="/cines/eliminados" as={Link}>Recuperar Cine</NavDropdown.Item>
                                <NavDropdown.Item to="/peliculas/eliminados" as={Link}>Recuperar Película</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Navigation