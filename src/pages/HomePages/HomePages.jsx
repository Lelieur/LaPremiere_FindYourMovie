import { Link } from "react-router-dom"
import { useState } from "react";
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';

import "./HomePage.css"
import { Col, Row } from "react-bootstrap";

import phanterMusic from '../../assets/music/panther.mp3'

const HomePage = () => {

    const [isPlaying, setIsPlaying] = useState(false)
    const [audio] = useState(new Audio(phanterMusic))

    const musicPlay = () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying)
    }
    return (
        <div className="HomePage">

            <Container>

                <Row>

                    <Col lg={{ span: 4, offset: 4 }}>


                        <Card style={{ textAlign: "center", boxShadow: '0px 0px 100px #ccc' }}>
                            <Card.Body>
                                <Card.Title className="p-4">LA PREMIERE</Card.Title>
                                <Card.Text className="p-2">
                                    Encuentra tu película favorita, en tu cine favorito
                                </Card.Text>
                                <ButtonGroup className="p-2" aria-label="Basic example">
                                    <Button to={"/cines"} variant="secondary" as={Link}>Cines</Button>
                                    <Button to={"/peliculas"} variant="secondary" as={Link}>Películas</Button>
                                </ButtonGroup>

                                <div className="mt-4">
                                    <Button
                                        variant={isPlaying ? "danger" : "success"}
                                        onClick={musicPlay}>
                                        {isPlaying ? "Pausar música" : "Reproducir música"}
                                    </Button>
                                </div>

                                {/* Reproductor de audio oculto (si lo prefieres) */}
                                {/* Puedes añadir esto si quieres que el control de audio se muestre */}
                                <audio controls>
                                    <source src="/audio/miCancion.mp3" type="audio/mp3" />
                                    Tu navegador no soporta el elemento de audio.
                                </audio>
                            </Card.Body>
                        </Card>

                    </Col>

                </Row>

            </Container>
        </div>
    )
}

export default HomePage