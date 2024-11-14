import { useEffect, useState } from "react"
import Loader from "../Loader/Loader"
import { useParams } from "react-router-dom"
import axios from "axios"

API_URL = "http://localhost:5005"

const EditMovieForm = () => {

    const { moviedId } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [cinema, setCinema] = useState([])
    const [movieData, setMovieData] = useState({
        poster: '',
        country: '',
        language: '',
        duration: 0,
        gender: [''],
        calification: '',
        released: true,
        date: '',
        trailer: '',
        description: '',
        cinemaId: ['']
    })

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

    const [title, setTitle] = useState({
        original: '',
        spanish: ''
    })

    const handleTitleChange = (e) => {

    }
    return (
        isLoading ? <Loader /> :
            <div className="EditMovieForm">
                <h1>Edita tu pelicula</h1>
            </div>
    )
}
export default EditMovieForm