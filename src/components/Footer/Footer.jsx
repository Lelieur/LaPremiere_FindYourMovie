import { Row, Col, Button, Card } from 'react-bootstrap';

import "./Footer.css"

const Footer = ({ currentFamilyPath }) => {

    if (currentFamilyPath) {
        return (
            <div className="Footer text-center text-white p-5 mt-5">
                <Row>
                    <h2 className="text-white">LA PREMIERE</h2>
                </Row>
                <Row>
                    <p>Copyright © 2024 La Premiere | Built by Aaron & Lucas.</p>
                </Row>
                <Row>
                    <Col md={{ span: 4 }}>
                        <Button className="bg-transparent border-0 text-white" variant="light" as="a" href="#">Aviso Legal</Button>
                    </Col>
                    <Col md={{ span: 4 }}>
                        <Button className="bg-transparent border-0 text-white" variant="light">Política de Privacidad</Button>
                    </Col>
                    <Col md={{ span: 4 }}>
                        <Button className="bg-transparent border-0 text-white" variant="light">Política de Cookies</Button>
                    </Col>
                </Row>

            </div>
        )
    }
}

export default Footer