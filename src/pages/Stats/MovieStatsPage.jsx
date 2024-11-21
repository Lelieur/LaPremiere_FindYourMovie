import { useContext, useEffect, useState } from "react"
import { Row, Col, Container } from "react-bootstrap"

import axios from "axios"
import Loader from "../../components/Loader/Loader"
import { AuthContext } from "../../contexts/auth.context"

const API_URL = "http://localhost:5005"

import MoviesGenrePieChart from "../../components/MoviesGenrePieChart/MoviesGenrePieChart"
import CinemasSeatingPieChart from "../../components/CinemasSeatingPieChart/CinemasSeatingPieChart"

import "./MovieStatsPage.css"
import { Navigate } from "react-router-dom"

const MovieStatsPage = () => {

    const { loggedUser } = useContext(AuthContext)

    if (!loggedUser) {
        return <Navigate to="/" />
    }

    const [isLoading, setIsLoading] = useState(true)
    const [cinemas, setCinemas] = useState([])
    const [movies, setMovies] = useState([])

    let numLongMovies = 0
    let numShortMovies = 0

    movies.forEach(eachMovie => {
        if (!eachMovie.isDeleted && eachMovie.duration > 120) {
            numLongMovies++
        } else if (!eachMovie.isDeleted && eachMovie.duration <= 120) {
            numShortMovies++
        }
    })

    const longFilmsData = {
        id: "> 120 min",
        value: numLongMovies
    }

    const shortFilmsData = {
        id: "< 120 min",
        value: numShortMovies
    }

    const durationData = [longFilmsData, shortFilmsData]


    let smallCinemas = 0
    let bigCinemas = 0

    cinemas.forEach(eachCinema => {
        if (!eachCinema.isDeleted && Number(eachCinema.capacity.seating) <= 600) {
            smallCinemas++
        } else if (!eachCinema.isDeleted && Number(eachCinema.capacity.seating) > 600) {
            bigCinemas++
        }
    })

    const bigCinemasData = {
        id: "> 600 butacas",
        value: bigCinemas
    }

    const smallCinemasData = {
        id: "< 600 butacas",
        value: smallCinemas
    }

    const seatingData = [bigCinemasData, smallCinemasData]


    useEffect(() => {
        fetchData()
    }, [])



    const fetchData = () => {

        const promises = [
            axios.get(`${API_URL}/movies/`),
            axios.get(`${API_URL}/cinemas/`),
        ]

        Promise
            .all(promises)
            .then(([movies, cinemas]) => {
                setMovies(movies.data)
                setCinemas(cinemas.data)
            })
            .then(() => setIsLoading(false))
            .catch(err => console.log(err))
    }


    return (

        isLoading ? <Loader /> :

            <div className="MovieStatsPage">
                <Container className="h-100">
                    <Row className="stats h-100">
                        <Col md={6} className="text-center h-100">
                            <MoviesGenrePieChart data={durationData} />
                        </Col>
                        <Col md={6} className="text-center h-100">
                            <CinemasSeatingPieChart data={seatingData} />
                        </Col>
                    </Row>
                </Container>
            </div>

    )
}

export default MovieStatsPage