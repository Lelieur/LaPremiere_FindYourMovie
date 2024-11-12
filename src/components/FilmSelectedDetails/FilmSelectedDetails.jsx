import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";

const API_URL = "http://localhost:5005"

const FilmSelectedDetails = () => {
    const { movieId } = useParams()
    const [movie, setMovies] = useState({})

    useEffect(() => {
        fetchFilmDetails()
    }, [])


    const fetchFilmDetails = () => {
        axios
            .get(`${API_URL}/movies/${movieId}`)
            .then(response => setMovies(response.data))
            .catch(err => console.log(err))
    }

    return (
        <div className="FilmSelectedDetails">
            <Container className="d-flex justify-content-center align-items-center">

                <Image
                    src={movie.poster || "default-image.jpg"}
                    alt={movie.title || "Película"}
                    fluid
                    className="mb-4 mt-4"
                    style={{ maxWidth: "40%" }}
                />

                <Card style={{ width: "100%", maxWidth: "1500px" }} className="my-4 mx-auto border-0">
                    <Card.Body>
                        <Card.Title className="fw-bold text-decoration-underline">
                            {movie.title?.original || movie.title || "Sin título"}
                        </Card.Title>
                        <Card.Text>
                            <strong>Sinopsis:</strong> {movie.description || "Sin descripción disponible."}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item><strong>País: </strong>{movie.country || "No disponible"}</ListGroup.Item>
                        <ListGroup.Item><strong>Lengua:</strong> {movie.language || "No disponible"}</ListGroup.Item>
                        <ListGroup.Item><strong>Duración: </strong> {movie.duration || "No disponible"}</ListGroup.Item>
                        <ListGroup.Item><strong>Género:</strong> {movie.gender || "No disponible"}</ListGroup.Item>
                        <ListGroup.Item><strong>Calificación:</strong> {movie.calification || "No disponible"}</ListGroup.Item>
                        <ListGroup.Item><strong>Fecha:</strong> {movie.date || "No disponible"}</ListGroup.Item>
                    </ListGroup>
                    <Card.Body className="d-flex justify-content-center align-items-center gap-3">
                        <Button href={movie.trailer} variant="secondary" className="w-50">
                            Ver Trailer
                        </Button>
                        <Link to="/peliculas" className="w-50">
                            <Button variant="secondary" className="w-100">
                                Volver a la lista
                            </Button>
                        </Link>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default FilmSelectedDetails