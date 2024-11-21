import { Card, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import FlagIcon from "../FlagIcon/FlagIcon"
import "../MovieCard/MovieCard.css"

const countryNameToCode = {
    "Estados Unidos": "US",
    "España": "ES",
    "Reino Unido": "GB",
    "Canada": "CA",
    "México": "MX",
    "Alemania": "DE",
    "Japón": "JP",
    "Australia": "AU",
    "Nueva Zelanda": "NZ"
}

const MovieCard = ({ id, title, country, duration, language, calification, poster }) => {

    const countryCode = countryNameToCode[country] || "ZZ"


    return (
        <div className="MovieCard">
            <Link to={`detalles/${id}`}>

                <Card className="border-dark">
                    <Card.Img
                        fluid
                        variant="top"
                        src={poster}
                        style={{ height: "25rem", objectFit: "cover" }}
                        alt={`Poster of ${title.spanish}`}
                    />
                    <Card.Body>
                        <Row>
                            <Col >
                                <strong>País:</strong>
                            </Col>
                            <Col >
                                <FlagIcon countryCode={countryCode} size="small" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <strong>Idioma:</strong>
                            </Col>
                            <Col>
                                {language}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <strong>Duración:</strong>
                            </Col>
                            <Col>
                                {duration} min
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <strong>Calificación:</strong>
                            </Col>
                            <Col>
                                {calification}
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Link>
        </div>
    )
}
export default MovieCard