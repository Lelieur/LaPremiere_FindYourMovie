import { Link } from "react-router-dom"
import { Container, Button, Row, Col } from 'react-bootstrap'

import CinemasGlobalFilter from "../../../components/CinemasGlobalFilter/CinemasGlobalFilter"
import CinemasList from "../../../components/CinemasList/CinemasList"

import "./CinemasPage.css"

const CinemasPage = () => {
    return (
        <div className="CinemasPage">

            <Container className="cinemas-page">
                <Row className="d-flex align-items-center">
                    <Col md={{ span: 3 }}>
                        <h1>Encuentra tu cine</h1>
                    </Col>
                    <Col md={{ span: 3 }}>
                        <CinemasGlobalFilter />
                    </Col>
                </Row>
                <hr />
                <CinemasList />
                <Button className="return-button" to={'/'} as={Link}>Volver a la Home</Button>
            </Container>

        </div>
    )
}

export default CinemasPage