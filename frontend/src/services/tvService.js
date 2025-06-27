const API_URL = '/api';

export const getTVShows = async () => {
  const response = await fetch(`${API_URL}/tv`);
  const data = await response.json();
  return data;
};

export const getTVShowById = async (id) => {
  const response = await fetch(`${API_URL}/tv/${id}`);
  const data = await response.json();
  return data;
};

export const discoverTVShows = async (page = 1, genres) => {
  let url = `${API_URL}/tv/discover?page=${page}`;
  if (genres) {
    url += `&with_genres=${genres}`;
  }
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const getTVGenres = async () => {
    const response = await fetch(`${API_URL}/tv/genres`);
    const data = await response.json();
    return data;
};
