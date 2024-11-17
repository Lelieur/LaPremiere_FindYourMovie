import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';

import "./HomePage.css"
import { Col, Row } from "react-bootstrap";
import { MdVolumeOff, MdVolumeUp } from "react-icons/md"
import Century from '../../assets/music/Century.mp3'

const HomePage = () => {

    const [audio, setAudio] = useState()
    const [isMuted, setIsMuted] = useState(false)

    useEffect(() => {
        const audioInstance = new Audio(Century)
        setAudio(audioInstance)
        audioInstance.play().catch((error) => {
            console.log(error)
        })
        return () => {
            audioInstance.pause()
            audioInstance.currentTime = 0
        }
    }, [])

    const handleMute = () => {
        audio.muted = !isMuted
        setIsMuted(!isMuted)
    }

    return (
        <div className="HomePage">

            <Container>

                <Row>

                    <Col lg={{ span: 4, offset: 4 }}>
                        <Card style={{ textAlign: "center", boxShadow: '0px 0px 100px #ccc' }}>

                            <Card.Body>
                                <Card.Title className="p-4" >LA PREMIERE</Card.Title>
                                <Card.Text className="p-2">
                                    Encuentra tu película favorita, en tu cine favorito
                                </Card.Text>
                                <ButtonGroup className="p-2" aria-label="Basic example">
                                    <Button to={"/cines"} variant="secondary" as={Link}>Cines</Button>
                                    <Button to={"/peliculas"} variant="secondary" as={Link}>Películas</Button>
                                </ButtonGroup>

                                <div className="mt-3">
                                    <span
                                        onClick={handleMute}
                                        style={{ fontSize: "2rem", cursor: "pointer" }}>
                                        {isMuted ? <MdVolumeOff /> : <MdVolumeUp />}
                                    </span>
                                </div>

                            </Card.Body>

                        </Card>

                    </Col>

                </Row>

            </Container>
        </div >
    )
}

export default HomePage