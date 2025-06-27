import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = ({ movie }) => {
  if (!movie) return null;

  return (
    <Link to={`/movie/${movie.id}`} className="hero-link">
      <div className="hero">
        <img className="hero-backdrop" src={movie.backdrop_path} alt={movie.title} />
        <div className="hero-content">
          <h1 className="hero-title">{movie.title}</h1>
          <p className="hero-description">{movie.overview}</p>
          <div className="hero-buttons">
            <button className="btn btn-play">Play</button>
            <button className="btn btn-more-info">More Info</button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Hero;
