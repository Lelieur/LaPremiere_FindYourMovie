import EditMovieForm from "../../../components/EditMovieForm/EditMovieForm"
import { Container } from "react-bootstrap"
const EditMoviePage = () => {
    return (
        <div className="EditMoviePage">
            <Container className="mt-5">
                <EditMovieForm />
            </Container>

        </div>
    )
}
export default EditMoviePage