import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { FaStar } from "react-icons/fa"

import axios from "axios"

const API_URL = "http://localhost:5005"

const MovieReview = ({ movieId, reviews, onAddReview }) => {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")
    const [userName, setUserName] = useState("")

    const handleStartClick = (index) => {
        setRating(index + 1)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (rating && comment && userName) {
            const newReview = { movieId, rating, comment, user: userName }

            axios
                .post(`${API_URL}/reviews`, newReview)
                .then((response) => {
                    onAddReview(response.data)
                    setUserName("")
                    setRating(0)
                    setComment("")

                })
        } else {
            alert("Rellena todos los campos")
        }

    }
    return (
        <div className="review">
            <h3>Comentarios</h3>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={review.id || index} className="review-item">
                        <div>
                            <strong>Usuario:</strong> {review.user || "Anónimo"}
                        </div>

                        <div>
                            <strong>Calificación: </strong>
                            {[...Array(review.rating)].map((_, idx) => (
                                <FaStar key={idx} color="#ffb400" />
                            ))}
                        </div>
                        <p>{review.comment}</p>
                    </div>
                ))
            ) : (
                <p>No hay comentarios para esta película.</p>
            )}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="userName">
                    <Form.Label>Tu Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Ingresa tu nombre"
                    />
                </Form.Group>
                <div>
                    {[...Array(5)].map((_, index) => (
                        <FaStar
                            key={index}
                            onClick={() => handleStartClick(index)}
                            color={index < rating ? "#ffb400" : "#e4e5e9"}
                            style={{ cursor: "pointer", marginRight: "5px" }}
                        />
                    ))}
                </div>
                <Form.Group controlId="comment">
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Escribe tu comentario"
                    />
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-3">
                    Enviar Comentario
                </Button>
            </Form>
        </div>
    )
}
export default MovieReview