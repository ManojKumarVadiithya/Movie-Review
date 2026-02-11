import axiosInstance from './axiosConfig';

export const reviewApi = {
    createReview: (reviewData) => {
        return axiosInstance.post('/reviews', reviewData);
    },

    getReviewsByImdbId: (imdbId, sortBy = 'newest') => {
        return axiosInstance.get(`/reviews/${imdbId}?sortBy=${sortBy}`);
    },

    updateReview: (reviewId, reviewData) => {
        return axiosInstance.put(`/reviews/${reviewId}`, reviewData);
    },

    deleteReview: (reviewId) => {
        return axiosInstance.delete(`/reviews/${reviewId}`);
    }
};
