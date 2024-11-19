import { useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap"
import Loader from "../Loader/Loader"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const API_URL = "http://localhost:5005"

const NewMovieForm = () => {

    const navigate = useNavigate()

    const [cinemas, setCinemas] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [movieData, setMovieData] = useState({
        poster: '',
        country: '',
        language: '',
        duration: 0,
        gender: [''],
        calification: '',
        released: true,
        date: '',
        director: '',
        trailer: '',
        description: '',
        cinemaId: [''],
        casting: [{ name: '', photo: '' }]
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
        const { name, value } = e.target
        setTitle({ ...title, [name]: value })
    }
    const handleCinemaChange = (e, idx) => {
        const { value } = e.target
        const cinemasCopy = [...movieData.cinemaId]
        cinemasCopy[idx] = Number(value)
        const filteredCinemas = cinemasCopy.filter(cinema => cinema !== "")
        setMovieData({ ...movieData, cinemaId: filteredCinemas })
    }

    const handleMovieChange = (e) => {
        const { name, value, checked, type } = e.target;
        const result = type === 'checkbox' ? checked : value
        setMovieData({ ...movieData, [name]: result });
    }

    const handleGenderChange = (e, idx) => {
        const { value } = e.target
        const gendersCopy = [...movieData.gender]
        gendersCopy[idx] = value
        setMovieData({ ...movieData, gender: gendersCopy })
    }
    const handleCastingChange = (e, idx, field) => {
        const { value } = e.target
        const updatedCasting = [...movieData.casting]
        updatedCasting[idx][field] = value
        setMovieData({ ...movieData, casting: updatedCasting })
    }

    const addNewCinema = () => {
        setMovieData((prevData) => ({
            ...prevData,
            cinemaId: [...prevData.cinemaId, '']
        }))
    }
    const deletNewCinema = (idx) => {
        setMovieData((prevData) => {
            const cinemaIdCopy = [...prevData.cinemaId]
            cinemaIdCopy.splice(idx, 1)
            return { ...prevData, cinemaId: cinemaIdCopy }
        })
    }

    const addNewGender = () => {
        const gendersCopy = [...movieData.gender]
        gendersCopy.push('')
        setMovieData({ ...movieData, gender: gendersCopy })
    }
    const deletNewGender = () => {
        const gendersCopy = [...movieData.gender]
        gendersCopy.pop()
        setMovieData({ ...movieData, gender: gendersCopy })
    }
    const addNewCasting = () => {
        const updatedCasting = [...movieData.casting]
        updatedCasting.push({ name: '', photo: '' })
        setMovieData({ ...movieData, casting: updatedCasting })
    }
    const deletedNewCasting = (idx) => {
        const updatedCasting = [...movieData.casting]
        updatedCasting.splice(idx, 1)
        setMovieData({ ...movieData, casting: updatedCasting })
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const reqPayload = {
            ...movieData,
            title: title
        }

        axios
            .post(`${API_URL}/movies`, reqPayload)
            .then((response) => {
                const { data: newMovie } = response

                axios
                    .get(`${API_URL}/cinemas/`)
                    .then(response => {

                        const { data: allCinemas } = response

                        const filteredCinemas = allCinemas.filter(eachCinema => {
                            return (newMovie.cinemaId.includes(eachCinema.id))
                        })

                        filteredCinemas.map(eachCinema => {

                            let copyCinemaToEdit = {
                                ...eachCinema
                            }

                            const newMoviesIds =
                                Array.isArray(copyCinemaToEdit.movieId) ?
                                    copyCinemaToEdit.movieId :
                                    [copyCinemaToEdit.movieId]

                            newMoviesIds.push(newMovie.id)

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

                navigate(`/peliculas/detalles/${newMovie.id}`)
            })
            .catch(err => console.log(err))
    }

    return (
        isLoading ? <Loader /> :

            <div className="NewMovieForm mt-5">

                <Form className="form" onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3" controlId="titleField">
                        <Form.Label><strong>Títulos</strong></Form.Label>

                        <Form.Control className="mb-2"
                            type="text"
                            placeholder="Título Original"
                            name="original"
                            value={title.original}
                            onChange={(e) => handleTitleChange(e)}
                        />
                        <Form.Control
                            type="text"
                            placeholder="Título en España"
                            name="spanish"
                            value={title.spanish}
                            onChange={(e) => handleTitleChange(e)}
                        />



                    </Form.Group>
                    <Form.Group className="mb-3" controlId="posterField">
                        <Form.Label><strong>Imagen</strong></Form.Label>
                        <Form.Control
                            type="text"
                            name="poster"
                            value={movieData.poster}
                            onChange={handleMovieChange}
                            placeholder="URL de la imagen"
                        />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="countryField">
                        <Form.Label><strong>País</strong></Form.Label>
                        <Form.Control
                            type="text"
                            name="country"
                            value={movieData.country}
                            onChange={handleMovieChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="languageField">
                        <Form.Label><strong>Idioma</strong></Form.Label>
                        <Form.Control
                            type="text"
                            name="language"
                            value={movieData.language}
                            onChange={handleMovieChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="durationField">
                        <Form.Label><strong>Duración</strong> (minutos)</Form.Label>
                        <Form.Control
                            type="number"
                            name="duration"
                            value={movieData.duration}
                            onChange={handleMovieChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="genderField">
                        <Form.Label><strong>Género</strong></Form.Label>
                        {
                            movieData.gender.map((eachGender, idx) => {
                                return (
                                    <Form.Control
                                        className="mb-2"
                                        type="text"
                                        onChange={(event) => handleGenderChange(event, idx)}
                                        value={eachGender}
                                        key={idx}
                                    />
                                )
                            })
                        }

                        <Button className="styled-button-2 me-2" size="sm" variant="dark" onClick={addNewGender}>Añadir Género</Button>
                        <Button className="styled-button-2 me-2" size="sm" variant="dark" onClick={deletNewGender}>Quitar Género</Button>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="calificationField">
                        <Form.Label><strong>Calificación</strong></Form.Label>
                        <Form.Control
                            type="text"
                            name="calification"
                            value={movieData.calification}
                            onChange={handleMovieChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="dateField">
                        <Form.Label><strong>Fecha de estreno</strong></Form.Label>
                        <Form.Control
                            type="date"
                            name="date"
                            value={movieData.date}
                            onChange={handleMovieChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="directorField">
                        <Form.Label><strong>Director</strong></Form.Label>
                        <Form.Control
                            type="text"
                            name="director"
                            value={movieData.director}
                            onChange={handleMovieChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="castingField">
                        <Form.Label><strong>Casting</strong></Form.Label>
                        {movieData.casting.map((eachCasting, idx) => (
                            <div key={idx} className="d-flex align-items-center mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Nombre del actor"
                                    value={eachCasting.name}
                                    onChange={(event) =>
                                        handleCastingChange(event, idx, 'name')
                                    }
                                    className="me-2"
                                />
                                <Form.Control
                                    type="text"
                                    placeholder="URL de la foto"
                                    value={eachCasting.photo}
                                    onChange={(event) =>
                                        handleCastingChange(event, idx, 'photo')
                                    }
                                    className="me-2"
                                />
                            </div>
                        ))}
                        <Button
                            className="styled-button-2 me-2"
                            size="sm"
                            variant="dark"
                            onClick={addNewCasting}
                        >
                            Añadir Actor
                        </Button>
                        <Button
                            className="styled-button-2"
                            size="sm"
                            variant="dark"
                            onClick={() => deletedNewCasting(idx)}
                        >
                            Quitar Actor
                        </Button>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="trailerField">
                        <Form.Label><strong>Tráiler (URL)</strong></Form.Label>
                        <Form.Control
                            type="text"
                            name="trailer"
                            value={movieData.trailer}
                            onChange={handleMovieChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="descriptionField">
                        <Form.Label><strong>Descripción</strong></Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={movieData.description}
                            onChange={handleMovieChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="cinemaField">
                        <Form.Label><strong>Cines</strong></Form.Label>
                        {movieData.cinemaId.map((eachCinema, idx) => (
                            <Form.Control
                                key={idx}
                                as="select"
                                value={eachCinema}
                                onChange={(event) => handleCinemaChange(event, idx)}
                                className="mb-2"
                            >
                                <option value="">Selecciona un cine</option>
                                {cinemas.map((cinema) => (
                                    <option key={cinema.id} value={cinema.id}>
                                        {cinema.name}
                                    </option>
                                ))}
                            </Form.Control>
                        ))}
                        <Button className="styled-button-2 me-2" size="sm" variant="dark" onClick={addNewCinema}>Añadir Cine</Button>
                        <Button className="styled-button-2 me-2" size="sm" variant="dark" onClick={deletNewCinema}>Quitar Cine</Button>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="releasedField">
                        <Form.Check
                            type="checkbox"
                            name="released"
                            checked={movieData.released}
                            onChange={handleMovieChange}
                            label="¿Película lanzada?"
                        />
                    </Form.Group>

                    <Button className="styled-button-2" variant="dark" type="submit">
                        Guardar película
                    </Button>
                </Form>

            </div>
    );
}
export default NewMovieForm