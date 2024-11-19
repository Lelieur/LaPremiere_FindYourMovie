import "./HomePage.css"
import CinemasGlobalFilter from "../../components/CinemasGlobalFilter/CinemasGlobalFilter";
import MoviesGlobalFilter from "../../components/MoviesGlobalFilter/MoviesGlobalFilter";

import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { Container, Button, Col, Row } from 'react-bootstrap/'

import { MdVolumeOff, MdVolumeUp } from "react-icons/md"
import Century from '../../assets/music/Century.mp3'

const HomePage = () => {

    const [audio, setAudio] = useState()
    const [isMuted, setIsMuted] = useState(true)
    const [filterSelected, setFilterSelected] = useState("")

    const handleFilterSelected = filter => {
        console.log(filter)
        setFilterSelected(filter)
    }

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

            <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="w-50 text-center">
                    <h1>LA PREMIERE</h1>
                    <p>Encuentra tu película favorita, en tu cine favorito</p>
                    <Row>
                        <Col>
                            <CinemasGlobalFilter filterSelected={filterSelected} handleFilterSelected={handleFilterSelected} />
                        </Col>
                        <Col>
                            <MoviesGlobalFilter filterSelected={filterSelected} handleFilterSelected={handleFilterSelected} />
                        </Col>
                    </Row>
                </div>

            </Container>

            <div className="position-absolute">
                <span
                    onClick={handleMute}
                    style={{ fontSize: "2rem", cursor: "pointer" }}>
                    {isMuted ? <MdVolumeOff /> : <MdVolumeUp />}
                </span>
            </div>

        </div >
    )
}

export default HomePage