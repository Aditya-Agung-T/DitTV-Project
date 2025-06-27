import { Link } from 'react-router-dom';

const MovieCard = ({ movie, type = 'movie' }) => {
  const linkPath = type === 'tv' ? `/tv/${movie.id}` : `/movie/${movie.id}`;
  const title = type === 'tv' ? movie.name : movie.title;
  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/200x300.png?text=No+Image';

  return (
    <Link to={linkPath} className="movie-card">
      <img src={posterPath} alt={title} />
      <div className="movie-info">
        <h3>{title}</h3>
        {/* Add any additional movie information you want to display */}
      </div>
    </Link>
  );
};

export default MovieCard;