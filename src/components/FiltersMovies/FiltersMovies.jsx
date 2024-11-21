import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import "./FiltersMovies.css"

const API_URL = "http://localhost:5005"

const Filters = ({ handleFilterData }) => {
    const [filters, setFilters] = useState({
        gender: '',
        country: '',
        language: ''
    });
    const [genders, setGenders] = useState([]);
    const [countries, setCountries] = useState([]);
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/movies`)
            .then(response => {
                const movies = response.data;
                setGenders([...new Set(movies.flatMap(movie => movie.gender))]);
                setCountries([...new Set(movies.map(movie => movie.country))]);
                setLanguages([...new Set(movies.map(movie => movie.language))]);
            })
            .catch(err => console.log(err));
    }, []);

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleFilterData(filters);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col>
                    <Form.Group controlId="gender">
                        <Form.Label><strong>Género</strong></Form.Label>
                        <Form.Control as="select" name="gender" value={filters.gender} onChange={handleFilterChange}>
                            <option value="">Selecciona género</option>
                            {genders.map(gender => (
                                <option key={gender} value={gender}>{gender}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="country">
                        <Form.Label><strong>País</strong></Form.Label>
                        <Form.Control as="select" name="country" value={filters.country} onChange={handleFilterChange}>
                            <option value="">Selecciona un país</option>
                            {countries.map(country => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="language">
                        <Form.Label><strong>Idioma</strong></Form.Label>
                        <Form.Control as="select" name="language" value={filters.language} onChange={handleFilterChange}>
                            <option value="">Selecciona idioma</option>
                            {languages.map(language => (
                                <option key={language} value={language}>{language}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>

            <Button className="styled-button-2" variant="dark" type="submit">
                Aplicar Filtros
            </Button>

        </Form>
    );
};

export default Filters;

