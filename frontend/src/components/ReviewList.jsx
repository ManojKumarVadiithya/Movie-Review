import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { reviewApi } from '../api/reviewApi';
import StarRating from './StarRating';
import './ReviewList.css';

const ReviewList = ({ movieImdbId, refreshTrigger }) => {
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [displayedReviews, setDisplayedReviews] = useState([]);
    const [sortBy, setSortBy] = useState('newest');
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editRating, setEditRating] = useState(0);
    const [editText, setEditText] = useState('');

    const ITEMS_PER_PAGE = 5;

    useEffect(() => {
        fetchReviews();
    }, [movieImdbId, sortBy, refreshTrigger]);

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const response = await reviewApi.getReviewsByImdbId(movieImdbId, sortBy);
            setReviews(response.data);
            loadMoreReviews(response.data, 0);
            setOffset(0);
        } catch (error) {
            console.error('Failed to fetch reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadMoreReviews = (allReviews, currentOffset) => {
        const end = currentOffset + ITEMS_PER_PAGE;
        const newDisplayed = allReviews.slice(0, end);
        setDisplayedReviews(newDisplayed);
        setHasMore(end < allReviews.length);
        setOffset(end);
    };

    const handleLoadMore = () => {
        loadMoreReviews(reviews, offset);
    };

    const handleEdit = (review) => {
        setEditingId(review.id);
        setEditRating(review.rating);
        setEditText(review.body);
    };

    const handleSaveEdit = async () => {
        try {
            await reviewApi.updateReview(editingId, {
                reviewBody: editText,
                rating: editRating,
                imdbId: movieImdbId
            });
            setEditingId(null);
            fetchReviews();
        } catch (error) {
            console.error('Failed to update review:', error);
        }
    };

    const handleDelete = async (reviewId) => {
        if (window.confirm('Delete this review?')) {
            try {
                await reviewApi.deleteReview(reviewId);
                fetchReviews();
            } catch (error) {
                console.error('Failed to delete review:', error);
            }
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="review-list-container">

            <div className="reviews-header">
                <h3>{reviews.length} Reviews</h3>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="highest-rated">Highest Rated</option>
                </select>
            </div>

            {loading && <div className="loading">Loading reviews...</div>}

            {!loading && reviews.length === 0 && (
                <div className="no-reviews">
                    No reviews yet. Be the first to review!
                </div>
            )}

            <div className="reviews-list">
                {displayedReviews.map((review) => (
                    <div key={review.id} className="review-item">

                        {editingId === review.id ? (
                            <div className="review-edit">
                                <StarRating value={editRating} onChange={setEditRating} />
                                <textarea
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    className="edit-textarea"
                                />
                                <div className="edit-actions">
                                    <button onClick={handleSaveEdit} className="btn-save">Save</button>
                                    <button onClick={() => setEditingId(null)} className="btn-cancel">Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="review-top">
                                    <div>
                                        <p className="review-user">{review.user.name}</p>
                                        <p className="review-date">{formatDate(review.createdAt)}</p>
                                    </div>

                                    {user && user.email === review.user.email && (
                                        <div className="review-actions">
                                            <button onClick={() => handleEdit(review)}>Edit</button>
                                            <button onClick={() => handleDelete(review.id)}>Delete</button>
                                        </div>
                                    )}
                                </div>

                                <StarRating value={review.rating} readOnly />

                                <p className="review-text">{review.body}</p>
                            </>
                        )}

                    </div>
                ))}
            </div>

            {!loading && hasMore && (
                <button onClick={handleLoadMore} className="btn-load-more">
                    Load More
                </button>
            )}

        </div>
    );
};

export default ReviewList;
