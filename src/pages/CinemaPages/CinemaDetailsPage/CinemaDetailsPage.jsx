import * as IMAGE_PATHS from '../../../consts/image-paths'

import { useState, useEffect, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

import axios from 'axios'
import { Container, Image, Row, Col, Carousel, Stack, Badge, Button, ButtonGroup, Card, Modal, Nav, Navbar, NavDropdown } from 'react-bootstrap'

import "./CinemaDetailsPage.css"
import CustomMap from '../../../components/CustomMap/CustomMap'
import Loader from '../../../components/Loader/Loader'
import { AuthContext } from '../../../contexts/auth.context'

const API_URL = "http://localhost:5005"

const CinemaDetailsPage = () => {

    const { loggedUser } = useContext(AuthContext)

    const { cinemaId } = useParams()
    const [cinema, setCinema] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()

    const [moviesInCinema, setMoviesInCinema] = useState([])

    useEffect(() => {
        fetchMoviesInCinema()
        fetchCinemaDetails()
    }, [])

    const fetchCinemaDetails = () => {
        axios
            .get(`${API_URL}/cinemas/${cinemaId}`)
            .then(response => {
                setCinema(response.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const fetchMoviesInCinema = () => {

        axios
            .get(`${API_URL}/movies/`)
            .then(response => {

                const { data: allMovies } = response

                const filteredMovies = allMovies.filter(eachMovie =>
                    Array.isArray(eachMovie.cinemaId) ?
                        eachMovie.cinemaId.includes(Number(cinemaId))
                        : eachMovie.cinemaId === Number(cinemaId)
                )

                setMoviesInCinema(filteredMovies)
            })
            .catch(err => console.log(err))
    }

    const handleCinemaDelete = () => {

        axios
            .get((`${API_URL}/movies/`))
            .then(response => {

                const { data: allMovies } = response

                const filteredMovies = allMovies.filter(eachMovie => {
                    return (cinema.movieId.includes(eachMovie.id))
                })

                filteredMovies.map(eachMovie => {

                    let copyMovieToEdit = {
                        ...eachMovie
                    }

                    const newCinemasIds =
                        Array.isArray(copyMovieToEdit.cinemaId) ?
                            copyMovieToEdit.cinemaId.filter(eachCinemaId => {
                                return (eachCinemaId !== cinema.id)
                            }) :
                            copyMovieToEdit.cinemaId === cinema.id ?
                                copyMovieToEdit.cinemaId = [] :
                                copyMovieToEdit.cinemaId

                    copyMovieToEdit = {
                        ...eachMovie,
                        cinemaId: newCinemasIds
                    }

                    axios
                        .put(`${API_URL}/movies/${eachMovie.id}`, copyMovieToEdit)
                        .then(() => { })
                        .catch(err => console.log(err))
                })
            })
            .catch(err => console.log(err))

        axios
            .patch((`${API_URL}/cinemas/${cinemaId}`), { isDeleted: true })
            .then(() => setShowModal(false))
            .then(() => navigate(`/cines`))
            .catch(err => console.log(err))
    }

    return (
        isLoading ? <Loader /> :
            (
                <>
                    <div className="CinemaDetailsPage">

                        <Container>

                            {/* NOMBRE & BOTONES */}
                            <Row className='mt-4'>

                                {/* NOMBRE */}
                                <Col md={"auto"} >
                                    <h4 className="section-title m-0">{cinema.name.toUpperCase()}</h4>
                                </Col>

                                {/* BOTONES */}
                                <Col>
                                    <Navbar>
                                        <Container>
                                            <Nav.Link as="a" href={cinema.url} target="_blank" className="ms-3 text-white fw-bold">
                                                Comprar entradas
                                            </Nav.Link>
                                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                            <Navbar.Collapse id="responsive-navbar-nav" >
                                                <Nav className="ms-auto">

                                                    <Nav.Link className="text-white" as={Link} to={"/cines"} >
                                                        Volver a cines
                                                    </Nav.Link>
                                                    {
                                                        loggedUser &&

                                                        <NavDropdown title="Editar" id="collapsible-nav-dropdown">

                                                            <NavDropdown.Item as={Link} to={`/cines/editar/${cinemaId}`}>Editar cine</NavDropdown.Item>
                                                            <NavDropdown.Divider />
                                                            <NavDropdown.Item className="delete-button" onClick={() => setShowModal(true)}>Eliminar cine</NavDropdown.Item>

                                                        </NavDropdown>
                                                    }
                                                </Nav>
                                            </Navbar.Collapse>
                                        </Container>
                                    </Navbar>
                                </Col>

                            </Row>
                            <hr />

                            <Row className="mt-2 align-items-center">
                                <Col md={{ span: 4 }}>
                                    <Carousel>
                                        <Carousel.Item >
                                            <Image className="w-100 h-100 object-fit-cover" style={{ aspectRatio: "4 / 3", overflow: "hidden" }} src={cinema.cover[0]} rounded fluid />
                                        </Carousel.Item>
                                        <Carousel.Item >
                                            <Image className="w-100 h-100 object-fit-cover" style={{ aspectRatio: "4 / 3", overflow: "hidden" }} src={cinema.cover[1]} rounded fluid />
                                        </Carousel.Item>
                                        <Carousel.Item >
                                            <Image className="w-100 h-100 object-fit-cover" style={{ aspectRatio: "4 / 3", overflow: "hidden" }} src={cinema.cover[2]} rounded fluid />
                                        </Carousel.Item>
                                    </Carousel>
                                </Col>

                                <Col md={{ span: 8 }}>
                                    <Row>
                                        <Col className="details-container" md={{ span: 6 }}>
                                            <Row className="mb-3" >
                                                <Row>
                                                    <Col>
                                                        <span className="form-section-title">Dirección: </span>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <span>{cinema.address.street}, {cinema.address.zipcode} ({cinema.address.city})</span>
                                                    </Col>
                                                </Row>
                                            </Row>
                                            <Row className="mb-3">
                                                <Row>
                                                    <Col >
                                                        <span className="form-section-title">Precio: </span>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Stack direction="horizontal" gap={1}>
                                                            <Badge className="badge-container-medium" bg="none">Nomal: {cinema.price.regular}€</Badge>
                                                            <Badge className="badge-container-dark" bg="none">Fin de semana: {cinema.price.weekend}€</Badge>
                                                            <Badge className="badge-container-ligth" bg="none">Miércoles: {cinema.price.special}€</Badge>
                                                        </Stack>
                                                    </Col>
                                                </Row>
                                            </Row>
                                            <Row className="mb-3">
                                                <Row className="align-items-center">
                                                    <Col >
                                                        <span className="form-section-title">Servicios: </span>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Stack direction="horizontal" gap={1}>
                                                            {
                                                                cinema.services.map(elm => {
                                                                    return (
                                                                        <Badge bg="none" className="badge-container-ligth" key={elm}>{cinema.services[cinema.services.indexOf(elm)]}</Badge>
                                                                    )
                                                                })
                                                            }
                                                        </Stack>
                                                    </Col>
                                                </Row>
                                            </Row>
                                            <Row className="mb-3">
                                                <Row>
                                                    <Col>
                                                        <p><span className="form-section-title">Specs: </span></p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        {cinema.specs.is3D && (
                                                            <Image src={IMAGE_PATHS.is3DFavicon} className="h-100 me-3"
                                                                style={{ objectFit: "contain", maxHeight: "30px" }} fluid />
                                                        )}
                                                        {cinema.specs.VO && (
                                                            <Image src={IMAGE_PATHS.specsFavicon} className="h-100 me-3"
                                                                style={{ objectFit: "contain", maxHeight: "30px" }} fluid />
                                                        )}
                                                        {cinema.specs.accesibility && (
                                                            <Image src={IMAGE_PATHS.accesibilityFavicon} className="h-100 me-3"
                                                                style={{ objectFit: "contain", maxHeight: "30px" }} fluid />
                                                        )}
                                                    </Col>
                                                </Row>
                                            </Row>
                                        </Col>

                                        <Col md={{ span: 6 }}>
                                            <CustomMap address={cinema.address} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row className="mt-5 p-2 bg-black text-white ">
                                <Col>
                                    <h5 className="section-title fw-bold m-0">Películas en cartelera</h5>
                                </Col>
                            </Row>
                            <hr />
                            <Row className="flex-nowrap p-4" style={{ overflowX: "auto" }}>
                                {
                                    moviesInCinema.map(elm => {
                                        if (!elm.isDeleted) {
                                            return (
                                                <Col md={{ span: 2 }} key={elm.id}>
                                                    <Card className="MovieCard h-100 mx-auto">
                                                        <Link className="h-100 mx-auto" to={`/peliculas/detalles/${elm.id}`}>
                                                            <Card.Img variant="top h-100 object-fit-cover" src={elm.poster} />
                                                        </Link>
                                                        {
                                                            elm.released ?
                                                                <Button as="a" target="_blank" href={cinema.url} className="styled-button-2 rounded-0 rounded-bottom fw-bold m-0">Comprar entradas</Button>
                                                                :
                                                                <Button as="a" target="_blank" href={cinema.url} className="styled-button-2 rounded-0 rounded-bottom fw-bold m-0">Próximamente</Button>
                                                        }
                                                    </Card>
                                                </Col>
                                            )
                                        }
                                    })
                                }
                            </Row>

                        </Container>

                    </div >

                    <Modal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Eliminar cine seleccionado</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Si continúas no se podrá recuperar el cine seleccionado. ¿Estás seguro de que quieres continuar?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={handleCinemaDelete}>
                                Eliminar definitvamente
                            </Button>
                            <Button variant="dark" onClick={() => setShowModal(false)}>Cancelar</Button>
                        </Modal.Footer>
                    </Modal >
                </>
            )
    )
}
export default CinemaDetailsPage