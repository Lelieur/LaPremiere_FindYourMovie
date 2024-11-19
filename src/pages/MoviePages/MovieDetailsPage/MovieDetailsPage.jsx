import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import { Col, Container, Row, ButtonGroup, ListGroup, Image, Button, Badge, Accordion, Modal, Card, CardHeader, CardBody, ModalHeader, ModalTitle, ModalBody, ModalFooter } from "react-bootstrap"
import Loader from "../../../components/Loader/Loader"
import { FaStar, FaStarHalfAlt, FaPlayCircle } from "react-icons/fa"
import NewMovieReviewForm from "../../../components/NewMovieReviewForm/NewMovieReviewForm"
import FlagIcon from "../../../components/FlagIcon/FlagIcon"


const API_URL = "http://localhost:5005"

const countryNameToCode = {
    "Estados Unidos": "US",
    "España": "ES",
    "Inglaterra": "IN",
    "Reino Unido": "GB",
    "Canada": "CA",
    "México": "MX",
    "Alemania": "DE",
    "Japón": "JP"
}

const MovieDetailsPage = () => {
    const badgeColors = ["primary", "secondary", "success", "danger", "warning", "info", "dark"]
    const { movieId } = useParams()
    const navigate = useNavigate()
    const [showAddReviewModal, setShowAddReviewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [movie, setMovie] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [cinemasInMovie, setCinemasInMovie] = useState([])
    const [reviews, setReviews] = useState([])
    const [countryCode, setCountryCode] = useState("ZZ")




    useEffect(() => {
        fetchCinemaInMovie()
        fetchReviews()
        fetchMovieDetails()
    }, [movieId])

    useEffect(() => {
        if (movie.country) {
            const code = countryNameToCode[movie.country] || 'ZZ'
            setCountryCode(code);
        }
    }, [movie]);

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
            .then(() => setShowDeleteModal(false))
            .then(() => navigate(`/peliculas`))
            .catch(err => console.log(err))
    }

    const addReview = (newReview) => {
        const reviewWithMovieId = { ...newReview, movieId: Number(movieId), user: newReview.user || "Anonimo" }

        axios
            .post(`${API_URL}/reviews`, reviewWithMovieId)
            .then(response => {
                const createdReview = response.data
                setReviews(prevReviews => [...prevReviews, createdReview])
                setIsLoading(isLoading)
            })
            .catch(err => {
                console.error("Error al añadir la reseña", err)
            })
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
                                <Button className="ms-4 btn-sm" variant="dark" onClick={() => setShowDeleteModal(true)}>
                                    Eliminar Película
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                    <hr className="my-1" />
                    <Row className="align-items-center mb-5 mt-0 p-2">
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
                            <ListGroup.Item className="mt-0">
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

                            <ListGroup.Item><strong>País: </strong>{movie.country || "No disponible"} <FlagIcon countryCode={countryCode} size="small" /></ListGroup.Item >
                            <ListGroup.Item><strong>Lengua: </strong>{movie.language || "No disponible"}</ListGroup.Item>
                            <ListGroup.Item><strong>Duración: </strong>{movie.duration || "No disponible"} min</ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Género: </strong>
                                <Row className="mt-1">
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
                            <ListGroup.Item><strong>Director: </strong>{movie.director || "No disponible"}</ListGroup.Item>
                            <Button className="mt-3" size="sm" variant="dark" onClick={() => setShowAddReviewModal(true)}>
                                Hacer una reseña
                            </Button>
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
                        <div className="mt-4">
                            <h3><strong>Casting</strong></h3>
                            {movie.casting && movie.casting.length > 0 ? (
                                <Row className="g-2">
                                    {movie.casting.map((actor, index) => (
                                        <Col xs={4} md={2} className="text-center" key={index}>
                                            <div className="text-center">
                                                <Image
                                                    src={actor.photo || "default-image.jpg"}
                                                    alt={actor.name}
                                                    roundedCircle
                                                    style={{ width: "100px", height: "120px", objectFit: "cover" }}
                                                />
                                                <p className="mt-1" style={{ fontSize: "0.9rem" }}><strong>{actor.name}</strong></p>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            ) : (
                                <p>No hay información sobre el elenco disponible.</p>
                            )}
                        </div>
                    </Row>
                    <Row className="mb-4">
                        <Col md={12}>
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
                        </Col>
                    </Row>
                    <Modal
                        show={showAddReviewModal}
                        onHide={() => setShowAddReviewModal(false)}
                        backdrop="static"
                        keyboard={false}
                    >
                        <ModalHeader closeButton>
                            <ModalTitle> Añadir una valoración </ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <NewMovieReviewForm
                                onAddReview={addReview}
                                onCloseModal={() => setShowAddReviewModal(false)}
                            />
                        </ModalBody>
                    </Modal>

                    <Modal
                        show={showDeleteModal}
                        onHide={() => setShowDeleteModal(false)}
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
                            <Button variant="dark" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
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