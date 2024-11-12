import axios from "axios"
import { useState, useEffect } from "react"

import CinemaCard from "../CinemaCard/CinemaCard"
import "./CinemasList.css"

const API_URL = "http://localhost:5005"



const CinemasList = () => {


    const [cinemas, setCinemas] = useState([])

    useEffect(() => {
        fetchCinemas()
    }, [])

    const fetchCinemas = () => {
        axios
            .get(`${API_URL}/cinemas`)
            .then(response => setCinemas(response.data))
            .catch(err => console.log(err))
    }

    return (
        <div className="CinemaList">

            {
                cinemas.map(elm => {
                    return (
                        <CinemaCard {...elm} key={elm.id} />
                    )
                })
            }

        </div>
    )
}

export default CinemasList