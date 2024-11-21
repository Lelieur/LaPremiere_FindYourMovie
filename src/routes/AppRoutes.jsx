import { Routes, Route } from "react-router-dom";
import CinemasPage from "../pages/CinemaPages/CinemasPage/CinemasPage";
import HomePage from "../pages/HomePage/HomePage";
import CinemaDetailsPage from "../pages/CinemaPages/CinemaDetailsPage/CinemaDetailsPage";
import NewCinemaPage from "../pages/CinemaPages/NewCinemaPage/NewCinemaPage";
import EditCinemaPage from "../pages/CinemaPages/EditCinemaPage/EditCinemaPage";
import MoviesPage from "../pages/MoviePages/MoviesPage/MoviesPage";
import MovieDetailPage from "../pages/MoviePages/MovieDetailsPage/MovieDetailsPage";
import NewMoviePage from "../pages/MoviePages/NewMoviePage/NewMoviePage";
import EditMoviePage from "../pages/MoviePages/EditMoviePage/EditMoviePage"
import DeletedCinemasPage from "../pages/CinemaPages/DeletedCinemasPage/DeletedCinemasPage";
import DeletedMoviesPage from "../pages/MoviePages/DeletedMoviesPage/DeletedMoviesPage";
import ReviewMoviePage from "../pages/MoviePages/ReviewMoviePage/ReviewMoviePage";
import MovieStatsPage from "../pages/Stats/MovieStatsPage";

const AppRoutes = () => {

    return (
        <div className="AppRoutes">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cines" element={<CinemasPage />} />
                <Route path="/cines/detalles/:cinemaId" element={<CinemaDetailsPage key={window.location.pathname} />} />

                <Route path="/cines/crear" element={<NewCinemaPage />} />
                <Route path="/cines/editar/:cinemaId" element={<EditCinemaPage />} />
                <Route path="/cines/eliminados" element={<DeletedCinemasPage />} />

                <Route path="/peliculas" element={<MoviesPage />} />
                <Route path="/peliculas/detalles/:movieId" element={<MovieDetailPage />} />

                <Route path="/peliculas/crear" element={<NewMoviePage />} />
                <Route path="/peliculas/editar/:movieId" element={<EditMoviePage />} />
                <Route path="/peliculas/eliminados" element={<DeletedMoviesPage />} />

                <Route path="/datos" element={<MovieStatsPage />} />

                <Route path="/peliculas/reseña/:movieId" element={<ReviewMoviePage />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>

        </div>
    )
}

export default AppRoutes