import { useEffect, useState } from "react"
import { Form, ListGroup } from "react-bootstrap"

import axios from "axios"
import { Link } from "react-router-dom"
import { TbRuler } from "react-icons/tb"

const API_URL = import.meta.env.VITE_APP_API_URL


const CinemasGlobalFilter = ({ filterSelected, handleFilterSelected }) => {

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
            .get(`${API_URL}/cinemas/?name_like=${filterValue}`)
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

    if (filterSelected === 'pelis') {
        return (
            <Form.Control
                disabled
                type="text"
                placeholder="Buscar cine"
            />
        )

    } else {
        return (
            <div className="CinemasGlobalFilter">

                <Form.Control
                    type="text"
                    placeholder="Buscar cine"
                    className="form-control mr-sm-2"
                    onChange={handleFilterChange}
                    onFocus={() => { setFilterResults([]); setFilterValue(''); handleShowFilterResults(false); changeFilterSelected("cines") }}
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
                                        to={`/cines/detalles/${elm.id}`}
                                        onClick={() => setFilterValue(elm.name)}
                                    >
                                        {elm.name}
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

export default CinemasGlobalFilter