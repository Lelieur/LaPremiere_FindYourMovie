import { Card, Button, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"

const MovieCard = ({ id, title, country, duration, language, calification, poster }) => {


    return (
        <div className="MovieCard">
            <Link to={`detalles/${id}`}>

                <Card className="border-dark" style={{ width: '18rem' }} >
                    <Card.Img
                        a
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
                    </Card.Body>
                </Card>
            </Link>
        </div>
    )
}
export default MovieCard