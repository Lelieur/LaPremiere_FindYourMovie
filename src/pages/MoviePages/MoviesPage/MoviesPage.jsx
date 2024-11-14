import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import MoviesList from "../../../components/MoviesList/MoviesList"

const FilmsPage = () => {
    return (
        <div className="FilmsPage">

            <MoviesList />

            <hr />

            <div className="d-flex justify-content-center">
                <Button variant="dark" as={Link} to={'/'}>Volver a la Home</Button>
            </div>
        </div>
    )
}
export default FilmsPage