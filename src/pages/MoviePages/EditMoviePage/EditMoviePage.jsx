import EditMovieForm from "../../../components/EditMovieForm/EditMovieForm"
import { Col, Row } from "react-bootstrap"
const EditMoviePage = () => {
    return (
        <div className="EditMoviePage">

            <Row>
                <Col md={{ span: 6, offset: 3 }}>

                    <EditMovieForm />

                </Col>
            </Row>
        </div>
    )
}
export default EditMoviePage