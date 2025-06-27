const axios = require('axios');

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const getPosterUrl = (path) => `https://image.tmdb.org/t/p/w500${path}`;
const getBackdropUrl = (path) => `https://image.tmdb.org/t/p/original${path}`;

const fetchFromTMDB = async (endpoint, params = '') => {
  const url = `${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&${params}`;
  const response = await axios.get(url);
  return response.data;
};

exports.getAllMovies = async (req, res) => {
  try {
    const [trending, popular, newReleases] = await Promise.all([
      fetchFromTMDB('/trending/movie/week'),
      fetchFromTMDB('/movie/popular'),
      fetchFromTMDB('/movie/now_playing'),
    ]);

    const categories = {
      trending: trending.results.map(movie => ({
        ...movie,
        poster_path: getPosterUrl(movie.poster_path),
        backdrop_path: getBackdropUrl(movie.backdrop_path),
      })),
      popular: popular.results.map(movie => ({
        ...movie,
        poster_path: getPosterUrl(movie.poster_path),
        backdrop_path: getBackdropUrl(movie.backdrop_path),
      })),
      newReleases: newReleases.results.map(movie => ({
        ...movie,
        poster_path: getPosterUrl(movie.poster_path),
        backdrop_path: getBackdropUrl(movie.backdrop_path),
      })),
    };

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movies from TMDB', error });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const [movieDetails, credits, videos] = await Promise.all([
      fetchFromTMDB(`/movie/${id}`),
      fetchFromTMDB(`/movie/${id}/credits`),
      fetchFromTMDB(`/movie/${id}/videos`),
    ]);

    const movie = {
      ...movieDetails,
      poster_path: getPosterUrl(movieDetails.poster_path),
      backdrop_path: getBackdropUrl(movieDetails.backdrop_path),
      credits,
      videos: videos.results,
    };

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movie details from TMDB', error });
  }
};

exports.searchMovies = async (req, res) => {
  try {
    const { query } = req.query;
    const searchResults = await fetchFromTMDB('/search/movie', `query=${query}`);

    const movies = searchResults.results.map(movie => ({
      ...movie,
      poster_path: getPosterUrl(movie.poster_path),
      backdrop_path: getBackdropUrl(movie.backdrop_path),
    }));

    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error searching movies on TMDB', error });
  }
};

exports.discoverMovies = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const discoverResults = await fetchFromTMDB('/discover/movie', `page=${page}`);

    const movies = discoverResults.results.map(movie => ({
      ...movie,
      poster_path: getPosterUrl(movie.poster_path),
      backdrop_path: getBackdropUrl(movie.backdrop_path),
    }));

    res.json({
      page: discoverResults.page,
      results: movies,
      total_pages: discoverResults.total_pages,
      total_results: discoverResults.total_results,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error discovering movies on TMDB', error });
  }
};
