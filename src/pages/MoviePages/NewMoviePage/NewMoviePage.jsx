import { Col, Row } from "react-bootstrap"
import NewMovieForm from "../../../components/NewMovieForm/NewMovieForm"

import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../../contexts/auth.context"

const NewMoviePage = () => {

    const { loggedUser } = useContext(AuthContext)

    if (!loggedUser) {
        return <Navigate to="/peliculas" />
    }

    return (
        <div className="NewMoviePage">

            <Row>
                <Col md={{ span: 6, offset: 3 }}>

                    <NewMovieForm />

                </Col>
            </Row>

        </div>
    )
}
export default NewMoviePage