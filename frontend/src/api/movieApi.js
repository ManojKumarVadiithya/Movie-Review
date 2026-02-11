import axiosInstance from './axiosConfig';

export const movieApi = {
    getAllMovies: () => {
        return axiosInstance.get('/movies');
    },

    getMovieByImdbId: (imdbId) => {
        return axiosInstance.get(`/movies/${imdbId}`);
    },

    createMovie: (movieData) => {
        return axiosInstance.post('/movies', movieData);
    }
};
