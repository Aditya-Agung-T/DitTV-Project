import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTVShowById } from '../services/tvService';
import './TVShowDetail.css';
import LoadingSpinner from './LoadingSpinner';

const TVShowDetail = () => {
  const [show, setShow] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getTVShowById(id).then(setShow);
  }, [id]);

  const handlePlay = () => {
    setShowPlayer(true);
  };

  if (!show) return <LoadingSpinner />;

  const trailer = show.videos && show.videos.results ? show.videos.results.find(video => video.type === 'Trailer') : null;

  return (
    <div className="tv-show-detail">
      {showPlayer ? (
        <div className="video-player-container">
          <iframe
            className="video-player"
            src={`https://vidsrc.net/embed/tv?tmdb=${id}`}
            title="TV Show Player"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <>
          <img className="tv-show-detail-backdrop" src={show.backdrop_path} alt={show.name} />
          <div className="tv-show-detail-content">
            <img className="tv-show-detail-poster" src={show.poster_path} alt={show.name} />
            <div className="tv-show-detail-info">
              <h1 className="tv-show-detail-title">{show.name}</h1>
              <div className="tv-show-detail-genres">
                {show.genres.map(genre => (
                  <span key={genre.id} className="tv-show-detail-genre">{genre.name}</span>
                ))}
              </div>
              <p>{show.overview}</p>
              <button className="btn btn-play" onClick={handlePlay}>Play</button>
              <div className="tv-show-detail-cast">
                <h3>Cast</h3>
                <ul>
                  {show.credits.cast.slice(0, 10).map(actor => (
                    <li key={actor.id}>{actor.name} as {actor.character}</li>
                  ))}
                </ul>
              </div>
              {trailer && (
                <div className="tv-show-detail-trailer">
                  <h3>Trailer</h3>
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Trailer"
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

export default TVShowDetail;
