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

<<<<<<< HEAD
                <Card style={{ width: '18rem', textAlign: "center", boxShadow: '0px 0px 100px #ccc' }}>
                    <Card.Body>
                        <Card.Title className="p-4">LE PREMIERE</Card.Title>
                        <Card.Text className="p-2">
                            Encuentra tu película favorita, en tu cine favorito.
                        </Card.Text>
                        <Card.Text>
                            Buscar por:
                        </Card.Text>.
                        <ButtonGroup className="p-2" aria-label="Basic example">
                            <Button to={"/cines"} variant="secondary" as={Link}>Cine</Button>
                            <Button to={"/peliculas"} variant="secondary" as={Link}>Película</Button>
                        </ButtonGroup>
                    </Card.Body>
                </Card>
=======
            <Container>
>>>>>>> 13386b38642e6b4d1d31fe5d405ea91408b04e6c

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