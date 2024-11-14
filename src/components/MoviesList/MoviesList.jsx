import { useEffect, useState } from "react"
import { Col, Row, Container } from "react-bootstrap"
import MovieCard from "../MovieCard/MovieCard"
import axios from "axios"
import "./MoviesList.css"


const API_URL = "http://localhost:5005"

const MoviesList = () => {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        fetchMovies()
    }, [])

    const fetchMovies = () => {
        axios
            .get(`${API_URL}/movies`)
            .then(response => setMovies(response.data))
            .catch(err => console.log(err))
    }

    return (
        <div className="MoviesList">
            <Container fluid className="MoviesList mt-4">
                <Row className="g-4 justify-content-center">
                    {movies.map(elm => (
                        <Col key={elm.id} lg={3} className="d-flex justify-content-center">
                            <MovieCard {...elm} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}
export default MoviesList