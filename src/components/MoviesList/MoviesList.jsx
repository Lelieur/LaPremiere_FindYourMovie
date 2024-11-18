import { useEffect, useState } from "react"
import { Col, Row, Container } from "react-bootstrap"
import MovieCard from "../MovieCard/MovieCard"
import axios from "axios"
import "./MoviesList.css"
import Loader from "../Loader/Loader"

const API_URL = "http://localhost:5005"

const MoviesList = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [movies, setMovies] = useState([])

    useEffect(() => {
        fetchMovies()
    }, [])

    const fetchMovies = () => {
        axios
            .get(`${API_URL}/movies`)
            .then(response => {
                setMovies(response.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    return (
        isLoading ? <Loader /> :
            <div className="MoviesList">
                <Row className="mt-1 g-4 justify-content-center">
                    {
                        movies.map(elm => {
                            if (!elm.isDeleted) {
                                return (
                                    <Col key={elm.id} lg={3} className="d-flex justify-content-center">
                                        <MovieCard {...elm} />
                                    </Col>
                                )
                            }
                        })
                    }
                </Row>
            </div>
    )
}
export default MoviesList