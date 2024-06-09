import axios from 'axios';
import env from '../../environment/environment';

const axiosInstance = axios.create({
  baseURL: env.apiUrl
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('apiToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
