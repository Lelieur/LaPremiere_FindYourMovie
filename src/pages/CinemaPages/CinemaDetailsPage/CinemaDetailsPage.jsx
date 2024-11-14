import * as IMAGE_PATHS from '../../../consts/image-paths'

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import axios from 'axios'
import { Container, Image, Row, Col, Carousel, Stack, Badge, Button, ButtonGroup, Card } from 'react-bootstrap'

import "./CinemaDetailsPage.css"
import Loader from '../../../components/Loader/Loader'

const API_URL = "http://localhost:5005"

const CinemaDetailsPage = () => {

    const { cinemaId } = useParams()

    const [cinema, setCinema] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const [moviesInCinema, setMoviesInCinema] = useState([])

    useEffect(() => {
        fetchCinemaDetails()
        fetchMoviesInCinema()
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

    return (
        isLoading ? <Loader /> :
            (
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
                                <h1>{cinema.name}</h1>
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
                                    <ButtonGroup className="mt-4" aria-label="Basic example">
                                        <Button variant="dark" as="a" href={cinema.url} target="_blank">Comprar entradas</Button>
                                        <Button variant="secondary" as={Link} to="/cines">Ver otro cine</Button>
                                        <Button className="ms-4" variant="success" as={Link} to={`/cines/editar/${cinemaId}`}>Editar cine</Button>
                                    </ButtonGroup>
                                </p>
                            </Col>
                        </Row>

                    </Container>

                    <Container className="mt-4">
                        <h3>PELÍCULAS EN CARTELERA</h3>
                        <hr />
                        <Row className="flex-nowrap" style={{ overflowX: "auto" }}>
                            {
                                moviesInCinema.map(elm => {
                                    return (
                                        <Col md={{ span: 2 }} key={elm.id}>
                                            <Card >
                                                <Card.Img variant="top" src={elm.poster} />

                                                {
                                                    elm.released ?
                                                        <Button as="a" target="_blank" href={cinema.url} className="rounded-0 rounded-bottom" variant="dark">Comprar entradas</Button>
                                                        :
                                                        <Button as="a" target="_blank" href={cinema.url} className="rounded-0 rounded-bottom" variant="success">Próximamente</Button>

                                                }

                                            </Card>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Container>

                </div >
            )
    )
}
export default CinemaDetailsPage