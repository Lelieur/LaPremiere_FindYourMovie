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

                <Card className="mb-5 pb-2">
                    <Card.Img variant="top" src={cover[0]} style={{ height: "15rem", objectFit: "cover" }} />
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>
                            📍 {country} | {city} | {street}, {zipcode}
                        </Card.Text>
                        <Row>
                            {is3D && (
                                <Col md={{ span: 2 }}>
                                    <Image src={IMAGE_PATHS.is3DFavicon} fluid />
                                </Col>
                            )}
                            {VO && (
                                <Col md={{ span: 2 }}>
                                    <Image src={IMAGE_PATHS.specsFavicon} fluid />
                                </Col>
                            )}
                            {accesibility && (
                                <Col md={{ span: 2 }}>
                                    <Image src={IMAGE_PATHS.accesibilityFavicon} fluid />
                                </Col>
                            )}
                        </Row>
                    </Card.Body>
                </Card>

            </Link>


        </div>
    )
}

export default CinemaCard