import { Link } from "react-router-dom"
import { Button, Container, Row, Col } from "react-bootstrap"
import MoviesList from "../../../components/MoviesList/MoviesList"
import { useState } from "react"
import FiltersMovies from "../../../components/FiltersMovies/FiltersMovies"


const MoviesPage = () => {

    const [filterData, setFilterData] = useState()


    const handleFilterData = (filter) => {

        setFilterData(filter)
    }
    return (
        <div className="MoviesPage">

            <Container className="text-center">
                <Row className="mt-5">
                    <Col>
                        <Col>
                            <h3 className="section-title">ENCUENTRA TU PELÍCULA</h3>
                            <hr />
                            <FiltersMovies handleFilterData={handleFilterData} />
                        </Col>
                    </Col>
                </Row>
                <Row>
                    <MoviesList filterData={filterData} />
                </Row>
                <Button className="styled-button-2" variant="dark" as={Link} to={'/'}>Volver a la Home</Button>

            </Container>

        </div>
    )
}
export default MoviesPage