import { Form, Button } from "react-bootstrap"
import { useContext, useState } from "react"

import { AuthContext } from "../../contexts/auth.context"


const LoginForm = ({ setShowModal }) => {

    const { setLoggedUser } = useContext(AuthContext)

    const [loginData, setLoginData] = useState({
        user: '',
        password: ''
    })

    const handleInputChange = e => {
        const { value, name } = e.target
        setLoginData({ ...loginData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        const { user, password } = loginData

        if (user === "admin" && password === 'admin') {
            setLoggedUser(true)
            setShowModal(false)
        } else {
            alert('Datos de inicio de sesión incorrectos')
        }
    }

    return (
        <div className="LoginForm">
            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="user">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" value={loginData.user} onChange={handleInputChange} name="user" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" value={loginData.password} onChange={handleInputChange} name="password" />
                </Form.Group>

                <div className="d-grid">
                    <Button variant="dark" type="submit">Acceder</Button>
                </div>

            </Form>
        </div>
    )
}

export default LoginForm