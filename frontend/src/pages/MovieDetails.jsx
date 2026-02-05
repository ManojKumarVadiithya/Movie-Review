import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { movieApi } from '../api/movieApi';
import TrailerPlayer from '../components/TrailerPlayer';
import OTTPlatforms from '../components/OTTPlatforms';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import './MovieDetails.css';

const MovieDetails = () => {
    const { imdbId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshReviews, setRefreshReviews] = useState(0);
    const [currentBackdropIndex, setCurrentBackdropIndex] = useState(0);

    useEffect(() => {
        fetchMovie();
        // Scroll to top when component mounts or imdbId changes
        window.scrollTo(0, 0);
    }, [imdbId]);

    // Auto-rotate backdrops every 3 seconds
    useEffect(() => {
        if (!movie || !movie.backdrops || movie.backdrops.length === 0) return;

        const interval = setInterval(() => {
            setCurrentBackdropIndex(prev => (prev + 1) % movie.backdrops.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [movie]);

    const fetchMovie = async () => {
        try {
            const response = await movieApi.getMovieByImdbId(imdbId);
            setMovie(response.data);
            setCurrentBackdropIndex(0);
        } catch (error) {
            console.error('Failed to fetch movie:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleReviewSubmitted = () => {
        setRefreshReviews(prev => prev + 1);
        fetchMovie();
    };

    if (loading) {
        return <div className="loading-container">Loading movie details...</div>;
    }

    if (!movie) {
        return <div className="error-container">Movie not found</div>;
    }

    const currentBackdrop = movie.backdrops?.[currentBackdropIndex] || movie.backdrops?.[0];

    return (
        <div className="movie-details-page">
            <div className="movie-hero" style={{ backgroundImage: `url(${currentBackdrop})` }}>
                <div className="movie-hero-overlay"></div>
                <div className="movie-hero-content">
                    <img src={movie.poster} alt={movie.title} className="movie-poster-large" />
                    <div className="movie-info-main">
                        <h1>{movie.title}</h1>
                        <p className="movie-release">Release Date : {movie.releaseDate}</p>
                        <div className="movie-genres">
                            {movie.genres?.map((genre, idx) => (
                                <span key={idx} className="genre">{genre}</span>
                            ))}
                        </div>
                        <p className="scroll-hint">👇 Scroll down for trailer, platforms & reviews</p>
                    </div>
                </div>
            </div>

            <div className="movie-details-container">
                <div className="movie-content">
                    {/* Trailer Section */}
                    <section className="info-section trailer-section">
                        <div className="section-header">
                            <h2>🎬 Watch Trailer</h2>
                            <span className="section-badge">Video</span>
                        </div>
                        <div className="section-content">
                            <TrailerPlayer trailerLink={movie.trailerLink} movieTitle={movie.title} />
                        </div>
                    </section>

                    {/* Platforms Section */}
                    <section className="info-section platforms-section">
                        <div className="section-header">
                            <h2>📺 Where to Watch</h2>
                            <span className="section-badge">Streaming</span>
                        </div>
                        <div className="section-content">
                            <OTTPlatforms platforms={movie.ottPlatforms} />
                        </div>
                    </section>

                    {/* Reviews Section - Show First */}
                    <section className="info-section reviews-section">
                        <div className="section-header">
                            <h2>⭐ Reviews & Ratings</h2>
                            <span className="section-badge">{movie.reviewIds?.length || 0} Reviews</span>
                        </div>
                        <div className="section-content scrollable-content">
                            <ReviewList
                                movieImdbId={movie.imdbId}
                                refreshTrigger={refreshReviews}
                            />
                        </div>
                    </section>

                    {/* Add Review Section */}
                    <section className="info-section add-review-section">
                        <div className="section-header">
                            <h2>✍️ Share Your Review</h2>
                            <span className="section-badge">New</span>
                        </div>
                        <div className="section-content">
                            <ReviewForm
                                movieImdbId={movie.imdbId}
                                onReviewSubmitted={handleReviewSubmitted}
                            />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
