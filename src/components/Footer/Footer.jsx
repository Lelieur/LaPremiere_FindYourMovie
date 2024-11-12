import ListGroup from 'react-bootstrap/ListGroup';

import { Link } from 'react-router-dom';

import "./Footer.css"

const Footer = () => {
    return (
        <div className="Footer">

            <hr />

            <div className="list-groups">

                <ListGroup className='individual-list-group' variant="flush">
                    <ListGroup.Item className="item" to="#" as={Link}>Aviso Legal</ListGroup.Item>
                    <ListGroup.Item className="item" to="#" as={Link}>Política de Privacidad</ListGroup.Item>
                    <ListGroup.Item className="item" to="#" as={Link}>Política de cookies</ListGroup.Item>
                    <ListGroup.Item className="item" to="#" as={Link}>Sobre Nosotros</ListGroup.Item>
                </ListGroup>

                <ListGroup className='individual-list-group' variant="flush">
                    <ListGroup.Item className="item" to="#" as={Link}>Administrar</ListGroup.Item>
                    <ListGroup.Item className="item" to="/cines" as={Link}>Cines</ListGroup.Item>
                    <ListGroup.Item className="item" to="/peliculas" as={Link}>Películas</ListGroup.Item>
                </ListGroup>

            </div>


        </div>
    )
}

export default Footer