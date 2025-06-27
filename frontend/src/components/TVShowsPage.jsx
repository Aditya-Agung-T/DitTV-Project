import React, { useState, useEffect } from 'react';
import { discoverTVShows, getTVGenres } from '../services/tvService';
import MovieCard from './MovieCard';
import './TVShowsPage.css';

const TVShowsPage = () => {
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    getTVGenres().then(setGenres);
    fetchTVShows(1, selectedGenre);
  }, [selectedGenre]);

  const fetchTVShows = (pageNum, genre) => {
    discoverTVShows(pageNum, genre).then(data => {
      setShows(prevShows => pageNum === 1 ? data.results : [...prevShows, ...data.results]);
      setHasMore(data.page < data.total_pages);
    });
  };

  const handleGenreChange = (e) => {
    const newGenre = e.target.value;
    setSelectedGenre(newGenre);
    setPage(1);
    setShows([]);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchTVShows(nextPage, selectedGenre);
  };

  return (
    <div className="tv-shows-page-container">
        <h1 className="tv-shows-page-title">Discover TV Shows</h1>
        <div className="genre-filter">
          <select onChange={handleGenreChange} value={selectedGenre}>
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>
        </div>
      <div className="tv-shows-grid">
        {shows.map(show => (
          <MovieCard key={`${show.id}-${Math.random()}`} movie={show} type="tv" />
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

export default TVShowsPage;
