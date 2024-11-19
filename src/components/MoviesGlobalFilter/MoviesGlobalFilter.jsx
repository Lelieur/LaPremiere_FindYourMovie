import { useEffect, useState } from "react"
import { Form, ListGroup } from "react-bootstrap"

import axios from "axios"
import { Link } from "react-router-dom"

const API_URL = "http://localhost:5005"


const MoviesGlobalFilter = ({ filterSelected, handleFilterSelected }) => {


    const [filterValue, setFilterValue] = useState()
    const [filterResults, setFilterResults] = useState([])
    const [showFilterResults, setShowFilterResults] = useState()

    const handleFilterChange = e => {
        handleShowFilterResults(true)
        const { value } = e.target
        setFilterValue(value)
    }

    useEffect(() => {
        axios
            .get(`${API_URL}/movies/?title.spanish_like=${filterValue}`)
            .then(response => {
                setFilterResults(response.data)
            })
            .catch(err => console.log(err))

    }, [filterValue])


    const handleShowFilterResults = change => {
        setShowFilterResults(change)
    }

    const changeFilterSelected = input => {
        handleFilterSelected(input)
    }

    if (filterSelected === 'cines') {
        return (
            <Form.Control
                disabled
                type="text"
                placeholder="Buscar película"
            />
        )
    } else {


        return (
            <div className="CinemasGlobalFilter">
                <Form.Control
                    type="text"
                    placeholder="Buscar película"
                    className="mr-sm-2"
                    onChange={handleFilterChange}
                    onFocus={() => { setFilterResults([]); setFilterValue(''); handleShowFilterResults(false); changeFilterSelected("pelis") }}
                    onBlur={() => { setTimeout(() => handleShowFilterResults(false), 100); changeFilterSelected("") }}
                    value={filterValue}
                />

                <ListGroup className="position-absolute z-1">

                    {
                        filterResults.map(elm => {

                            if (showFilterResults) {
                                return (
                                    <ListGroup.Item
                                        key={elm.id}
                                        as={Link}
                                        to={`/peliculas/detalles/${elm.id}`}
                                        onClick={() => setFilterValue(elm.title.spanish)}
                                    >
                                        {elm.title.spanish}
                                    </ListGroup.Item>
                                )
                            }
                        })
                    }

                </ListGroup>
            </div >
        )
    }

}

export default MoviesGlobalFilter