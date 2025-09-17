import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzZhNDU3N2M0MDNjOWQ0Y2ZmYjVkZTNjY2NlZDA5ZiIsIm5iZiI6MTc1ODExNjUxMy44OTc5OTk4LCJzdWIiOiI2OGNhYmFhMTNlNmY3MmE2YjFlNGZjMjAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZTkzsVGPXEKrl3ViFW4XoqCjSatTTmpVb07d70pyaRo";
const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

export const getTrendingMovies = async () => {
  const res = await axios.get(`${BASE_URL}/trending/movie/day?language=en-US`, {
    headers,
  });
  return res.data.results;
};

export const searchMovies = async (query) => {
  const res = await axios.get(`${BASE_URL}/search/movie`, {
    headers,
    params: { query, language: "en-US", page: 1, include_adult: false },
  });
  return res.data.results;
};

export const getMovieDetails = async (movieId) => {
  const res = await axios.get(`${BASE_URL}/movie/${movieId}`, { headers });
  return res.data;
};

export const getMovieCast = async (movieId) => {
  const res = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
    headers,
  });
  return res.data.cast;
};

export const getMovieReviews = async (movieId) => {
  const res = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
    headers,
  });
  return res.data.results;
};
