import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../service/api";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(movieId).then(setReviews).catch(console.error);
  }, [movieId]);

  if (!reviews.length)
    return <p className={css.noReviews}>No reviews available.</p>;

  return (
    <ul className={css.list}>
      {reviews.map((review) => (
        <li key={review.id} className={css.item}>
          <b className={css.author}>{review.author}</b>
          <p className={css.content}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
