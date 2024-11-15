import CinemaCard from "../../../components/CinemaCard/CinemaCard"
import Loader from "../../../components/Loader/Loader"

import { useState, useEffect } from "react"
import { Row, Col, Container, Button } from "react-bootstrap"

import axios from "axios"

const API_URL = "http://localhost:5005"

const DeletedCinemasPage = () => {

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

    const handleCinemaRecovery = (id) => {
        axios
            .patch((`${API_URL}/cinemas/${id}`), { isDeleted: false })
            .then(fetchCinemas())
            .catch(err => console.log(err))
    }


    return (

        isLoading ? <Loader /> :

            <Container className="mt-5">

                <div className="DeletedCinemasPage">

                    <Row>
                        {
                            cinemas.map(elm => {
                                if (elm.isDeleted) {
                                    return (
                                        <Col md={{ span: 4 }} key={elm.id} >
                                            <CinemaCard {...elm} />
                                            <Button className="mt-3" variant="success" onClick={() => handleCinemaRecovery(elm.id)}>Recuperar cine</Button>
                                        </Col>
                                    )
                                }
                            })
                        }
                    </Row>

                </div>

            </Container>

    )
}

export default DeletedCinemasPage