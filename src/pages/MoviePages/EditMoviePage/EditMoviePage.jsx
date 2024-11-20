import EditMovieForm from "../../../components/EditMovieForm/EditMovieForm"
import { Container } from "react-bootstrap"

import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../../contexts/auth.context"

const EditMoviePage = () => {

    const { loggedUser } = useContext(AuthContext)

    if (!loggedUser) {
        return <Navigate to="/peliculas" />
    }

    return (
        <div className="EditMoviePage">
            <Container className="mt-5">
                <EditMovieForm />
            </Container>

        </div>
    )
}
export default EditMoviePage