import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../service/api";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    getMovieCast(movieId).then(setCast).catch(console.error);
  }, [movieId]);

  if (!cast.length) return <p>No cast information available.</p>;

  return (
    <ul className={css.list}>
      {cast.map((member) => (
        <li key={member.cast_id} className={css.item}>
          <img
            className={css.avatar}
            src={
              member.profile_path
                ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                : "https://placehold.co/64x64?text=No+Photo"
            }
            alt={member.name}
          />
          <div>
            <p className={css.name}>{member.name}</p>
            <p className={css.character}>as {member.character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
