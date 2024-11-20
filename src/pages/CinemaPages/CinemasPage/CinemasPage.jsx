import { Link } from "react-router-dom"
import { Container, Button, Row, Col } from 'react-bootstrap'

import CinemasList from "../../../components/CinemasList/CinemasList"

import "./CinemasPage.css"

const CinemasPage = () => {
    return (
        <div className="CinemasPage">

            <Container className="text-center">
                <Row className="mt-5 d-flex align-items-center">
                    <Col>
                        <h3 className="section-title">ENCUENTRA TU CINE</h3>
                        <hr />
                    </Col>
                </Row>
                <Row className="mt-5">
                    <CinemasList />
                </Row>
                <Button variant="dark" className="styled-button-2" to={'/'} as={Link}>Volver a la Home</Button>
            </Container>

        </div>
    )
}

export default CinemasPage