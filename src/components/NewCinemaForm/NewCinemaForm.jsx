import { Button, Form, Row, Col } from 'react-bootstrap';

import { useState, useEffect } from 'react';

import axios from 'axios';
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:5005"

const NewCinemaForm = () => {

    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

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

    const [cinemaData, setCinemaData] = useState({
        name: '',
        cover: [''],
        url: '',
        services: [''],
        movieId: ['']
    })

    const [address, setAddress] = useState({
        street: '',
        city: '',
        zipcode: 0,
        country: ''
    })

    const [price, setPrice] = useState({
        regular: 0,
        weekend: 0,
        special: 0
    })

    const [specs, setSpecs] = useState({
        VO: false,
        is3D: false,
        accesibility: false
    })

    const [capacity, setCapacity] = useState({
        dicerooms: 0,
        seating: 0
    })


    const handleCinemaDataChange = e => {
        const { name, value } = e.target

        setCinemaData({
            ...cinemaData, [name]: value
        }
        )
    }

    const handleCoversChange = (e, idx) => {

        const { value } = e.target

        const coversCopy = [...cinemaData.cover]

        coversCopy[idx] = value

        setCinemaData({
            ...cinemaData, cover: coversCopy
        })
    }


    const addNewCinemaCover = () => {
        const coversCopy = [...cinemaData.cover]
        coversCopy.push('')
        setCinemaData({ ...cinemaData, cover: coversCopy })
    }

    const deleteNewCinemaCover = () => {
        const coversCopy = [...cinemaData.cover]
        coversCopy.pop('')
        setCinemaData({ ...cinemaData, cover: coversCopy })
    }

    const handleServicesChange = (e, idx) => {

        const { value } = e.target

        const servicesCopy = [...cinemaData.services]

        servicesCopy[idx] = value

        setCinemaData({
            ...cinemaData, services: servicesCopy
        })
    }

    const addNewService = () => {
        const servicesCopy = [...cinemaData.services]
        servicesCopy.push('')
        setCinemaData({ ...cinemaData, services: servicesCopy })
    }

    const deletNewService = () => {
        const servicesCopy = [...cinemaData.services]
        servicesCopy.pop('')
        setCinemaData({ ...cinemaData, services: servicesCopy })
    }

    const handleMovieIdChange = (e, idx) => {

        const { value } = e.target

        const moviesIdsCopy = [...cinemaData.movieId]

        moviesIdsCopy[idx] = Number(value)

        setCinemaData({
            ...cinemaData, movieId: moviesIdsCopy
        })
    }

    const addNewMovieId = () => {
        const moviesIdsCopy = [...cinemaData.movieId]
        moviesIdsCopy.push('')
        setCinemaData({ ...cinemaData, movieId: moviesIdsCopy })
    }

    const deletNewMovieId = () => {
        const moviesIdsCopy = [...cinemaData.movieId]
        moviesIdsCopy.pop('')
        setCinemaData({ ...cinemaData, movieId: moviesIdsCopy })
    }



    const handleAddresChange = e => {
        const { name, value } = e.target

        setAddress({
            ...address, [name]: value
        })
    }

    const handlePriceChange = e => {
        const { name, value } = e.target

        setPrice({
            ...price, [name]: value
        })
    }

    const handleSpecsChange = e => {
        const { name, checked } = e.target

        setSpecs({
            ...specs, [name]: checked
        })
    }

    const handleCapacityChange = e => {
        const { name, value } = e.target

        setCapacity({
            ...capacity, [name]: value
        })
    }

    const handleFormSubmit = e => {

        e.preventDefault()

        const reqPayload = {
            ...cinemaData,
            address: address,
            price: price,
            specs: specs,
            capacity: capacity
        }

        axios
            .post(`${API_URL}/cinemas`, reqPayload)
            .then((response) => {
                const { data: newCinema } = response

                axios
                    .get(`${API_URL}/movies/`)
                    .then(response => {

                        const { data: allMovies } = response

                        const filteredMovies = allMovies.filter(eachMovie => {
                            return (newCinema.movieId.includes(eachMovie.id))
                        })

                        filteredMovies.map(eachMovie => {

                            let copyMovieToEdit = {
                                ...eachMovie
                            }

                            const newCinemasIds =
                                Array.isArray(copyMovieToEdit.cinemaId) ?
                                    copyMovieToEdit.cinemaId :
                                    [copyMovieToEdit.cinemaId]

                            newCinemasIds.push(newCinema.id)

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


                alert('HECHO!')
                navigate(`/cines/detalles/${newCinema.id}`)
            })
            .catch(err => console.log(err))
    }

    return (

        isLoading ? <Loader /> :

            <div className="NewCineForm mt-5">

                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={handleFormSubmit}>
                            <Form.Group className="mb-3" controlId="nameField">
                                <Form.Label className="fw-bold">Nombre</Form.Label>
                                <Form.Control type="text" value={cinemaData.name} name={'name'} onChange={handleCinemaDataChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="coverField">
                                <Form.Label className="fw-bold">Añadir fotos (URL)</Form.Label>

                                <div>
                                    {
                                        cinemaData.cover.map((eachCover, idx) => {
                                            return (
                                                <Form.Control
                                                    key={idx}
                                                    className="mb-2"
                                                    name={'cover'}
                                                    type="text"
                                                    onChange={e => handleCoversChange(e, idx)}
                                                    value={eachCover}>
                                                </Form.Control>
                                            )
                                        })

                                    }
                                </div>

                                <Button className="me-2" size="sm" variant="dark" onClick={addNewCinemaCover}>Añadir foto</Button>
                                <Button className="me-2" size="sm" variant="dark" onClick={deleteNewCinemaCover}>Quitar foto</Button>

                            </Form.Group>

                            <Row className="mt-4 mb-4">
                                <Form.Label className="fw-bold">Dirección</Form.Label>
                                <Col md={{ span: 12 }}>
                                    <Form.Group className="mb-3" controlId="streetField">
                                        <Form.Label>Calle</Form.Label>
                                        <Form.Control type="text" value={address.street} name={'street'} onChange={handleAddresChange} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="countryField">
                                        <Form.Label>País</Form.Label>
                                        <Form.Control type="text" value={address.country} name={'country'} onChange={handleAddresChange} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="cityField">
                                        <Form.Label>Ciudad</Form.Label>
                                        <Form.Control type="text" value={address.city} name={'city'} onChange={handleAddresChange} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="zipCodeField">
                                        <Form.Label>Código Postal</Form.Label>
                                        <Form.Control type="number" value={address.zipcode} name={'zipcode'} onChange={handleAddresChange} />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3" controlId="urlField">
                                <Form.Label className="fw-bold">Sitio web</Form.Label>
                                <Form.Control type="url" value={cinemaData.url} name={'url'} onChange={handleCinemaDataChange} />
                            </Form.Group>

                            <Row className="mt-4 mb-4">
                                <Form.Label className="fw-bold">Precios</Form.Label>
                                <Col>
                                    <Form.Group className="mb-3" controlId="regularPriceField">
                                        <Form.Label>Normal</Form.Label>
                                        <Form.Control type="number" value={price.regular} name={'regular'} onChange={handlePriceChange} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="weekendPriceField">
                                        <Form.Label>Fin de semana</Form.Label>
                                        <Form.Control type="number" value={price.weekend} name={'weekend'} onChange={handlePriceChange} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="specialPriceField">
                                        <Form.Label>Especial</Form.Label>
                                        <Form.Control type="number" value={price.special} name={'special'} onChange={handlePriceChange} />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Form.Label className="fw-bold">Especificaciones</Form.Label>
                                <Col>
                                    <Form.Group className="mb-3 align-items-center" controlId="is3DField">
                                        <Form.Check
                                            type="checkbox"
                                            label="3D"
                                            name="is3D"
                                            id="is3DCheck"
                                            checked={specs.is3D}
                                            onChange={handleSpecsChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3 align-items-center" controlId="voField">
                                        <Form.Check
                                            type="checkbox"
                                            label="VO"
                                            name="VO"
                                            id="voCheck"
                                            checked={specs.VO}
                                            onChange={handleSpecsChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3 align-items-center" controlId="accesibilityField">
                                        <Form.Check
                                            type="checkbox"
                                            label="Accesibilidad"
                                            name="accesibility"
                                            id="accesibilityCheck"
                                            checked={specs.accesibility}
                                            onChange={handleSpecsChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>


                            <Row className='mt-4 mb-4'>
                                <Form.Label className="fw-bold">Capacidad</Form.Label>
                                <Col>
                                    <Form.Group className="mb-3" controlId="diceRoomsField">
                                        <Form.Label>Número de salas</Form.Label>
                                        <Form.Control type="number" value={capacity.dicerooms} name={'dicerooms'} onChange={handleCapacityChange} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="seatingField">
                                        <Form.Label>Aforo total</Form.Label>
                                        <Form.Control type="number" value={capacity.seating} name={'seating'} onChange={handleCapacityChange} />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3" controlId="servicesField">
                                <Form.Label className="fw-bold">Servicios</Form.Label>

                                <div>
                                    {
                                        cinemaData.services.map((eachService, idx) => {
                                            return (
                                                <Form.Control
                                                    key={idx}
                                                    as="select"
                                                    className="mb-2"
                                                    type="text"
                                                    onChange={e => handleServicesChange(e, idx)}
                                                    value={eachService}>

                                                    <option>Selecciona un servicio</option>
                                                    <option>Parking</option>
                                                    <option>Food & Drinks</option>
                                                    <option>Toilettes</option>

                                                </Form.Control>
                                            )
                                        })

                                    }

                                </div>

                                <Button className="me-2" size="sm" variant="dark" onClick={addNewService}>Añadir servicio</Button>
                                <Button className="me-2" size="sm" variant="dark" onClick={deletNewService}>Quitar servicio</Button>

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="moviesField">
                                <Form.Label className="fw-bold">Películas en cartelera</Form.Label>

                                <div>
                                    {
                                        cinemaData.movieId.map((eachMovieId, idx) => {
                                            return (
                                                <Form.Select
                                                    key={idx}
                                                    className='mb-2'
                                                    type="text"
                                                    onChange={e => handleMovieIdChange(e, idx)}
                                                    value={eachMovieId}>
                                                    <option>Selecciona una película</option>
                                                    {
                                                        movies.map(elm => {
                                                            return (
                                                                <option key={elm.id} value={elm.id}>{elm.title.spanish}</option>
                                                            )
                                                        })
                                                    }
                                                </Form.Select>
                                            )
                                        })
                                    }
                                </div>

                                <Button className="me-2" size="sm" variant="dark" onClick={addNewMovieId}>Añadir película</Button>
                                <Button className="me-2" size="sm" variant="dark" onClick={deletNewMovieId}>Quitar película</Button>

                            </Form.Group>

                            <div className="d-grid mt-5">
                                <Button variant="dark" type="submit">Crear nuevo cine</Button>
                            </div>

                        </Form>
                    </Col>
                </Row>


            </div >
    )
}

export default NewCinemaForm