import "./HomePage.css"
import CinemasGlobalFilter from "../../components/CinemasGlobalFilter/CinemasGlobalFilter";
import MoviesGlobalFilter from "../../components/MoviesGlobalFilter/MoviesGlobalFilter";

import { useEffect, useState } from "react";
import { Container, Button, Col, Row } from 'react-bootstrap/'

const HomePage = () => {

    const [filterSelected, setFilterSelected] = useState("")

    const handleFilterSelected = filter => {
        console.log(filter)
        setFilterSelected(filter)
    }

<<<<<<< HEAD
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

=======
>>>>>>> lucas
    return (
        <div className="HomePage text-white">

            <Container className="d-flex justify-content-center align-items-center min-vh-100">

                <video autoPlay loop muted playsInline className="video-content">
                    <source src="https://res.cloudinary.com/dhluctrie/video/upload/v1732182659/background-video_cudoag.mp4" type="video/mp4" />
                    Tu navegador no soporta videos.
                </video>

                <div className="w-70 text-center" style={{ zIndex: 100 }}>
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

<<<<<<< HEAD
            {/* <div className="d-none position-sticky top-0">
                <span
                    onClick={handleMute}
                    style={{ fontSize: "2rem", cursor: "pointer" }}>
                    {isMuted ? <MdVolumeOff /> : <MdVolumeUp />}
                </span>
            </div> */}

=======
>>>>>>> lucas
        </div >
    )
}

export default HomePage