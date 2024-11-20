import "./HomePage.css"
import CinemasGlobalFilter from "../../components/CinemasGlobalFilter/CinemasGlobalFilter";
import MoviesGlobalFilter from "../../components/MoviesGlobalFilter/MoviesGlobalFilter";

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

    // useEffect(() => {
    //     const audioInstance = new Audio(Century)
    //     setAudio(audioInstance)
    //     audioInstance.play().catch((error) => {
    //         console.log(error)
    //     })
    //     return () => {
    //         audioInstance.pause()
    //         audioInstance.currentTime = 0
    //     }
    // }, [])

    // const handleMute = () => {
    //     audio.muted = !isMuted
    //     setIsMuted(!isMuted)
    // }

    return (
        <div className="HomePage h-100 bg-black text-white">

            <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="w-70 text-center">
                    <h1 className="text-decoration-underline">LA PREMIERE</h1>
                    <h2>Encuentra tu peli favorita, en tu cine favorito</h2>
                    <Row className="mt-5">
                        <Row>
                            <Col>
                                <p>¿Por dónde quieres empezar?</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <CinemasGlobalFilter filterSelected={filterSelected} handleFilterSelected={handleFilterSelected} />
                            </Col>
                            <Col>
                                <MoviesGlobalFilter filterSelected={filterSelected} handleFilterSelected={handleFilterSelected} />
                            </Col>
                        </Row>
                    </Row>

                </div>


            </Container>

            {/* <div className="d-none position-sticky top-0">
                <span
                    onClick={handleMute}
                    style={{ fontSize: "2rem", cursor: "pointer" }}>
                    {isMuted ? <MdVolumeOff /> : <MdVolumeUp />}
                </span>
            </div> */}

        </div >
    )
}

export default HomePage