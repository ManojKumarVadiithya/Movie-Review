import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { movieApi } from '../api/movieApi';
import MovieCard from '../components/MovieCard';
import './SearchResults.css';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const searchQuery = searchParams.get('q') || '';
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await movieApi.getAllMovies();
                setMovies(response.data);

                if (searchQuery.trim()) {
                    const filtered = response.data.filter(movie =>
                        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        movie.genres?.some(genre => genre.toLowerCase().includes(searchQuery.toLowerCase())) ||
                        movie.imdbId.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                    setFilteredMovies(filtered);
                } else {
                    setFilteredMovies([]);
                }
            } catch (err) {
                setError('Failed to load movies');
                console.error('Error fetching movies:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [searchQuery]);

    return (
        <div className="search-results-container">
            <div className="search-results-wrapper">
                <h1>Search Results</h1>
                <p className="search-query">
                    {searchQuery ? `Showing results for: "${searchQuery}"` : 'No search query provided'}
                </p>

                {loading ? (
                    <div className="loading">Loading movies...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : filteredMovies.length > 0 ? (
                    <>
                        <p className="results-count">Found {filteredMovies.length} movie{filteredMovies.length !== 1 ? 's' : ''}</p>
                        <div className="movies-grid">
                            {filteredMovies.map(movie => (
                                <MovieCard key={movie.imdbId} movie={movie} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="no-results">
                        <p>No movies found for "{searchQuery}"</p>
                        <button onClick={() => navigate('/')} className="btn-back">
                            ← Back to Home
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
