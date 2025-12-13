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

    // Network Logger: Log outgoing request
    console.log('🌐 Network Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      headers: config.headers,
      data: config.data,
    });

    return config;
  },
  error => Promise.reject(error),
);

// Response Interceptor
api.interceptors.response.use(
  response => {
    // Network Logger: Log successful response
    console.log('✅ Network Response:', {
      status: response.status,
      url: response.config.url,
      method: response.config.method?.toUpperCase(),
      data: response.data,
    });
    return response;
  },
  async error => {
    // Network Logger: Log error response
    console.log('❌ Network Error:', {
      status: error.response?.status,
      url: error.config?.url,
      method: error.config?.method?.toUpperCase(),
      message: error.message,
      data: error.response?.data,
    });

    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      console.warn('Unauthorized - Token may be expired');
      // Perform logout or refresh token logic here
    }
    return Promise.reject(error);
  },
);

export default api;
