import { Link } from "react-router-dom"

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';

import "./CinemaCard.css"

const CinemaCard = ({ id, cover, name, address, specs, url }) => {

<<<<<<< HEAD
    const cld = new Cloudinary({ cloud: { cloudName: 'dhluctrie' } });
    const icon3D = cld.image('3D');
    const iconVO = cld.image('VO');
    const iconAccesibility = cld.image('accesibility');


    console.log(cld.image('3D'))

=======
>>>>>>> 13386b38642e6b4d1d31fe5d405ea91408b04e6c
    const { street, city, zipcode, country } = address
    const { is3D, VO, accesibility } = specs

    return (
        <div className="CinemaCard">

            <Link to={`detalles/${id}`}>

                <Card className="mb-5 pb-2">
                    <Card.Img variant="top" src={cover[0]} style={{ height: "10rem", objectFit: "cover" }} />
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>
                            📍 {country} | {city} | {street}, {zipcode}
                        </Card.Text>
                        <Stack className="dflex justify-content-center mb-4" direction="horizontal" gap={3}>
                            <Badge pill bg="primary">Primary</Badge>
                            <Badge pill bg="secondary">Secondary</Badge>
                            <Badge pill bg="success">Success</Badge>
                        </Stack>
                        <Button variant="primary">Ver películas en cartelera</Button>
                    </Card.Body>
                </Card>

            </Link>


        </div>
    )
}

export default CinemaCard