import { Link } from "react-router-dom"
import { Button, Container, Row, Col } from "react-bootstrap"
import MoviesList from "../../../components/MoviesList/MoviesList"

const FilmsPage = () => {
    return (
        <div className="FilmsPage">

            <Container className="text-center">
                <Row className="mt-5">
                    <Col>
                        <Col>
                            <h2 className="section-title">Encuentra tu peli</h2>
                            <hr />
                        </Col>
                    </Col>
                </Row>
                <Row>
                    <MoviesList />
                </Row>
                <Button className="styled-button-2" variant="dark" as={Link} to={'/'}>Volver a la Home</Button>

            </Container>

        </div>
    )
}
export default FilmsPage