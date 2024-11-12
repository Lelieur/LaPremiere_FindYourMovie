import { Card, Button, ListGroup, Image } from "react-bootstrap"
import { Link } from "react-router-dom"

const MovieCard = ({ id, title, country, duration, language, calification, poster }) => {


    return (
        <div className="MovieCard">

            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={poster} />
                <Card.Body>
                    <Card.Title>
                        <h1>{title?.original || title || "Sin título"}</h1>
                    </Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item><strong>Country:</strong> {country}</ListGroup.Item>
                        <ListGroup.Item><strong>Language:</strong> {language}</ListGroup.Item>
                        <ListGroup.Item> <strong>Duration:</strong> {duration} min </ListGroup.Item>
                        <ListGroup.Item><strong>Calification:</strong> {calification}</ListGroup.Item>
                    </ListGroup>
                    <Button variant="secondary" as={Link} to={`/peliculas/detalles/${id}`}>
                        Ver detalles
                    </Button>
                </Card.Body>
            </Card>

        </div>
    )
}
export default MovieCard