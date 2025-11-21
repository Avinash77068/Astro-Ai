// src/api/api.ts
import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: 'https://your-base-url.com/api', // <-- change to your API base URL
  timeout: 10000,
});

// Request Interceptor
api.interceptors.request.use(
  async config => {
    // Example: read token from async storage
    // const token = await AsyncStorage.getItem("token");
    const token = ''; // Replace with actual token logic

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

// Response Interceptor
api.interceptors.response.use(
  response => response,
  async error => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      console.warn('Unauthorized - Token may be expired');
      // Perform logout or refresh token logic here
    }
    return Promise.reject(error);
  },
);

export default api;
