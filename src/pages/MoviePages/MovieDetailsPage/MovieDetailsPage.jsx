import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import { Col, Container, Row, ButtonGroup, ListGroup, Image, Button, Badge, Accordion } from "react-bootstrap";
import Loader from "../../../components/Loader/Loader";
import MovieReview from "../../../components/CommentsMovie/MovieReview"

const API_URL = "http://localhost:5005"

const MovieDetailsPage = () => {
    const badgeColors = ["primary", "secondary", "success", "danger", "warning", "info", "dark"];
    const { movieId } = useParams()
    const { reviewId } = useParams
    const [movie, setMovie] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [cinemasInMovie, setCinemasInMovie] = useState([])
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetchMovieDetails()
        fetchCinemaInMovie()
        fetchReviews()
    }, [movieId, reviewId])

    const fetchMovieDetails = () => {
        axios
            .get(`${API_URL}/movies/${movieId}`)
            .then(response => {
                setMovie(response.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }
    const fetchCinemaInMovie = () => {
        axios
            .get(`${API_URL}/cinemas/`)
            .then(response => {
                const { data: allCinemas } = response
                const filteredCinemas = allCinemas.filter(eachCinema =>
                    Array.isArray(eachCinema.movieId) ?
                        eachCinema.movieId.includes(Number(movieId))
                        : eachCinema.movieId === Number(movieId)
                )
                setCinemasInMovie(filteredCinemas)
            })
            .catch(err => console.log(err))
    }

    const fetchReviews = () => {
        axios
            .get(`${API_URL}/reviews?movieId=${movieId}`)
            .then(response => {
                const reviewsData = Array.isArray(response.data) ? response.data : []
                setReviews(reviewsData)
            })
            .catch(err => {
                console.log(err)
                setReviews([])
            })
    }


    const addReview = (newReview) => {
        const reviewWithUser = { ...newReview, movieId, user: newReview.user || "Anonimo" }
        axios
            .post(`${API_URL}/reviews/${movieId}`, reviewWithUser)
            .then(response => {
                setReviews(prevReviews => [...prevReviews, newReview])
            })
            .catch(err => console.log(err))
    }

    const calculateAverageRating = () => {
        if (!Array.isArray(reviews) || reviews.length === 0) return 0
        const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0)
        return (totalRating / reviews.length).toFixed(1)
    }

    const averageRating = calculateAverageRating()

    return (

        isLoading ? <Loader /> :
            <div className="MovieDetailsPage">
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
                            <p><strong>Sinopsis:</strong> {movie.description ? movie.description : "Sin descripción disponible."}</p>

                            <ListGroup className="list-group-flush">
                                <ListGroup.Item><strong>País: </strong>{movie.country ? movie.country : "No disponible"}</ListGroup.Item>
                                <ListGroup.Item><strong>Lengua:</strong> {movie.language ? movie.language : "No disponible"}</ListGroup.Item>
                                <ListGroup.Item><strong>Duración: </strong> {movie.duration ? movie.duration : "No disponible"} min </ListGroup.Item>
                                <ListGroup.Item><strong>Género:</strong>
                                    <Row className="mt-2">
                                        {movie.gender && movie.gender.length > 0 ? (
                                            movie.gender.map((gen, index) => (
                                                <Col key={index} xs="auto" className="mb-2">
                                                    <Badge bg={badgeColors[index % badgeColors.length]}>{gen}</Badge>
                                                </Col>
                                            ))
                                        ) : (
                                            <span>No disponible</span>
                                        )}
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item><strong>Calificación: </strong> {movie.calification ? movie.calification : "No disponible"}</ListGroup.Item>
                                <ListGroup.Item><strong>Fecha:</strong> {movie.date ? new Date(movie.date).toLocaleDateString() : "No disponible"}</ListGroup.Item>
                            </ListGroup>

                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header><strong>Cines Disponibles</strong></Accordion.Header>
                                    <Accordion.Body>
                                        <ListGroup >
                                            {cinemasInMovie.map((elm) => {
                                                return (
                                                    <ListGroup.Item key={elm.id} >
                                                        <Link to={`/cines/detalles/${elm.id}`}>{elm.name}</Link>
                                                    </ListGroup.Item>
                                                )
                                            })}
                                        </ListGroup >
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            <MovieReview onAddReview={addReview} reviews={reviews} />
                            <ListGroup.Item>
                                <strong>Calificación Promedio: </strong>
                                {averageRating > 0 ? `${averageRating} / 5` : "No disponible"}
                            </ListGroup.Item>
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
                                            <Button variant="secondary" as={Link} to={`/peliculas/editar/${movieId}`}>
                                                Editar Película
                                            </Button>

                                        </ButtonGroup>

                                    </div>
                                </Col>
                            </Row>

                        </Col>

                    </Row>

                </Container >
            </div >
    )
}
export default MovieDetailsPage