import ListGroup from 'react-bootstrap/ListGroup';

import "./Footer.css"

const Footer = () => {
    return (
        <div className="Footer">

            <hr />

            <div className="list-groups">

                <ListGroup className='individual-list-group' variant="flush">
                    <ListGroup.Item className="item">Aviso Legal</ListGroup.Item>
                    <ListGroup.Item className="item">Política de Privacidad</ListGroup.Item>
                    <ListGroup.Item className="item">Política de cookies</ListGroup.Item>
                    <ListGroup.Item className="item">Sobre Nosotros</ListGroup.Item>
                </ListGroup>

                <ListGroup className='individual-list-group' variant="flush">
                    <ListGroup.Item className="item">Administrar</ListGroup.Item>
                    <ListGroup.Item className="item">Cines</ListGroup.Item>
                    <ListGroup.Item className="item">Películas</ListGroup.Item>
                </ListGroup>

            </div>


        </div>
    )
}

export default Footer