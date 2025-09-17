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
          <h1>
            {movie.title} ({new Date(movie.release_date).getFullYear()})
          </h1>
          <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h2>Genres</h2>
          {movie.genres && movie.genres.length > 0 && (
            <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
          )}
        </div>
      </div>

      <nav className={css.subnav}>
        <h4>Additional information</h4>
        <NavLink to="cast" state={{ from: backLinkRef.current }}>
          Cast
        </NavLink>
        <NavLink to="reviews" state={{ from: backLinkRef.current }}>
          Reviews
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
