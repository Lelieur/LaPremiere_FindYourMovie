import { Row, Col, Button, Card } from 'react-bootstrap';

import "./Footer.css"

const Footer = () => {
    return (
        <div className="Footer">

            <Card className="mt-5 rounded-0 text-center" bg="dark" text="light" border="none">
                <Card.Body className='p-4'>
                    <Card.Title>LE PREMIERE</Card.Title>
                    <Card.Text>Copyright © 2024 Le Premiere. Built by Aaron & Lucas.</Card.Text>
                </Card.Body>
                <Row className="p-3">
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
            </Card>

        </div>
    )
}

export default Footer