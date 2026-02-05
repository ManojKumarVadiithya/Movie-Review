import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { movieApi } from '../api/movieApi';
import './AddMovie.css';

const AddMovie = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        imdbId: '',
        title: '',
        releaseDate: '',
        trailerLink: '',
        genres: '',
        poster: '',
        backdrops: ''
    });

    const [ottPlatforms, setOttPlatforms] = useState([]);
    const [newOttPlatform, setNewOttPlatform] = useState({
        name: '',
        url: '',
        logo: ''
    });

    const [errors, setErrors] = useState({});
    const [ottErrors, setOttErrors] = useState({});

    // Validate IMDB ID format
    const isValidImdbId = (id) => {
        return /^tt\d{7,9}$/.test(id);
    };

    // Validate URL format
    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    // Validate form data
    const validateForm = () => {
        const newErrors = {};

        if (!formData.imdbId.trim()) {
            newErrors.imdbId = 'IMDB ID is required';
        } else if (!isValidImdbId(formData.imdbId)) {
            newErrors.imdbId = 'IMDB ID must be in format: tt1234567';
        }

        if (!formData.title.trim()) {
            newErrors.title = 'Movie title is required';
        } else if (formData.title.trim().length < 1) {
            newErrors.title = 'Title must be at least 1 character';
        }

        if (!formData.releaseDate.trim()) {
            newErrors.releaseDate = 'Release date is required';
        }

        if (!formData.trailerLink.trim()) {
            newErrors.trailerLink = 'Trailer link is required';
        } else if (!isValidUrl(formData.trailerLink)) {
            newErrors.trailerLink = 'Please enter a valid URL';
        }

        if (!formData.genres.trim()) {
            newErrors.genres = 'At least one genre is required';
        }

        if (!formData.poster.trim()) {
            newErrors.poster = 'Poster URL is required';
        } else if (!isValidUrl(formData.poster)) {
            newErrors.poster = 'Please enter a valid URL for poster';
        }

        if (!formData.backdrops.trim()) {
            newErrors.backdrops = 'At least one backdrop URL is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Validate OTT Platform
    const validateOttPlatform = (platform) => {
        const errors = {};

        if (!platform.name.trim()) {
            errors.name = 'Platform name is required';
        }

        if (!platform.url.trim()) {
            errors.url = 'Platform URL is required';
        } else if (!isValidUrl(platform.url)) {
            errors.url = 'Please enter a valid URL';
        }

        if (!platform.logo.trim()) {
            errors.logo = 'Platform logo URL is required';
        } else if (!isValidUrl(platform.logo)) {
            errors.logo = 'Please enter a valid URL for logo';
        }

        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleOttPlatformChange = (e) => {
        const { name, value } = e.target;
        setNewOttPlatform(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field when user starts typing
        if (ottErrors[name]) {
            setOttErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleAddOttPlatform = () => {
        const errors = validateOttPlatform(newOttPlatform);

        if (Object.keys(errors).length > 0) {
            setOttErrors(errors);
            return;
        }

        setOttPlatforms(prev => [...prev, { ...newOttPlatform }]);
        setNewOttPlatform({
            name: '',
            url: '',
            logo: ''
        });
        setOttErrors({});
    };

    const handleRemoveOttPlatform = (index) => {
        setOttPlatforms(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Parse genres and backdrops as arrays
            const genresArray = formData.genres
                .split(',')
                .map(g => g.trim())
                .filter(g => g.length > 0);

            const backdropsArray = formData.backdrops
                .split(',')
                .map(b => b.trim())
                .filter(b => b.length > 0);

            const movieData = {
                imdbId: formData.imdbId,
                title: formData.title,
                releaseDate: formData.releaseDate,
                trailerLink: formData.trailerLink,
                genres: genresArray,
                poster: formData.poster,
                backdrops: backdropsArray,
                ottPlatforms: ottPlatforms.length > 0 ? ottPlatforms : null
            };

            const response = await movieApi.createMovie(movieData);

            if (response.data) {
                setSuccess('Movie added successfully! Redirecting to home...');
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add movie. Please try again.');
            console.error('Error adding movie:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-movie-container">
            <div className="add-movie-wrapper">
                <h1>Add New Movie</h1>

                {error && <div className="alert alert-error">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <form onSubmit={handleSubmit} className="add-movie-form">
                    {/* IMDB ID */}
                    <div className="form-group">
                        <label htmlFor="imdbId">IMDB ID <span className="required">*</span></label>
                        <input
                            type="text"
                            id="imdbId"
                            name="imdbId"
                            value={formData.imdbId}
                            onChange={handleChange}
                            placeholder="e.g., tt1234567"
                            className={errors.imdbId ? 'input-error' : ''}
                        />
                        {errors.imdbId && <span className="error-text">{errors.imdbId}</span>}
                        <small className="help-text">Format: tt followed by 7-9 digits (e.g., tt0111161)</small>
                    </div>

                    {/* Title */}
                    <div className="form-group">
                        <label htmlFor="title">Movie Title <span className="required">*</span></label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., The Shawshank Redemption"
                            className={errors.title ? 'input-error' : ''}
                        />
                        {errors.title && <span className="error-text">{errors.title}</span>}
                    </div>

                    {/* Release Date */}
                    <div className="form-group">
                        <label htmlFor="releaseDate">Release Date <span className="required">*</span></label>
                        <input
                            type="date"
                            id="releaseDate"
                            name="releaseDate"
                            value={formData.releaseDate}
                            onChange={handleChange}
                            className={errors.releaseDate ? 'input-error' : ''}
                        />
                        {errors.releaseDate && <span className="error-text">{errors.releaseDate}</span>}
                    </div>

                    {/* Trailer Link */}
                    <div className="form-group">
                        <label htmlFor="trailerLink">Trailer Link <span className="required">*</span></label>
                        <input
                            type="url"
                            id="trailerLink"
                            name="trailerLink"
                            value={formData.trailerLink}
                            onChange={handleChange}
                            placeholder="https://www.youtube.com/watch?v=..."
                            className={errors.trailerLink ? 'input-error' : ''}
                        />
                        {errors.trailerLink && <span className="error-text">{errors.trailerLink}</span>}
                    </div>

                    {/* Genres */}
                    <div className="form-group">
                        <label htmlFor="genres">Genres <span className="required">*</span></label>
                        <input
                            type="text"
                            id="genres"
                            name="genres"
                            value={formData.genres}
                            onChange={handleChange}
                            placeholder="e.g., Drama, Crime, Thriller (comma-separated)"
                            className={errors.genres ? 'input-error' : ''}
                        />
                        {errors.genres && <span className="error-text">{errors.genres}</span>}
                        <small className="help-text">Separate multiple genres with commas</small>
                    </div>

                    {/* Poster */}
                    <div className="form-group">
                        <label htmlFor="poster">Poster URL <span className="required">*</span></label>
                        <input
                            type="url"
                            id="poster"
                            name="poster"
                            value={formData.poster}
                            onChange={handleChange}
                            placeholder="https://example.com/poster.jpg"
                            className={errors.poster ? 'input-error' : ''}
                        />
                        {errors.poster && <span className="error-text">{errors.poster}</span>}
                    </div>

                    {/* Backdrops */}
                    <div className="form-group">
                        <label htmlFor="backdrops">Backdrop URLs <span className="required">*</span></label>
                        <textarea
                            id="backdrops"
                            name="backdrops"
                            value={formData.backdrops}
                            onChange={handleChange}
                            placeholder="https://example.com/backdrop1.jpg, https://example.com/backdrop2.jpg"
                            className={errors.backdrops ? 'input-error' : ''}
                            rows="3"
                        />
                        {errors.backdrops && <span className="error-text">{errors.backdrops}</span>}
                        <small className="help-text">Separate multiple backdrop URLs with commas</small>
                    </div>

                    {/* OTT Platforms Section */}
                    <div className="ott-platforms-section">
                        <h3>📺 OTT Platforms <span className="optional">(Optional)</span></h3>
                        <p className="section-description">Add platforms where users can watch this movie</p>

                        {ottPlatforms.length > 0 && (
                            <div className="added-platforms">
                                {ottPlatforms.map((platform, index) => (
                                    <div key={index} className="platform-card">
                                        <div className="platform-info">
                                            <img src={platform.logo} alt={platform.name} className="platform-logo" />
                                            <div className="platform-details">
                                                <p className="platform-name">{platform.name}</p>
                                                <a href={platform.url} target="_blank" rel="noopener noreferrer" className="platform-link">
                                                    Watch Here →
                                                </a>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="btn-remove-platform"
                                            onClick={() => handleRemoveOttPlatform(index)}
                                            title="Remove this platform"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="ott-input-group">
                            <div className="form-group">
                                <label htmlFor="platformName">Platform Name</label>
                                <input
                                    type="text"
                                    id="platformName"
                                    name="name"
                                    value={newOttPlatform.name}
                                    onChange={handleOttPlatformChange}
                                    placeholder="e.g., Netflix, Amazon Prime Video"
                                    className={ottErrors.name ? 'input-error' : ''}
                                />
                                {ottErrors.name && <span className="error-text">{ottErrors.name}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="platformUrl">Platform Watch Link</label>
                                <input
                                    type="url"
                                    id="platformUrl"
                                    name="url"
                                    value={newOttPlatform.url}
                                    onChange={handleOttPlatformChange}
                                    placeholder="https://www.netflix.com/watch/..."
                                    className={ottErrors.url ? 'input-error' : ''}
                                />
                                {ottErrors.url && <span className="error-text">{ottErrors.url}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="platformLogo">Platform Logo URL</label>
                                <input
                                    type="url"
                                    id="platformLogo"
                                    name="logo"
                                    value={newOttPlatform.logo}
                                    onChange={handleOttPlatformChange}
                                    placeholder="https://example.com/netflix-logo.png"
                                    className={ottErrors.logo ? 'input-error' : ''}
                                />
                                {ottErrors.logo && <span className="error-text">{ottErrors.logo}</span>}
                            </div>

                            <button
                                type="button"
                                className="btn-add-platform"
                                onClick={handleAddOttPlatform}
                            >
                                ➕ Add Platform
                            </button>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="form-buttons">
                        <button 
                            type="submit" 
                            className="btn-submit"
                            disabled={loading}
                        >
                            {loading ? 'Adding Movie...' : 'Add Movie'}
                        </button>
                        <button 
                            type="button" 
                            className="btn-cancel"
                            onClick={() => navigate('/')}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMovie;
