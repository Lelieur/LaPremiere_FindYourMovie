import { Link } from "react-router-dom"

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';

import "./HomePage.css"



const HomePage = () => {
    return (
        <div className="HomePage">
            <Container className="d-flex justify-content-center align-items-center">

                <Card style={{ width: '18rem', textAlign: "center", boxShadow: '0px 0px 100px #ccc' }}>
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


            </Container>
        </div>
    )
}

export default HomePage