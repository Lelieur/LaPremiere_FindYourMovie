import { Row, Col } from "react-bootstrap"
import NewMovieReviewForm from "../../../components/NewMovieReviewForm/NewMovieReviewForm"
import { useParams } from "react-router-dom"
import axios from "axios"
import { useState } from "react"

const API_URL = "http://localhost:5005"

const ReviewMoviePage = () => {

    const { movieId } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [reviews, setReviews] = useState([])


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
        <div className="ReviewMoviePage">

            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <NewMovieReviewForm
                        onAddReview={addReview} />
                </Col>
            </Row>

        </div>
    )
}

export default ReviewMoviePage