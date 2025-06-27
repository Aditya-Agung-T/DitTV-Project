import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById } from '../services/movieService';
import './MovieDetail.css';
import LoadingSpinner from './LoadingSpinner';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    getMovieById(id).then(data => setMovie(data));
  }, [id]);

  if (!movie) return <LoadingSpinner />;

  const trailer = movie.videos.find(video => video.type === 'Trailer');

  const handlePlay = () => {
    setShowPlayer(true);
  };

  return (
    <div className="movie-detail">
      {showPlayer ? (
        <div className="video-player-container">
          <iframe
            className="video-player"
            src={`https://vidsrc.net/embed/movie?tmdb=${id}`}
            title="Movie Player"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <>
          <img className="movie-detail-backdrop" src={movie.backdrop_path} alt={movie.title} />
          <div className="movie-detail-content">
            <img className="movie-detail-poster" src={movie.poster_path} alt={movie.title} />
            <div className="movie-detail-info">
              <h1 className="movie-detail-title">{movie.title}</h1>
              <div className="movie-detail-genres">
                {movie.genres.map(genre => (
                  <span key={genre.id} className="movie-detail-genre">{genre.name}</span>
                ))}
              </div>
              <p>{movie.overview}</p>
              <button className="btn btn-play" onClick={handlePlay}>Play</button>
              <div className="movie-detail-cast">
                <h2>Cast</h2>
                <ul>
                  {movie.credits.cast.slice(0, 10).map(actor => (
                    <li key={actor.cast_id}>{actor.name} as {actor.character}</li>
                  ))}
                </ul>
              </div>
              {trailer && (
                <div className="movie-detail-trailer">
                  <h2>Trailer</h2>
                  <iframe
                    className="movie-detail-trailer-video"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
