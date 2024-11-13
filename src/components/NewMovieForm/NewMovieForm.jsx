import { useEffect, useState } from "react"
import { Row, Col, Form, Button, InputGroup } from "react-bootstrap"

import axios from "axios"

const API_URL = "http://localhost:5005"

const NewMovieForm = () => {

    const [movieData, setMovieData] = useState({
        title: [{ language: '', value: '' }],
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
        cinemaId: [''],
    })
    const [cinemas, setCinemas] = useState([])
    useEffect(() => {
        axios
            .get(`${API_URL}/cinemas`)
            .then(response => setCinemas(response.data))
            .catch(err => console.log(err))
    }, [])
    // Función para manejar el cambio en los campos generales
    const handleMovieChange = (e) => {
        const { name, value, checked, type } = e.target;
        const result = type === 'checkbox' ? checked : value;
        setMovieData({ ...movieData, [name]: result });
    };

    // Función para manejar el cambio de cada título en el objeto `title`
    const handleTitleChange = (e, idx) => {
        const { value } = e.target;
        const titlesCopy = [...movieData.title];
        titlesCopy[idx] = { ...titlesCopy[idx], value };
        setMovieData({ ...movieData, title: titlesCopy });
    };
    // Añadir un nuevo campo de título vacío
    const addNewTitle = () => {
        setMovieData({
            ...movieData,
            title: [...movieData.title, { language: '', value: '' }]
        });
    };

    // Función para manejar el cambio de cada título en el array `cinema`
    const handleCinemaChange = (e, idx) => {
        const { value } = e.target;
        const cinemasCopy = [...movieData.cinemaId];
        cinemasCopy[idx] = value;
        setMovieData({ ...movieData, cinemaId: cinemasCopy });
    };
    //Añadir nuevo campo de Cine

    const addNewCinema = () => {
        setMovieData((prevData) => ({
            ...prevData,
            cinemaId: [...prevData.title, '']
        }));
    };

    // Maneja el envío del formulario
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(movieData);
    }
    return (
        <div className="NewMovieForm mt-5">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form onSubmit={handleFormSubmit}>


                        <Form.Group className="mb-3" controlId="titleField">
                            <Form.Label>Títulos</Form.Label>
                            {movieData.title.map((eachTitle, idx) => (
                                <InputGroup className="mb-2" key={idx}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Título Original"
                                        name="language"
                                        value={eachTitle.language}
                                        onChange={e => handleTitleChange(e, idx)}
                                    />
                                    <Form.Control
                                        type="text"
                                        placeholder="Título en España"
                                        name="value"
                                        value={eachTitle.value}
                                        onChange={e => handleTitleChange(e, idx)}
                                    />
                                </InputGroup>
                            ))}
                            <Button size="sm" variant="dark" onClick={addNewTitle}>
                                Añadir título
                            </Button>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="posterField">
                            <Form.Label>Imagen</Form.Label>
                            <Form.Control
                                type="text"
                                name="poster"
                                value={movieData.poster}
                                onChange={handleMovieChange}
                                placeholder="URL de la imagen"
                            />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="countryField">
                            <Form.Label>País</Form.Label>
                            <Form.Control
                                type="text"
                                name="country"
                                value={movieData.country}
                                onChange={handleMovieChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="languageField">
                            <Form.Label>Idioma</Form.Label>
                            <Form.Control
                                type="text"
                                name="language"
                                value={movieData.language}
                                onChange={handleMovieChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="durationField">
                            <Form.Label>Duración (minutos)</Form.Label>
                            <Form.Control
                                type="number"
                                name="duration"
                                value={movieData.duration}
                                onChange={handleMovieChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="genderField">
                            <Form.Label>Género</Form.Label>
                            <Form.Control
                                type="text"
                                name="gender"
                                value={movieData.gender}
                                onChange={handleMovieChange}
                                placeholder="Ejemplo: Acción, Comedia"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="calificationField">
                            <Form.Label>Calificación</Form.Label>
                            <Form.Control
                                type="text"
                                name="calification"
                                value={movieData.calification}
                                onChange={handleMovieChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="dateField">
                            <Form.Label>Fecha de estreno</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={movieData.date}
                                onChange={handleMovieChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="trailerField">
                            <Form.Label>Tráiler (URL)</Form.Label>
                            <Form.Control
                                type="text"
                                name="trailer"
                                value={movieData.trailer}
                                onChange={handleMovieChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="descriptionField">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={movieData.description}
                                onChange={handleMovieChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="cinemaField">
                            <Form.Label>Cines</Form.Label>
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
                                        <option key={cinema._id} value={cinema._id}>
                                            {cinema.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            ))}
                            <Button size="sm" variant="dark" onClick={addNewCinema}>
                                Añadir cine
                            </Button>
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

                        <Button variant="primary" type="submit">
                            Guardar película
                        </Button>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}
export default NewMovieForm