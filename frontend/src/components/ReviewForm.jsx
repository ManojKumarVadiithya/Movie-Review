import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { reviewApi } from '../api/reviewApi';
import StarRating from './StarRating';
import './ReviewForm.css';

const ReviewForm = ({ movieImdbId, onReviewSubmitted }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!rating || !reviewText.trim()) {
            setError('Please provide rating and review');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await reviewApi.createReview({
                reviewBody: reviewText,
                rating,
                imdbId: movieImdbId
            });

            if (response.status === 201 || response.data) {
                setRating(0);
                setReviewText('');
                onReviewSubmitted();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit review');
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="review-form-compact login-prompt">
                Please log in to write a review
            </div>
        );
    }

    return (
        <form className="review-form-compact" onSubmit={handleSubmit}>

            <div className="review-top">
                <StarRating value={rating} onChange={setRating} />
            </div>

            <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review..."
                disabled={loading}
                rows="2"
            />

            {error && <div className="compact-error">{error}</div>}

            <div className="review-actions">
                <button
                    type="submit"
                    disabled={loading || !rating || !reviewText.trim()}
                >
                    {loading ? 'Posting...' : 'Post Review'}
                </button>
            </div>

        </form>
    );
};

export default ReviewForm;
