import { Button, Form, Row, Col } from 'react-bootstrap';

import { useState, useEffect } from 'react';

import axios from 'axios';

const API_URL = "http://localhost:5005"

const NewCineForm = () => {

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

    const [cinemaData, setCinemaData] = useState({
        name: '',
        cover: '',
        url: '',
        services: ['']
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
    }

    return (

        isLoading ? <h1>CARGANDO</h1> :

            <div className="NewCineForm mt-5">

                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={handleFormSubmit}>
                            <Form.Group className="mb-3" controlId="nameField">
                                <Form.Label className="fw-bold">Nombre</Form.Label>
                                <Form.Control type="text" value={cinemaData.name} name={'name'} onChange={handleCinemaDataChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="coverField">
                                <Form.Label className="fw-bold">Foto de portada</Form.Label>
                                <Form.Control type="text" value={cinemaData.cover} name={'cover'} onChange={handleCinemaDataChange} />
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

                            {/* <Form.Label as="legend" column sm={2}>Servicios</Form.Label> */}
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
                                <Form.Control type="text" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="moviesField">
                                <Form.Label className="fw-bold">Películas en cartelera</Form.Label>
                                <Form.Select multiple value="arrayOf">
                                    {
                                        movies.map(elm => {
                                            return (
                                                <option key={elm.id} value={elm.id}>{elm.title.spanish}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
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

export default NewCineForm