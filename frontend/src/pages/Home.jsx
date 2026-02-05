import React, { useState, useEffect } from 'react';
import { movieApi } from '../api/movieApi';
import MovieCard from '../components/MovieCard';
import './Home.css';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await movieApi.getAllMovies();
            setMovies(response.data);
        } catch (error) {
            console.error('Failed to fetch movies:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-page">
            <div className="hero-section">
                <h1>Discover & Review Movies</h1>
                <p>Watch trailers and share your thoughts with the community</p>
            </div>

            <div className="container">
                {loading ? (
                    <div className="loading-section">Loading movies...</div>
                ) : movies.length === 0 ? (
                    <div className="no-movies">
                        <p>No movies available. Please check back later.</p>
                    </div>
                ) : (
                    <>
                        <h2 className="section-title">Featured Movies</h2>
                        <div className="movies-grid">
                            {movies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
