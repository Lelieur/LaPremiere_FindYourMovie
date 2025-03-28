import CinemaCard from "../../../components/CinemaCard/CinemaCard"
import Loader from "../../../components/Loader/Loader"

import { useState, useEffect, useContext } from "react"
import { Row, Col, Container, Button } from "react-bootstrap"

import { Navigate } from "react-router-dom"
import { AuthContext } from "../../../contexts/auth.context"

import axios from "axios"

const API_URL = import.meta.env.VITE_APP_API_URL

const DeletedCinemasPage = () => {

    const { loggedUser } = useContext(AuthContext)

    if (!loggedUser) {
        return <Navigate to="/cines" />
    }

    const [cinemas, setCinemas] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchCinemas()
    }, [])

    const fetchCinemas = () => {
        axios
            .get(`${API_URL}/cinemas`)
            .then(response => {
                setCinemas(response.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const handleCinemaRecovery = (cinema) => {
        axios
            .get((`${API_URL}/movies/`))
            .then(response => {

                const { data: allMovies } = response

                const filteredMovies = allMovies.filter(eachMovie => {
                    return (cinema.movieId.includes(eachMovie.id))
                })

                filteredMovies.map(eachMovie => {

                    let copyMovieToEdit = {
                        ...eachMovie
                    }

                    const newCinemasIds =
                        Array.isArray(copyMovieToEdit.cinemaId) ?
                            copyMovieToEdit.cinemaId :
                            [copyMovieToEdit.cinemaId]

                    newCinemasIds.push(cinema.id)

                    copyMovieToEdit = {
                        ...eachMovie,
                        cinemaId: newCinemasIds
                    }

                    axios
                        .put(`${API_URL}/movies/${eachMovie.id}`, copyMovieToEdit)
                        .then(() => { })
                        .catch(err => console.log(err))
                })
            })
            .catch(err => console.log(err))

        axios
            .patch((`${API_URL}/cinemas/${cinema.id}`), { isDeleted: false })
            .then(fetchCinemas())
            .catch(err => console.log(err))
    }


    return (

        isLoading ? <Loader /> :

            <Container className="mt-5">

                <div className="DeletedCinemasPage">

                    <Row>
                        {
                            cinemas.map(elm => {
                                if (elm.isDeleted) {
                                    return (
                                        <Col className="text-center" md={{ span: 4 }} key={elm.id} >
                                            <CinemaCard {...elm} />
                                            <Button className="styled-button-2 mt-3" variant="success" onClick={() => handleCinemaRecovery(elm)}>Recuperar cine</Button>
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

export default DeletedCinemasPage