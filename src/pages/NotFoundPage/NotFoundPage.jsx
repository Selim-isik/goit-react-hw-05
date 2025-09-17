import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.container}>
      <h1>404 - Page not found</h1>
      <Link to="/">Go back Home</Link>
    </div>
  );
};

export default NotFoundPage;
