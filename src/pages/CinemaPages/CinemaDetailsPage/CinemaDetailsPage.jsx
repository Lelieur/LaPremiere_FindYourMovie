import * as IMAGE_PATHS from '../../../consts/image-paths'

import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

import axios from 'axios'
import { Container, Image, Row, Col, Carousel, Stack, Badge, Button, ButtonGroup, Card, Modal } from 'react-bootstrap'

import "./CinemaDetailsPage.css"
import Loader from '../../../components/Loader/Loader'

const API_URL = "http://localhost:5005"

const CinemaDetailsPage = () => {

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

                            <Row className="mt-5">
                                <Col md={{ span: 5 }}>
                                    <Carousel>
                                        <Carousel.Item >
                                            <Image src={cinema.cover[0]} rounded fluid />
                                        </Carousel.Item>
                                        <Carousel.Item >
                                            <Image src={cinema.cover[1]} rounded fluid />
                                        </Carousel.Item>
                                        <Carousel.Item >
                                            <Image src={cinema.cover[2]} rounded fluid />
                                        </Carousel.Item>
                                    </Carousel>
                                </Col>
                                <Col md={{ span: 7 }}>
                                    <Row>
                                        <Col md={{ span: 6 }}>
                                            <h1>{cinema.name}</h1>
                                        </Col>
                                        <Col md={{ span: 6 }} className="d-flex align-items-center justify-content-end">
                                            <ButtonGroup>
                                                <Button variant="success" as={Link} to={`/cines/editar/${cinemaId}`}>Editar cine</Button>
                                                <Button variant="danger" onClick={() => setShowModal(true)}>Eliminar cine</Button>
                                            </ButtonGroup>
                                        </Col>
                                    </Row>

                                    <hr />
                                    <p><span className="form-section-title">Dirección: </span>{cinema.address.street}, {cinema.address.zipcode} ({cinema.address.city})</p>
                                    <p><span className="form-section-title">Precio: </span>
                                        <Stack direction="horizontal" gap={2} style={{ display: 'inline-flex' }}>
                                            <Badge bg="dark">Nomal: {cinema.price.regular}€</Badge>
                                            <Badge bg="secondary">Fin de semana: {cinema.price.weekend}€</Badge>
                                            <Badge bg="success">Miércoles: {cinema.price.special}€</Badge>
                                        </Stack>
                                    </p>
                                    <p><span className="form-section-title">Servicios: </span>
                                        <Stack direction="horizontal" gap={2} style={{ display: 'inline-flex' }}>
                                            {
                                                cinema.services.map(elm => {
                                                    return (
                                                        <Badge bg="warning" key={cinema.id}>{cinema.services[cinema.services.indexOf(elm)]}</Badge>
                                                    )
                                                })
                                            }
                                        </Stack>
                                    </p>
                                    <p><span className="form-section-title">Specs: </span>
                                        <Row style={{ display: 'inline-flex' }}>
                                            {cinema.specs.is3D && (
                                                <Col md={{ span: 1 }}>
                                                    <Image src={IMAGE_PATHS.is3DFavicon} fluid />
                                                </Col>
                                            )}
                                            {cinema.specs.VO && (
                                                <Col md={{ span: 1 }}>
                                                    <Image src={IMAGE_PATHS.specsFavicon} fluid />
                                                </Col>
                                            )}
                                            {cinema.specs.accesibility && (
                                                <Col md={{ span: 1 }}>
                                                    <Image src={IMAGE_PATHS.accesibilityFavicon} fluid />
                                                </Col>
                                            )}
                                        </Row>
                                        <ButtonGroup className="mt-4 me-5" aria-label="Basic example">
                                            <Button variant="dark" as="a" href={cinema.url} target="_blank">Comprar entradas</Button>
                                            <Button variant="secondary" as={Link} to="/cines">Ver otro cine</Button>
                                        </ButtonGroup>
                                    </p>
                                </Col>
                            </Row>

                        </Container >

                        <Container className="mt-4">
                            <h3>PELÍCULAS EN CARTELERA</h3>
                            <hr />
                            <Row className="flex-nowrap" style={{ overflowX: "auto" }}>
                                {
                                    moviesInCinema.map(elm => {
                                        return (
                                            <Col md={{ span: 2 }} key={elm.id}>
                                                <Link to={`/peliculas/detalles/${elm.id}`}>

                                                    <Card >
                                                        <Card.Img variant="top" src={elm.poster} />

                                                        {
                                                            elm.released ?
                                                                <Button as="a" target="_blank" href={cinema.url} className="rounded-0 rounded-bottom" variant="dark">Comprar entradas</Button>
                                                                :
                                                                <Button as="a" target="_blank" href={cinema.url} className="rounded-0 rounded-bottom" variant="success">Próximamente</Button>

                                                        }

                                                    </Card>

                                                </Link>
                                            </Col>
                                        )
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
                            <Button variant="primary" onClick={() => setShowModal(false)}>Cancelar</Button>
                        </Modal.Footer>
                    </Modal >
                </>
            )
    )
}
export default CinemaDetailsPage