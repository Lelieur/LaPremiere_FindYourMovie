import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import MovieCard from "../MovieCard/MovieCard"
import axios from "axios"
import "./MoviesList.css"
import Loader from "../Loader/Loader"

const API_URL = "http://localhost:5005"

const MoviesList = ({ filterData }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [movies, setMovies] = useState([])
    console.log(filterData)

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

    let filteredMovies = []


    if (filterData) {

        filteredMovies = movies.filter(eachMovie => {
            const genderMatch = !filterData.gender || eachMovie.gender.includes(filterData.gender);

            // Aplica el filtro de país solo si se ha seleccionado uno
            const countryMatch = !filterData.country || eachMovie.country === filterData.country;

            // Aplica el filtro de idioma solo si se ha seleccionado uno
            const languageMatch = !filterData.language || eachMovie.language === filterData.language;

            // Todos los filtros deben coincidir si están activos
            return genderMatch && countryMatch && languageMatch;
        });



    }


    console.log(filteredMovies)


    return (
        isLoading ? <Loader /> :
            filterData === undefined ?
                <div className="MoviesList">
                    <Row className="p-5">
                        {
                            movies.map(elm => {
                                if (!elm.isDeleted) {
                                    return (
                                        <Col className="mb-5" key={elm.id} md={{ span: 3 }}>
                                            <MovieCard {...elm} />
                                        </Col>
                                    )
                                }
                            })
                        }
                    </Row>
                </div>
                :
                <div className="MoviesList">
                    <Row className="p-5">
                        {
                            filteredMovies.map(elm => {
                                if (!elm.isDeleted) {
                                    return (
                                        <Col className="mb-5" key={elm.id} md={{ span: 3 }}>
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