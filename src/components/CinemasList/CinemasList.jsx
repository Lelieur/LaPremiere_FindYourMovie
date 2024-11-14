import axios from "axios"
import { useState, useEffect } from "react"

import CinemaCard from "../CinemaCard/CinemaCard"
import { Col, Row } from "react-bootstrap"

import "./CinemasList.css"
import Loader from "../Loader/Loader"

const API_URL = "http://localhost:5005"


const CinemasList = () => {

    const [cinemas, setCinemas] = useState([])
    const [isLoading, setIsLoading] = useState(true)

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

    return (

        isLoading ? <Loader /> :
            <div className="CinemaList">

                <Row>
                    {
                        cinemas.map(elm => {
                            return (
                                <Col md={{ span: 4 }} key={elm.id} >
                                    <CinemaCard {...elm} />
                                </Col>
                            )
                        })
                    }
                </Row>

            </div>
    )
}

export default CinemasList