import { useState, useEffect, useRef } from "react";
import { useParams, NavLink, Outlet, useLocation } from "react-router-dom";
import { getMovieDetails } from "../../service/api";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || "/movies");

  useEffect(() => {
    getMovieDetails(movieId).then(setMovie).catch(console.error);
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "";
  const userScore = movie.vote_average
    ? Math.round(movie.vote_average * 10)
    : 0;

  return (
    <div className={css.container}>
      <NavLink className={css.back} to={backLinkRef.current}>
        Go Back
      </NavLink>
      <div className={css.grid}>
        <img
          className={css.poster}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://placehold.co/220x330?text=No+Poster"
          }
          alt={movie.title}
        />
        <div className={css.info}>
          <h1 className={css.title}>
            {movie.title} ({releaseYear})
          </h1>
          <p className={css.score}>User Score: {userScore}%</p>
          <h2 className={css.overviewHeading}>Overview</h2>
          <p className={css.overview}>{movie.overview}</p>
          <h2 className={css.genresHeading}>Genres</h2>
          {movie.genres && movie.genres.length > 0 && (
            <p className={css.genresList}>
              {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
          )}
        </div>
      </div>
      <div className={css.additionalInfo}>
        <h3 className={css.additionalInfoHeading}>Additional information</h3>
        <nav className={css.subnav}>
          <NavLink
            className={({ isActive }) => (isActive ? css.active : "")}
            to="cast"
            state={{ from: backLinkRef.current }}
          >
            Cast
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? css.active : "")}
            to="reviews"
            state={{ from: backLinkRef.current }}
          >
            Reviews
          </NavLink>
        </nav>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
