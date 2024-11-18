import { Card, Button, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"

const MovieCard = ({ id, title, country, duration, language, calification, poster }) => {


    return (
        <div className="MovieCard">

            <Card className="border-dark" style={{ width: '18rem' }} >
                <Card.Img
                    variant="top"
                    src={poster}
                    style={{ height: "400px", objectFit: "cover" }}
                    alt={`Poster of ${title.spanish || "the movie"}`}
                />
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item><strong>Country:</strong> {country}</ListGroup.Item>
                        <ListGroup.Item><strong>Language:</strong> {language}</ListGroup.Item>
                        <ListGroup.Item> <strong>Duration:</strong> {duration} min </ListGroup.Item>
                        <ListGroup.Item><strong>Calification:</strong> {calification}</ListGroup.Item>
                    </ListGroup>
                    <Button className="d-flex justify-content-center" size="sm" variant="dark" as={Link} to={`/peliculas/detalles/${id}`}>
                        Ver detalles
                    </Button>
                </Card.Body>
            </Card>

        </div>
    )
}
export default MovieCard