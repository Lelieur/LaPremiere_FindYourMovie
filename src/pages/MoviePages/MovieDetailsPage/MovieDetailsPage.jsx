import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import { Col, Container, Row, ButtonGroup, ListGroup, Image, Button, Badge, Accordion, Modal, ModalHeader, ModalTitle, ModalBody, Stack } from "react-bootstrap"
import Loader from "../../../components/Loader/Loader"
import { FaStar, FaStarHalfAlt, FaPlayCircle } from "react-icons/fa"
import NewMovieReviewForm from "../../../components/NewMovieReviewForm/NewMovieReviewForm"
import FlagIcon from "../../../components/FlagIcon/FlagIcon"
import EditReviewForm from "../../../components/EditReviewForm/EditReviewForm"

const API_URL = "http://localhost:5005"

const countryNameToCode = {
    "Estados Unidos": "US",
    "España": "ES",
    "Inglaterra": "IN",
    "Reino Unido": "GB",
    "Canada": "CA",
    "México": "MX",
    "Alemania": "DE",
    "Japón": "JP",
    "Nueva Zelanda": "NZ"
}

const MovieDetailsPage = () => {

    const { movieId } = useParams()
    const [showAddReviewModal, setShowAddReviewModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditReviewModal, setShowEditReviewModal] = useState(false)
    const [movie, setMovie] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [cinemasInMovie, setCinemasInMovie] = useState([])
    const [reviews, setReviews] = useState([])
    const [reviewToEdit, setReviewToEdit] = useState(null)
    const [countryCode, setCountryCode] = useState("ZZ")
    const navigate = useNavigate()

    useEffect(() => {
        if (movie.country) {
            const code = countryNameToCode[movie.country] || 'ZZ'
            setCountryCode(code);
        }
    }, [movie])

    useEffect(() => {
        fetchMovieData()
    }, [])

    const fetchMovieData = () => {

        const promises = [
            axios.get(`${API_URL}/movies/${movieId}`),
            axios.get(`${API_URL}/cinemas/`),
            axios.get(`${API_URL}/reviews?movieId=${movieId}`)
        ]

        Promise
            .all(promises)
            .then(([movieData, cinemasData, reviewsData]) => {
                setMovie(movieData.data)

                const { data: allCinemas } = cinemasData
                const filteredCinemas = allCinemas.filter(eachCinema =>
                    Array.isArray(eachCinema.movieId) ?
                        eachCinema.movieId.includes(Number(movieId))
                        : eachCinema.movieId === Number(movieId)
                )

                setCinemasInMovie(filteredCinemas)
                setReviews(reviewsData.data)
            })
            .then(() => setIsLoading(false))
            .catch(err => console.log(err))
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

    const openEditReviewModal = (review) => {
        setReviewToEdit(review)  // Establece la reseña seleccionada para editar
        setShowEditReviewModal(true)  // Abre el modal de edición
    }
    const updateReview = (updatedReview) => {
        setReviews(prevReviews =>
            prevReviews.map(review =>
                review.id === updatedReview.id ? updatedReview : review))
    }

    return (

        isLoading ? <Loader /> : (
            <div className="MovieDetailsPage">
                <Container>

                    {/* TÍTULO & BOTONES */}
                    <Row className="mt-4">

                        <Col>
                            <Row>
                                {/* TÍTULO */}
                                <Col md={4}>
                                    <h4>{movie.title?.spanish || movie.title || "Sin título"}</h4>
                                </Col>

                                {/* CINES */}
                                <Col>
                                    <Accordion>
                                        <Accordion.Item eventKey="0" className="position-absolute" style={{ zIndex: 1000 }}>
                                            <Accordion.Header as="span" className="accordion-header">Cines Disponibles</Accordion.Header>
                                            <Accordion.Body>
                                                <ListGroup className="accordion-list-group" bg="none">
                                                    {cinemasInMovie.map((elm) => !elm.isDeleted && (
                                                        <ListGroup.Item key={elm.id}>
                                                            <Link to={`/cines/detalles/${elm.id}`}>{elm.name}</Link>
                                                        </ListGroup.Item>
                                                    ))}
                                                </ListGroup>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Col>
                            </Row>
                        </Col>

                        <Col className="text-end">
                            <ButtonGroup >
                                <Button className="styled-button-1" as={Link} to={"/peliculas"}>
                                    Volver a la lista
                                </Button>
                                <Button className="styled-button-1" as={Link} to={`/peliculas/editar/${movieId}`}>
                                    Editar Película
                                </Button>
                                <Button className="styled-button-2" onClick={() => setShowDeleteModal(true)}>
                                    Eliminar Película
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                    <hr />

                    {/* POSTER & SINOPSIS & CASTING */}
                    <Row>
                        <Col>
                            <Row>
                                {/* POSTER */}
                                <Col>
                                    <div className="position-relative">
                                        <Image
                                            onClick={() => window.open(movie.trailer, "_blank")}
                                            target="_blank"
                                            src={movie.poster}
                                            alt={movie.title}
                                            fluid
                                            style={{ cursor: "pointer" }}
                                        />
                                        <FaPlayCircle size={50} color="white" opacity={0.7} className="position-absolute top-50 start-50 translate-middle pe-none" />
                                    </div>
                                </Col>

                                {/* DETALLES */}
                                <Col className="details-container">
                                    {/* País */}
                                    <Row className="mb-3">
                                        <Col>
                                            <Row>
                                                <Col>
                                                    <strong>País: </strong>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    {movie.country}{' '}
                                                    <FlagIcon countryCode={countryCode} size="small" />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                    {/* Idioma */}
                                    <Row className="mb-3">
                                        <Col>
                                            <Row>
                                                <Col>
                                                    <strong>Lengua: </strong>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    {movie.language}
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                    {/* Duración */}
                                    <Row className="mb-3">
                                        <Col>
                                            <Row>
                                                <Col>
                                                    <strong>Duración: </strong>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    {movie.duration} min
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                    {/* Género */}
                                    <Row className="mb-3">
                                        <Col>
                                            <Row>
                                                <Col>
                                                    <strong>Género: </strong>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Stack direction="horizontal" gap={1}>
                                                        {
                                                            movie.gender?.map((gen, index) => (
                                                                <Badge key={index} className="badge-container-dark" bg="none">{gen}</Badge>
                                                            ))
                                                        }
                                                    </Stack>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                    {/* Fecha */}
                                    <Row className="mb-3">
                                        <Col>
                                            <Row>
                                                <Col>
                                                    <strong>Fecha: </strong>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    {movie.date ? new Date(movie.date).toLocaleDateString() : "No disponible"}
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                    {/* Director */}
                                    <Row className="mb-3">
                                        <Col>
                                            <Row>
                                                <Col>
                                                    <strong>Director: </strong>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    {movie.director || "No disponible"}
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                </Col>
                            </Row>
                        </Col>

                        {/* CASTING & SINOPSIS */}
                        <Col>
                            {/* SINOPSIS */}
                            <Row>
                                <Col>
                                    <p><strong>Sinopsis: </strong></p>
                                    <p>{movie.description || "Sin descripción disponible."}</p>
                                </Col>
                            </Row>

                            {/* CASTING */}
                            <Row>
                                <Col>
                                    <Row>
                                        <Col>
                                            <p><strong>Casting</strong></p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        {movie.casting?.map((actor, index) => (
                                            <Col className="text-center" key={index}>
                                                <Row>
                                                    <Col>
                                                        <Image
                                                            src={actor.photo || "default-image.jpg"}
                                                            alt={actor.name}
                                                            roundedCircle
                                                            style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                                        />
                                                    </Col>
                                                    <Row>
                                                        <Col>
                                                            <p className="mt-1" style={{ fontSize: "0.9rem" }}><strong>{actor.name}</strong></p>
                                                        </Col>
                                                    </Row>
                                                </Row>
                                            </Col>
                                        ))}
                                    </Row>
                                </Col>
                            </Row>


                        </Col>
                    </Row>

                    {/* RATING */}
                    <Row className="mt-4">
                        <Col md={6}>
                            <Row>

                                {/* RATING */}
                                <Col>
                                    <Row>
                                        <Col>
                                            <strong>Calificación: </strong>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
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
                                        </Col>
                                    </Row>
                                </Col>

                                {/* HACER RESEÑA */}
                                <Col>
                                    <Button className="styled-button-1 mt-3 p-2" size="sm" variant="dark" onClick={() => setShowAddReviewModal(true)}>
                                        Hacer una reseña</Button>
                                </Col>

                            </Row>
                        </Col>
                    </Row>

                    {/* COMENTARIOS */}
                    <Row className="mt-4">
                        <Col>
                            <Accordion className="mb-2">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header as="span"><strong>Ver Comentarios</strong></Accordion.Header>
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
                                                            <Button variant="dark" onClick={() => openEditReviewModal(review)}>Editar</Button>
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
                    {/* Modal para añadir comentario */}
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
                    {/* Modal para editar comentario */}
                    <Modal
                        show={showEditReviewModal}
                        onHide={() => setShowEditReviewModal(false)}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Editar reseña</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <EditReviewForm
                                reviewToEdit={reviewToEdit}
                                updateReview={updateReview}
                                setShowEditReviewModal={setShowEditReviewModal}
                            />
                        </Modal.Body>
                    </Modal>
                    {/* Modal para eliminar película */}
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

                </Container >
            </div >
        )

    )
}
export default MovieDetailsPage