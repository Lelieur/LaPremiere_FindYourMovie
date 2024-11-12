import Container from 'react-bootstrap/Container'

import Navigation from "../../../components/Navigation/Navigation"
import Footer from "../../../components/Footer/Footer"

const CinemaDetailsPage = () => {
    return (
        <div className="CinemaDetailsPage">

            <Navigation />

            <Container className="d-flex justify-content-center align-items-center">

                <h1>Detalles del cine</h1>
                <hr />

            </Container>


            <Footer />

        </div>
    )
}
export default CinemaDetailsPage