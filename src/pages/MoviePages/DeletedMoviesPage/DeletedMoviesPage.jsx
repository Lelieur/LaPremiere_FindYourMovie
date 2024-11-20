import axios from "axios"
import { useEffect, useState, useContext } from "react"
import Loader from "../../../components/Loader/Loader"
import { Row, Col, Container, Button } from "react-bootstrap"
import MovieCard from "../../../components/MovieCard/MovieCard"

import { Navigate } from "react-router-dom"
import { AuthContext } from "../../../contexts/auth.context"

const API_URL = "http://localhost:5005"

const DeletedMoviesPage = () => {

    const { loggedUser } = useContext(AuthContext)

    if (!loggedUser) {
        return <Navigate to="/peliculas" />
    }

    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true)

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

    const handleMovieRecovery = (movie) => {
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
                            copyCinemaToEdit.movieId :
                            [copyCinemaToEdit.movieId]

                    newMoviesIds.push(movie.id)

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
            .patch((`${API_URL}/movies/${movie.id}`), { isDeleted: false })
            .then(() => fetchMovies())
            .catch(err => console.log(err))
    }


    return (

        isLoading ? <Loader /> :

            <Container className="mt-5">

                <div className="DeletedMoviesPage">

                    <Row>
                        {
                            movies.map(elm => {
                                if (elm.isDeleted) {
                                    return (
                                        <Col className="text-center" md={{ span: 4 }} key={elm.id} >
                                            <MovieCard {...elm} />
                                            <Button className="styled-button-2 mt-3" variant="success" onClick={() => handleMovieRecovery(elm)}>Recuperar película</Button>
                                        </Col>
                                    )
                                }
                            })
                        }
                    </Row>

                </div>

            </Container>

    )
}
export default DeletedMoviesPage