import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchMovies } from '../services/movieService';
import MovieCard from './MovieCard';
import './SearchResult.css';

const SearchResult = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    if (query) {
      searchMovies(query).then(setMovies);
    }
  }, [query]);

  return (
    <div className="search-result-container">
      <h2>Search Results for "{query}"</h2>
      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
