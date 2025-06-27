import React, { useState, useEffect } from 'react';
import { discoverMovies } from '../services/movieService';
import MovieCard from './MovieCard';
import './MoviesPage.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchMovies(page);
  }, []);

  const fetchMovies = (pageNum) => {
    discoverMovies(pageNum).then(data => {
      setMovies(prevMovies => [...prevMovies, ...data.results]);
      setHasMore(data.page < data.total_pages);
    });
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage);
  };

  return (
    <div className="movies-page-container">
      <h1 className="movies-page-title">Discover Movies</h1>
      <div className="movies-grid">
        {movies.map(movie => (
          <MovieCard key={`${movie.id}-${Math.random()}`} movie={movie} />
        ))}
      </div>
      {hasMore && (
        <button onClick={loadMore} className="load-more-btn">
          Load More
        </button>
      )}
    </div>
  );
};

export default MoviesPage;
