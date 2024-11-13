import { Routes, Route } from "react-router-dom";
import CinemasPage from "../pages/CinemaPages/CinemasPage/CinemasPage";
import HomePage from "../pages/HomePages/HomePages";
import CinemaDetailsPage from "../pages/CinemaPages/CinemaDetailsPage/CinemaDetailsPage";
import NewCinemaPage from "../pages/CinemaPages/NewCinemaPage/NewCinemaPage";
import EditCinemaPage from "../pages/CinemaPages/EditCinemaPage/EditCinemaPage";
import MoviesPage from "../pages/MoviePages/MoviesPage/MoviesPage";
import MovieDetailPage from "../pages/MoviePages/MovieDetailsPage/MovieDetailsPage";
import NewMoviePage from "../pages/MoviePages/NewMoviePage/NewMoviePage";
import EditMoviePage from "../pages/MoviePages/EditMoviePage/EditMoviePage"

const AppRoutes = () => {
    return (
        <div className="AppRoutes">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cines" element={<CinemasPage />} />
                <Route path="/cines/detalles/:cinemaId" element={<CinemaDetailsPage />} />
                <Route path="/cines/crear" element={<NewCinemaPage />} />
                <Route path="/cines/editar/:cinemaId" element={<EditCinemaPage />} />
                <Route path="/peliculas" element={<MoviesPage />} />
                <Route path="/peliculas/detalles/:movieId" element={<MovieDetailPage />} />
                <Route path="/peliculas/crear" element={<NewMoviePage />} />
                <Route path="/peliculas/editar/:movieId" element={<EditMoviePage />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>

        </div>
    )
}

export default AppRoutes