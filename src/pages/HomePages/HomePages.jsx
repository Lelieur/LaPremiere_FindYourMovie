import { Link } from "react-router-dom"

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';

import "./HomePage.css"
import { Col, Row } from "react-bootstrap";



const HomePage = () => {
    return (
        <div className="HomePage">

            <Container>

                <Row>

                    <Col lg={{ span: 4, offset: 4 }}>


                        <Card style={{ textAlign: "center", boxShadow: '0px 0px 100px #ccc' }}>
                            <Card.Body>
                                <Card.Title className="p-4">LE PREMIERE</Card.Title>
                                <Card.Text className="p-2">
                                    Encuentra tu película favorita, en tu cine favorito
                                </Card.Text>
                                <ButtonGroup className="p-2" aria-label="Basic example">
                                    <Button to={"/cines"} variant="secondary" as={Link}>Cines</Button>
                                    <Button to={"/peliculas"} variant="secondary" as={Link}>Películas</Button>
                                </ButtonGroup>
                            </Card.Body>
                        </Card>

                    </Col>

                </Row>

            </Container>
        </div>
    )
}

export default HomePage