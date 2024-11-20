import { useContext } from "react"
import NewCinemaForm from "../../../components/NewCinemaForm/NewCinemaForm"
import { AuthContext } from "../../../contexts/auth.context"
import { Navigate } from "react-router-dom"

const NewCinemaPage = () => {

    const { loggedUser } = useContext(AuthContext)

    if (!loggedUser) {
        return <Navigate to="/cines" />
    }

    return (
        <div className="NewCinemaPage">

            < NewCinemaForm />

        </div>
    )
}

export default NewCinemaPage