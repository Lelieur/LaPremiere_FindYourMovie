import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import { Col, Container, Row, ButtonGroup, ListGroup, Image, Button, Badge, Accordion, Modal, Card, CardHeader, CardBody } from "react-bootstrap"
import Loader from "../../../components/Loader/Loader"
import { FaStar, FaStarHalfAlt, FaPlayCircle } from "react-icons/fa"

const API_URL = "http://localhost:5005"

const MovieDetailsPage = () => {
    const badgeColors = ["primary", "secondary", "success", "danger", "warning", "info", "dark"]
    const { movieId } = useParams()
    const [showModal, setShowModal] = useState(false)
    const [movie, setMovie] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [cinemasInMovie, setCinemasInMovie] = useState([])
    const [reviews, setReviews] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchCinemaInMovie()
        fetchReviews()
        fetchMovieDetails()
    }, [movieId])

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
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const fetchReviews = () => {
        axios
            .get(`${API_URL}/reviews?movieId=${movieId}`)
            .then(response => {
                const reviewsData = Array.isArray(response.data) ? response.data : []
                setReviews(reviewsData)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                setReviews([])
            })
    }

    const calculateAverageRating = () => {
        const totalRating = reviews.reduce((sum, review) => sum + (review.rating), 0)
        return totalRating / reviews.length
    }

    const averageRating = calculateAverageRating()

    const handleMovieDelete = () => {

        axios
            .get((`${API_URL}/cinemas/`))
            .then(response => {

                const { data: allCinemas } = response

                const filteredCinemas = allCinemas.filter(eachCinema => {
                    return (movie.cinemaId.includes(eachCinema.id))
                })

                filteredCinemas.map(eachCinema => {

                    let copyCinemaToEdit = {
                        ...eachCinema
                    }

                    const newMoviesIds =
                        Array.isArray(copyCinemaToEdit.movieId) ?
                            copyCinemaToEdit.movieId.filter(eachMovieId => {
                                return (eachMovieId !== movie.id)
                            }) :
                            copyCinemaToEdit.movieId === movie.id ?
                                copyCinemaToEdit.movieId = [] :
                                copyCinemaToEdit.movieId

                    copyCinemaToEdit = {
                        ...eachCinema,
                        movieId: newMoviesIds
                    }

                    axios
                        .put(`${API_URL}/cinemas/${eachCinema.id}`, copyCinemaToEdit)
                        .then(() => { })
                        .catch(err => console.log(err))
                })
            })
            .catch(err => console.log(err))

        axios
            .patch((`${API_URL}/movies/${movieId}`), { isDeleted: true })
            .then(() => setShowModal(false))
            .then(() => navigate(`/peliculas`))
            .catch(err => console.log(err))
    }


    return (

        isLoading ? <Loader /> : (
            <div className="MovieDetailsPage">
                <Container>
                    <Row className="mb-1 mt-1">
                        <Col xs={12} md={8} >
                            <h1>{movie.title?.spanish || movie.title || "Sin título"}</h1>
                        </Col>
                        <Col xs={12} md={4}>
                            <ButtonGroup className="d-flex justify-content-end mt-3">
                                <Button className="me-4 btn-sm" variant="dark" as={Link} to={`/peliculas/editar/${movieId}`}>
                                    Editar Película
                                </Button>
                                <Button className="ms-4 btn-sm" variant="dark" onClick={() => setShowModal(true)}>
                                    Eliminar Película
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                    <hr className="my-1" />
                    <Row>
                        <Col md={2} className="mb-4">
                            <div>
                                <a href={movie.trailer || "#"} target="_blank" rel="noopener noreferrer" style={{ position: "relative", display: "block" }}>
                                    <Image
                                        src={movie.poster || "default-image.jpg"}
                                        alt={movie.title || "Película"}
                                        fluid
                                        style={{ height: "300px", maxHeight: "350px", width: "100%", objectFit: "cover", cursor: "pointer" }}
                                    />
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)",
                                            fontSize: "4rem",
                                            color: "rgba(255, 255, 255, 0.8)",
                                            textShadow: "0 0 10px rgba(0, 0, 0, 0.7)",
                                            pointerEvents: "none",
                                        }}
                                    >
                                        <FaPlayCircle />
                                    </div>
                                </a>
                            </div>
                        </Col>

                        <Col md={3} className="mb-4">


                            <ListGroup.Item>
                                <strong>Calificación: </strong>
                                {averageRating > 0 ? (
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            {[...Array(5)].map((_, index) => {
                                                const isFull = averageRating >= index + 1
                                                const isHalf = averageRating >= index + 0.5 && averageRating < index + 1
                                                const isEmpty = averageRating < index + 1
                                                return (
                                                    <span key={index} style={{ marginRight: "5px", fontSize: "1.5rem" }}>
                                                        {isFull ? (
                                                            <FaStar style={{ color: "#ffb400" }} />
                                                        ) : isHalf ? (
                                                            <FaStarHalfAlt style={{ color: "#ffb400" }} />
                                                        ) : (
                                                            <FaStar style={{ color: "#e4e5e9" }} />
                                                        )}
                                                    </span>
                                                );
                                            })}
                                            <span className="ms-2 mt-2">{averageRating.toFixed(1)} / 5</span>
                                        </div>
                                    </div>
                                ) : (
                                    <span>0 / 0 ⭐</span>
                                )}

                            </ListGroup.Item>

                            <ListGroup.Item><strong>País: </strong>{movie.country || "No disponible"}</ListGroup.Item>
                            <ListGroup.Item><strong>Lengua: </strong>{movie.language || "No disponible"}</ListGroup.Item>
                            <ListGroup.Item><strong>Duración: </strong>{movie.duration || "No disponible"} min</ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Género: </strong>
                                <Row className="mt-2">
                                    {movie.gender?.length ? (
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
                            <ListGroup.Item><strong>Fecha: </strong>{movie.date ? new Date(movie.date).toLocaleDateString() : "No disponible"}</ListGroup.Item>
                            <Modal
                                show={showModal}
                                onHide={() => setShowModal(false)}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Button className="mt-5" size="sm" variant="dark" as={Link} to={`/peliculas/reseña/${movie.id}`}>
                                    Hacer una reseña
                                </Button>
                            </Modal>
                        </Col>
                        <Col md={7} className="mb-4">
                            <p><strong>Sinopsis: </strong>{movie.description || "Sin descripción disponible."}</p>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header><strong>Cines Disponibles</strong></Accordion.Header>
                                    <Accordion.Body>
                                        <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                                            <ListGroup>
                                                {cinemasInMovie.map((elm) => !elm.isDeleted && (
                                                    <ListGroup.Item key={elm.id}>
                                                        <Link to={`/cines/detalles/${elm.id}`}>{elm.name}</Link>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col md={12}>
                            <Modal
                                show={showModal}
                                onHide={() => setShowModal(false)}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Accordion className="mb-2">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header><strong>Ver Comentarios</strong></Accordion.Header>
                                        <Accordion.Body>
                                            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                                                {reviews.length > 0 ? (
                                                    <ListGroup>
                                                        {reviews.map((review, index) => (
                                                            <ListGroup.Item key={index}>
                                                                <strong>{review.user || "Anónimo"}</strong>: {review.comment}
                                                                <div>
                                                                    <strong>Calificación:</strong>
                                                                    {[...Array(review.rating)].map((_, idx) => (
                                                                        <span key={idx} style={{ color: "#ffb400" }}>★</span>
                                                                    ))}
                                                                </div>
                                                            </ListGroup.Item>
                                                        ))}
                                                    </ListGroup>
                                                ) : (
                                                    <p>No hay comentarios para esta película.</p>
                                                )}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Modal>
                        </Col>
                    </Row>
                    <Modal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Eliminar película seleccionada</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Si continúas no se podrá recuperar la película seleccionada. ¿Estás seguro de que quieres continuar?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={handleMovieDelete}>
                                Eliminar definitivamente
                            </Button>
                            <Button variant="dark" onClick={() => setShowModal(false)}>Cancelar</Button>
                        </Modal.Footer>
                    </Modal>
                    <div className="d-grid gap-2 d-md-flex justify-content-sm-end">
                        <Button className="btn-sm" variant="dark" as={Link} to={"/peliculas"}>
                            Volver a la lista
                        </Button>
                    </div>
                </Container>
            </div >
        )

    )
}
export default MovieDetailsPage