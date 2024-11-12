import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import MoviesList from "../../../components/MoviesList/MoviesList"

const FilmsPage = () => {
    return (
        <div className="FilmsPage">
            <h1>Peliculas</h1>
            <hr />
            <MoviesList />
            <hr />
            <Button variant="dark" as={Link} to={'/'}>Volver a la Home</Button>
        </div>
    )
}
export default FilmsPage