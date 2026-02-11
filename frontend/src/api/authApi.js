import axiosInstance from './axiosConfig';

export const authApi = {
    register: (email, name, password) => {
        return axiosInstance.post('/auth/register', { email, name, password });
    },

    login: (email, password) => {
        return axiosInstance.post('/auth/login', { email, password });
    },

    validate: () => {
        return axiosInstance.get('/auth/validate');
    }
};
