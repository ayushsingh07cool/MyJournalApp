import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8081/journal'
});

API.interceptors.request.use((config) => {

    const token = localStorage.getItem('token');

    if (
        token &&
        !config.url.includes('/public/login') &&
        !config.url.includes('/public/signup')
    ) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default API;