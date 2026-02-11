import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
    return (
        <Link to={`/movie/${movie.imdbId}`} className="movie-card-link">
            <div className="movie-card">
                <div className="movie-poster">
                    <img src={movie.poster} alt={movie.title} />
                    <div className="movie-overlay">
                        <button className="play-btn">▶ View Details</button>
                    </div>
                </div>
                <div className="movie-info">
                    <h3 className="movie-title">{movie.title}</h3>
                    <p className="movie-date">{movie.releaseDate}</p>
                    <div className="movie-genres">
                        {movie.genres?.slice(0, 2).map((genre, idx) => (
                            <span key={idx} className="genre-tag">{genre}</span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
