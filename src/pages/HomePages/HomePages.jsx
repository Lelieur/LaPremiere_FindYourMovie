import { Link } from "react-router-dom"

const HomePage = () => {
    return (
        <div className="HomePage">
            <h1>Busca tu cine</h1>
            <hr />
            <Link to={'/cines'}>Cines Madrid</Link>
            <Link to={'/peliculas'}>Peliculas</Link>
        </div>
    )
}

export default HomePage