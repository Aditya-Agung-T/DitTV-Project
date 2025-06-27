import React, { useState, useEffect } from 'react';
import { getMovies } from '../services/movieService';
import { getTVShows } from '../services/tvService';
import Hero from './Hero';
import MovieCard from './MovieCard';
import './Home.css';

const Home = () => {
  const [movieCategories, setMovieCategories] = useState({});
  const [tvCategories, setTvCategories] = useState({});
  const [featuredContent, setFeaturedContent] = useState(null);

  useEffect(() => {
    getMovies().then(data => {
      setMovieCategories(data);
      if (data.trending && data.trending.length > 0) {
        setFeaturedContent(data.trending[0]);
      }
    });
    getTVShows().then(data => {
      setTvCategories(data);
    });
  }, []);

  return (
    <div className="home-container">
      <Hero movie={featuredContent} />
      {Object.keys(movieCategories).map(category => (
        <div key={category} className="category-section">
          <h2 className="category-title">{category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h2>
          <div className="movies-grid">
            {movieCategories[category].map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      ))}
      {Object.keys(tvCategories).map(category => (
        <div key={category} className="category-section">
          <h2 className="category-title">{`TV ${category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}`}</h2>
          <div className="movies-grid">
            {tvCategories[category].map(show => (
              <MovieCard key={show.id} movie={show} type="tv" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
