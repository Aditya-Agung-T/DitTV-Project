const API_URL = '/api';

export const getMovies = async () => {
  const response = await fetch(`${API_URL}/movies`);
  const data = await response.json();
  return data;
};

export const getMovieById = async (id) => {
  const response = await fetch(`${API_URL}/movies/${id}`);
  const data = await response.json();
  return data;
};

export const searchMovies = async (query) => {
  const response = await fetch(`${API_URL}/movies/search?query=${query}`);
  const data = await response.json();
  return data;
};

export const discoverMovies = async (page = 1) => {
  const response = await fetch(`${API_URL}/movies/discover?page=${page}`);
  const data = await response.json();
  return data;
};
