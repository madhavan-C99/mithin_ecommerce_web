// src/webdelivery/api/Axios.js

import axios from "axios";

/**
 * Delivery Boy — Central Axios Instance
 * Separate from webapp axiosInstance.
 * Uses "delivery_token" key — never collides with user "access_token".
 */

const deliveryAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request Interceptor
 * Attaches delivery JWT automatically if available
 */
deliveryAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("delivery_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor
 * 1. Unwrap response.data (matches your backend envelope pattern)
 * 2. Normalize errors into a consistent shape
 * 3. Handle 401 — clear delivery session globally
 */
deliveryAxios.interceptors.response.use(
  (response) => {
    return response.data?.data ?? response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("delivery_token");
      localStorage.removeItem("delivery_user");
    }

    const normalizedError = {
      message:
        error.response?.data?.data?.message ||
        error.response?.data?.message ||
        error.message ||
        "Something went wrong",
      status: error.response?.status || null,
      data: error.response?.data || null,
    };

    return Promise.reject(normalizedError);
  }
);

export default deliveryAxios;