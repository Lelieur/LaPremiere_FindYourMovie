import * as IMAGE_PATHS from '../../consts/image-paths'

import { Link } from "react-router-dom"

import { Card, Row, Col, Image } from 'react-bootstrap/';


import "./CinemaCard.css"

const CinemaCard = ({ id, cover, name, address, specs, url }) => {

    const { street, city, zipcode, country } = address
    const { is3D, VO, accesibility } = specs

    return (
        <div className="CinemaCard">

            <Link to={`detalles/${id}`}>

                <Card className="card pb-2">
                    <Card.Img variant="top" src={cover[0]} style={{ height: "15rem", objectFit: "cover" }} />
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>
                            📍 {country} | {city} | {street}, {zipcode}
                        </Card.Text>
                        <Row className="justify-content-center">
                            <Col md={{ span: 6 }}>
                                <Row>
                                    {is3D && (
                                        <Col>
                                            <Image src={IMAGE_PATHS.is3DFavicon} className="h-100" style={{ objectFit: "contain", maxHeight: "30px" }} fluid />
                                        </Col>
                                    )}
                                    {VO && (
                                        <Col>
                                            <Image src={IMAGE_PATHS.specsFavicon} className="h-100" style={{ objectFit: "contain", maxHeight: "30px" }} fluid />
                                        </Col>
                                    )}
                                    {accesibility && (
                                        <Col>
                                            <Image src={IMAGE_PATHS.accesibilityFavicon} className="h-100" style={{ objectFit: "contain", maxHeight: "30px" }} fluid />
                                        </Col>
                                    )}
                                </Row>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

            </Link>


        </div >
    )
}

export default CinemaCard