import { Routes, Route } from "react-router-dom";
import CinemasPage from "../pages/Cinemas/CinemasPage/CinemasPage";
import HomePage from "../pages/HomePages/HomePages";
import CinemaDetailsPage from "../pages/Cinemas/CinemaDetailsPage/CinemaDetailsPage";
import NewCinemaPage from "../pages/Cinemas/NewCinemaPage/NewCinemaPage";
import EditCinemaPage from "../pages/Cinemas/EditCinemaPage/EditCinemaPage";
import FilmsPage from "../pages/Films/FilmsPage/FilmsPage";
import FilmDetailPage from "../pages/Films/FilmDetailsPage/FilmDetailsPage";
import NewFilmPage from "../pages/Films/NewFilmPage/NewFilmPage";
import EditFilmPage from "../pages/Films/EditFilmPage/EditFilmPage"


const AppRoutes = () => {
    return (
        <div className="AppRoutes">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cines" element={<CinemasPage />} />
                <Route path="/cines/detalles/:cinemaId" element={<CinemaDetailsPage />} />
                <Route path="/cines/crear" element={<NewCinemaPage />} />
                <Route path="/cines/editar/:cinemaId" element={<EditCinemaPage />} />
                <Route path="/peliculas" element={<FilmsPage />} />
                <Route path="/peliculas/detalles/:movieId" element={<FilmDetailPage />} />
                <Route path="/peliculas/crear" element={<NewFilmPage />} />
                <Route path="/peliculas/editar/:movieId" element={<EditFilmPage />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>

        </div>
    )
}

export default AppRoutes