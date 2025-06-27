const axios = require('axios');

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const getPosterUrl = (path) => path ? `https://image.tmdb.org/t/p/w500${path}` : null;
const getBackdropUrl = (path) => path ? `https://image.tmdb.org/t/p/original${path}` : null;

const fetchFromTMDB = async (endpoint, params = '') => {
  const url = `${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&${params}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching from TMDB: ${url}`, error);
    throw error;
  }
};

exports.getAllTVShows = async (req, res) => {
  try {
    const [trending, popular, newReleases] = await Promise.all([
      fetchFromTMDB('/trending/tv/week'),
      fetchFromTMDB('/tv/popular'),
      fetchFromTMDB('/tv/on_the_air'),
    ]);

    const processResults = (results) => results.map(show => ({
      ...show,
      poster_path: getPosterUrl(show.poster_path),
      backdrop_path: getBackdropUrl(show.backdrop_path),
    }));

    const categories = {
      trending: processResults(trending.results),
      popular: processResults(popular.results),
      newReleases: processResults(newReleases.results),
    };

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching TV shows from TMDB', error: error.message });
  }
};

exports.getTVShowById = async (req, res) => {
  try {
    const { id } = req.params;
    const [showDetails, credits, videos] = await Promise.all([
      fetchFromTMDB(`/tv/${id}`),
      fetchFromTMDB(`/tv/${id}/credits`),
      fetchFromTMDB(`/tv/${id}/videos`),
    ]);

    const show = {
      ...showDetails,
      poster_path: getPosterUrl(showDetails.poster_path),
      backdrop_path: getBackdropUrl(showDetails.backdrop_path),
      credits,
      videos: videos.results,
    };

    res.json(show);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching TV show details from TMDB', error: error.message });
  }
};

exports.discoverTVShows = async (req, res) => {
  try {
    const { page = 1, with_genres } = req.query;
    let params = `page=${page}`;
    if (with_genres) {
      params += `&with_genres=${with_genres}`;
    }
    const discoverResults = await fetchFromTMDB('/discover/tv', params);

    const shows = discoverResults.results.map(show => ({
      ...show,
      poster_path: getPosterUrl(show.poster_path),
      backdrop_path: getBackdropUrl(show.backdrop_path),
    }));

    res.json({
      page: discoverResults.page,
      results: shows,
      total_pages: discoverResults.total_pages,
      total_results: discoverResults.total_results,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error discovering TV shows on TMDB', error: error.message });
  }
};

exports.getTVGenres = async (req, res) => {
    try {
        const data = await fetchFromTMDB('/genre/tv/list');
        res.json(data.genres);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching TV genres from TMDB', error: error.message });
    }
};
