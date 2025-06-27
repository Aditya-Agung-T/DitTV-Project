import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie, type = 'movie' }) => {
  const linkPath = type === 'tv' ? `/tv/${movie.id}` : `/movie/${movie.id}`;
  const title = type === 'tv' ? movie.name : movie.title;

  return (
    <Link to={linkPath} className="movie-card">
      <img src={movie.poster_path} alt={title} />
      <div className="movie-card-content">
        <h3 className="movie-card-title">{title}</h3>
      </div>
    </Link>
  );
};

export default MovieCard;
