import "./Navigation.css"

import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import CinemasGlobalFilter from '../CinemasGlobalFilter/CinemasGlobalFilter';
import MoviesGlobalFilter from '../MoviesGlobalFilter/MoviesGlobalFilter';

import { Link } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";

const Navigation = ({ currentFamilyPath, setShowModal }) => {

    const { loggedUser, setLoggedUser } = useContext(AuthContext)

    console.log(currentFamilyPath)

    if (currentFamilyPath) {

        return (
            <div className="Navigation">
                <Navbar sticky="top" collapseOnSelect expand="lg">
                    <Container>
                        <Navbar.Brand to="/" as={Link} className="logo text-white">LA PREMIERE</Navbar.Brand>
                        <Nav className="me-auto ms-5">
                            {
                                currentFamilyPath === 'cines' ?
                                    <CinemasGlobalFilter currentFamilyPath={currentFamilyPath} />
                                    : currentFamilyPath === 'peliculas' ?
                                        <MoviesGlobalFilter currentFamilyPath={currentFamilyPath} />
                                        :
                                        null
                            }
                        </Nav>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse className="flex-grow-0" id="responsive-navbar-nav" >
                            <Nav className="ms-auto">

                                <Nav.Link to="/cines" className="text-white" as={Link}><span>Cines</span></Nav.Link>
                                <Nav.Link to="/peliculas" className="text-white" as={Link}><span>Películas</span></Nav.Link>

                                {
                                    !loggedUser &&

                                    <Nav.Link as="button" onClick={() => setShowModal(true)} className="text-white">Iniciar sesión</Nav.Link>
                                }

                                {
                                    loggedUser &&

                                    <NavDropdown title="Administrar" id="collapsible-nav-dropdown">

                                        <NavDropdown.Item to="/cines/crear" as={Link}>Añadir nuevo cine</NavDropdown.Item>
                                        <NavDropdown.Item to="/peliculas/crear" as={Link}>Añadir nueva película</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/cines/eliminados" as={Link}>Recuperar Cine</NavDropdown.Item>
                                        <NavDropdown.Item to="/peliculas/eliminados" as={Link}>Recuperar Película</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item className="delete-button" as="button" onClick={() => setLoggedUser(false)}>Cerrar sesión</NavDropdown.Item>

                                    </NavDropdown>
                                }


                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div >
        )
    }
}

export default Navigation