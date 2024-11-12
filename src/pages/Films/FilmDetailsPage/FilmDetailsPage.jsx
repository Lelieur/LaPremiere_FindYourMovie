import Navigation from "../../../components/Navigation/Navigation"
import Footer from "../../../components/Footer/Footer"

import FilmSelectedDetails from "../../../components/FilmSelectedDetails/FilmSelectedDetails"

const FilmDetailsPage = () => {
    return (
        <div className="FilmDetailsPage">
            <Navigation />
            <FilmSelectedDetails />
            <Footer />
        </div>
    )
}
export default FilmDetailsPage