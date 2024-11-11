import { Link } from "react-router-dom"
const CinemasPage = () => {
    return (
        <div className="CinemasPage">
            <h1>Aquí tus cines</h1>
            <hr />
            <Link to={'/'}>Volver a la Home</Link>
        </div>
    )
}

export default CinemasPage