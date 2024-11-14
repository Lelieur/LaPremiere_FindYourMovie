import { Col, Row } from "react-bootstrap"
import NewMovieForm from "../../../components/NewMovieForm/NewMovieForm"

const NewMoviePage = () => {
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