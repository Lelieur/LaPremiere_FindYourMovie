import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import { Col, Container, Row, ButtonGroup, ListGroup, Image, Button, Badge, Accordion, Modal, Card, CardHeader, CardBody } from "react-bootstrap"
import Loader from "../../../components/Loader/Loader"
import NewMovieReviewForm from "../../../components/NewMovieReviewForm/NewMovieReviewForm"
import { FaStar, FaStarHalfAlt } from "react-icons/fa"

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


    const addReview = (newReview) => {
        const reviewWithMovieId = { ...newReview, movieId: Number(movieId), user: newReview.user || "Anonimo" }

        axios
            .post(`${API_URL}/reviews`, reviewWithMovieId)
            .then(response => {
                const createdReview = response.data
                setReviews(prevReviews => [...prevReviews, createdReview])
            })
            .catch(err => {
                console.err("Error al añadir la reseña")
            })
    }

    const calculateAverageRating = () => {
        const totalRating = reviews.reduce((sum, review) => sum + (review.rating), 0)
        return (totalRating / reviews.length)
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
            .then(() => navigate(`/movies`))
            .catch(err => console.log(err))
    }


    return (

        isLoading ? <Loader /> :

            <div className="MovieDetailsPage">

                <Container>

                    <Row>

                        <Col md={{ span: 2 }}>
                            <Image
                                src={movie.poster || "default-image.jpg"}
                                alt={movie.title || "Película"}
                                fluid
                                className="mb-4 mt-4"
                                style={{ height: "200px", objectFit: "cover" }}
                            />

                            < Card className="mt-3">
                                <CardHeader style={{
                                    backgroundColor: "#000",
                                    color: "#fff",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                }}>
                                    Añade tu reseña
                                </CardHeader >

                                <CardBody>
                                    <NewMovieReviewForm onAddReview={addReview} />
                                </CardBody>
                            </Card>

                        </Col>

                        <Col md={{ span: 10, }}>

                            <div className="d-flex justify-content-between align-items-center">

                                <h1>{movie.title?.spanish || movie.title || "Sin título"}</h1>
                                <div className="d-flex">
                                    <Button className="me-2 btn-sm" href={movie.trailer} variant="dark" as="a">
                                        Ver Trailer
                                    </Button>
                                    <Button className="me-1 btn-sm" variant="dark" as={Link} to={`/peliculas/editar/${movieId}`}>
                                        Editar Película
                                    </Button>
                                    <Button className="ms-1 btn-sm" variant="dark" onClick={() => setShowModal(true)}>
                                        Eliminar Película
                                    </Button>
                                </div>
                            </div>
                            <ListGroup.Item>
                                <strong>Calificación {movie.title?.spanish || "No disponible"}</strong>
                                {averageRating > 0 ? (
                                    <div>
                                        {[...Array(5)].map((_, index) => {
                                            const isFull = averageRating >= index + 1;
                                            const isHalf = averageRating >= index + 0.5 && averageRating < index + 1;
                                            const isEmpty = averageRating < index + 1;
                                            return (
                                                <span key={index} style={{ marginRight: "5px", fontSize: "1.5rem", color: "#ffb400" }}>
                                                    {isFull ? (
                                                        <FaStar />
                                                    ) : isHalf ? (
                                                        <FaStarHalfAlt />
                                                    ) :
                                                        isEmpty ? (
                                                            <FaStar style={{ color: "#e4e5e9" }} /> // Estrella vacía
                                                        ) : null}
                                                </span>
                                            );
                                        })}
                                        <span className="ms-2"> {averageRating.toFixed(1)} / 5</span>
                                    </div>
                                ) : (
                                    <span> 0 / 0  ⭐</span>
                                )}
                            </ListGroup.Item>


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
                            <Accordion className="mb-2">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header><strong>Cines Disponibles</strong></Accordion.Header>
                                    <Accordion.Body>
                                        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                            <ListGroup >
                                                {cinemasInMovie.map((elm) => {
                                                    if (!elm.isDeleted) {
                                                        return (
                                                            <ListGroup.Item key={elm.id} >
                                                                <Link to={`/cines/detalles/${elm.id}`}>{elm.name}</Link>
                                                            </ListGroup.Item>
                                                        )
                                                    }
                                                })}
                                            </ListGroup >
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>

                            <Accordion className="mb-2">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header><strong>Ver Comentarios</strong></Accordion.Header>

                                    <Accordion.Body >
                                        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
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
                            <p><strong>Sinopsis:</strong> {movie.description ? movie.description : "Sin descripción disponible."}</p>

                            <Row>

                                <Col lg={{ span: 12 }} className="position-relative">

                                    <Modal
                                        show={showModal}
                                        onHide={() => setShowModal(false)}
                                        backdrop="static"
                                        keyboard={false}
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title>Eliminar película seleccionado</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            Si continúas no se podrá recuperar la película seleccionada. ¿Estás seguro de que quieres continuar?
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="danger" onClick={handleMovieDelete}>
                                                Eliminar definitvamente
                                            </Button>
                                            <Button variant="dark" onClick={() => setShowModal(false)}>Cancelar</Button>
                                        </Modal.Footer>
                                    </Modal >
                                </Col>
                            </Row>

                        </Col>
                        <div className=" d-grid gap-2 d-md-flex justify-content-sm-end">

                            <Button className="btn-sm" variant="dark" as={Link} to={'/peliculas'}>
                                Volver a la lista
                            </Button>
                        </div>
                    </Row>

                </Container >
            </div >
    )
}
export default MovieDetailsPage