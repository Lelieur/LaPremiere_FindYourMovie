import { Link } from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

import CinemasList from "../../../components/CinemasList/CinemasList"
import Navigation from "../../../components/Navigation/Navigation"
import Footer from "../../../components/Footer/Footer"
import "./CinemasPage.css"

const CinemasPage = () => {
    return (
        <div className="CinemasPage">

            <Navigation />

            <Container className="cinemas-page">
                <h1>ENCUENTRA TU CINE</h1>
                <hr />
                <CinemasList />
                <Button className="return-button" to={'/'} as={Link}>Volver a la Home</Button>
            </Container>

            <Footer />

        </div>
    )
}

export default CinemasPage