import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './MovieList.css';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {
  return (
    <div className="movie-list">
      <h2 className="movie-list-title">{title}</h2>
      <Swiper
        spaceBetween={10}
        slidesPerView={'auto'}
        className="movie-list-slider"
      >
        {movies.map(movie => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
