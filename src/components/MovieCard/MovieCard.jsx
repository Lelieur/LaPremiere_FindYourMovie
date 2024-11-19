import { Card, Row, Col, Button, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"

const MovieCard = ({ id, title, country, duration, language, calification, poster }) => {


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
                                <strong>Country:</strong>
                            </Col>
                            <Col >
                                {country}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <strong>Language:</strong>
                            </Col>
                            <Col>
                                {language}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <strong>Duration:</strong>
                            </Col>
                            <Col>
                                {duration} min
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <strong>Calification:</strong>
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