import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import axios from 'axios'
import { Container, Image, Row, Col, Carousel, Stack, Badge, Button, ButtonGroup } from 'react-bootstrap'

import "./CinemaDetailsPage.css"

const API_URL = "http://localhost:5005"

const CinemaDetailsPage = () => {

    const { cinemaId } = useParams()

    const [cinema, setCinema] = useState({})
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        fetchCinemaDetails()
    }, [])

    const fetchCinemaDetails = () => {
        axios
            .get(`${API_URL}/cinemas/${cinemaId}`)
            .then(response => {
                setCinema(response.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    return (
        isLoading ? <h1>CARGANDO</h1> :
            (
                <div className="CinemaDetailsPage">

                    <Container>

                        <Row className="mt-5">
                            <Col md={{ span: 5 }}>
                                <Carousel>
                                    <Carousel.Item >
                                        <Image src={cinema.cover[0]} rounded fluid />
                                    </Carousel.Item>
                                    <Carousel.Item >
                                        <Image src={cinema.cover[1]} rounded fluid />
                                    </Carousel.Item>
                                    <Carousel.Item >
                                        <Image src={cinema.cover[2]} rounded fluid />
                                    </Carousel.Item>
                                </Carousel>
                            </Col>
                            <Col md={{ span: 7 }}>
                                <h1>{cinema.name}</h1>
                                <hr />
                                <p><span className="titulos-destacados">Dirección: </span>{cinema.address.street}, {cinema.address.zipcode} ({cinema.address.city})</p>
                                <p><span className="titulos-destacados">Precio: </span>
                                    <Stack direction="horizontal" gap={2} style={{ display: 'inline-flex' }}>
                                        <Badge bg="dark">Nomal: {cinema.price.regular}€</Badge>
                                        <Badge bg="secondary">Fin de semana: {cinema.price.weekend}€</Badge>
                                        <Badge bg="success">Miércoles: {cinema.price.special}€</Badge>
                                    </Stack>
                                </p>
                                <p><span className="titulos-destacados">Servicios: </span>
                                    <Stack direction="horizontal" gap={2} style={{ display: 'inline-flex' }}>
                                        {
                                            cinema.services.map(elm => {
                                                return (
                                                    <Badge bg="warning" key={cinema.id}>{cinema.services[cinema.services.indexOf(elm)]}</Badge>
                                                )
                                            })
                                        }
                                    </Stack>
                                </p>
                                <p><span className="titulos-destacados">Specs: </span>
                                    <Row style={{ display: 'inline-flex' }}>
                                        {cinema.specs.is3D && (
                                            <Col md={{ span: 1 }}>
                                                <Image src={"https://res.cloudinary.com/dhluctrie/image/upload/v1731410923/3D.png"} fluid />
                                            </Col>
                                        )}
                                        {cinema.specs.VO && (
                                            <Col md={{ span: 1 }}>
                                                <Image src={"https://res.cloudinary.com/dhluctrie/image/upload/v1731410923/VO.avif"} fluid />
                                            </Col>
                                        )}
                                        {cinema.specs.accesibility && (
                                            <Col md={{ span: 1 }}>
                                                <Image src={"https://res.cloudinary.com/dhluctrie/image/upload/v1731410923/accesibility.png"} fluid />
                                            </Col>
                                        )}
                                    </Row>
                                    <ButtonGroup className="mt-4" aria-label="Basic example">
                                        <Button variant="dark" as="a" href={cinema.url} target="_blank">Comprar entradas</Button>
                                        <Button variant="secondary" as={Link} to="/cines">Ver otro cine</Button>
                                    </ButtonGroup>
                                </p>
                            </Col>
                        </Row>

                    </Container>

                </div >
            )
    )
}
export default CinemaDetailsPage