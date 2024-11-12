import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import { Col, Container, Row, ButtonGroup, ListGroup, Image, Button } from "react-bootstrap";

const API_URL = "http://localhost:5005"

const FilmDetailsPage = () => {

    const { movieId } = useParams()
    const [movie, setMovie] = useState({})

    useEffect(() => {
        fetchFilmDetails()
    }, [])

    const fetchFilmDetails = () => {
        axios
            .get(`${API_URL}/movies/${movieId}`)
            .then(response => setMovie(response.data))
            .catch(err => console.log(err))
    }
    return (
        <div className="FilmDetailsPage">
            <Container>

                <Row>

                    <Col md={{ md: 3 }}>
                        <Image
                            src={movie.poster || "default-image.jpg"}
                            alt={movie.title || "Película"}
                            fluid
                            className="mb-4 mt-4"
                        />
                    </Col>

                    <Col md={{ md: 4, offset: 1 }}>

                        <h1>{movie.title?.original || movie.title || "Sin título"}</h1>
                        <p><strong>Sinopsis:</strong> {movie.description || "Sin descripción disponible."}</p>

                        <ListGroup className="list-group-flush">
                            <ListGroup.Item><strong>País: </strong>{movie.country || "No disponible"}</ListGroup.Item>
                            <ListGroup.Item><strong>Lengua:</strong> {movie.language || "No disponible"}</ListGroup.Item>
                            <ListGroup.Item><strong>Duración: </strong> {movie.duration || "No disponible"}</ListGroup.Item>
                            <ListGroup.Item><strong>Género:</strong> {movie.gender || "No disponible"}</ListGroup.Item>
                            <ListGroup.Item><strong>Calificación:</strong> {movie.calification || "No disponible"}</ListGroup.Item>
                            <ListGroup.Item><strong>Fecha:</strong> {movie.date || "No disponible"}</ListGroup.Item>
                        </ListGroup>

                        <Row>

                            <Col lg={{ span: 8, offset: 2 }}>

                                <div className="d-grid">

                                    <ButtonGroup size="lg" className="mb-2 mt-5">

                                        <Button href={movie.trailer} variant="secondary" as="a">
                                            Ver Trailer
                                        </Button>
                                        <Button variant="secondary" as={Link} to={'/peliculas'}>
                                            Volver a la lista
                                        </Button>

                                    </ButtonGroup>

                                </div>
                            </Col>
                        </Row>

                    </Col>

                </Row>

            </Container>
        </div >
    )
}
export default FilmDetailsPage