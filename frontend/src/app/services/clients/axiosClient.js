import { PUBLIC_API_URL } from '@/app/constants';
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: PUBLIC_API_URL, 
})

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        return response; 
    },
    (error) => {
        const { response } = error;

        if (response && (response.status === 401 || response.status === 403 || response.status === 404)) {
            localStorage.removeItem('token')
            window.location.href = '/';
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
