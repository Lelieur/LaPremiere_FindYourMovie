import { Link } from "react-router-dom"
const FilmsPage = () => {
    return (
        <div className="FilmsPage">
            <h1>Peliculas</h1>
            <hr />
            <Link to={'/'}>Volver a la Home</Link>
        </div>
    )
}
export default FilmsPage