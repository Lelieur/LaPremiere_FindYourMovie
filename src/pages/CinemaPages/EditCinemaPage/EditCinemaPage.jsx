import EditCinemaForm from "../../../components/EditCinemaForm/EditCinemaForm"
import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../../contexts/auth.context"


const EditCinemaPage = () => {

    const { loggedUser } = useContext(AuthContext)

    if (!loggedUser) {
        return <Navigate to="/cines" />
    }

    return (
        <div className="EditCinemaPage">

            <EditCinemaForm />

        </div>
    )
}
export default EditCinemaPage