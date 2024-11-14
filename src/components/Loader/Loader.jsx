import { Spinner } from "react-bootstrap"

const Loader = () => {
    return (
        <div className="Loader">
            <Spinner animation="border" role="status">
                <span className="visual-hidden"></span>
            </Spinner>
        </div>
    )
}

export default Loader