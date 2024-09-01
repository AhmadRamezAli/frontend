import axios from 'axios';

// Create an instance of axios
export const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Set your API base URL
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the request before it is sent, such as adding authorization headers
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle the error before sending the request
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle the response before it reaches the application code
    return response;
  },
  (error) => {
    // Handle the error response, such as logging out on 401
    if (error.response && error.response.status === 401) {
      // Redirect to login or handle unauthorized error
      console.log("Unauthorized, logging out...");
      // Perform logout action
    }
    return Promise.reject(error);
  }
);
