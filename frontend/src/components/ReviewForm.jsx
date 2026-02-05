import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { reviewApi } from '../api/reviewApi';
import StarRating from './StarRating';
import './ReviewForm.css';

const ReviewForm = ({ movieImdbId, onReviewSubmitted }) => {
    const { isAuthenticated, user } = useContext(AuthContext);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!rating || !reviewText.trim()) {
            setError('Please provide both a rating and review text');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await reviewApi.createReview({
                reviewBody: reviewText,
                rating: rating,
                imdbId: movieImdbId
            });

            if (response.status === 201 || response.data) {
                setSuccess('Review submitted successfully!');
                setRating(0);
                setReviewText('');

                setTimeout(() => {
                    setSuccess(null);
                    onReviewSubmitted();
                }, 2000);
            }
        } catch (err) {
            console.error('Review submission error:', err);
            setError(err.response?.data?.message || 'Failed to submit review. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="review-form-container login-prompt">
                <p>Please log in to submit a review</p>
            </div>
        );
    }

    return (
        <div className="review-form-container">
            <h3>Share Your Review</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Your Rating:</label>
                    <StarRating value={rating} onChange={setRating} />
                </div>

                <div className="form-group">
                    <label htmlFor="review-text">Your Review:</label>
                    <textarea
                        id="review-text"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Write your thoughts about this movie..."
                        rows="4"
                        disabled={loading}
                    />
                </div>

                {error && <div className="alert alert-error">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <button
                    type="submit"
                    disabled={loading || !rating || !reviewText.trim()}
                    className="btn-submit"
                >
                    {loading ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;
