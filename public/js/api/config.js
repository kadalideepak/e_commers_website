/**
 * API configuration - Axios instance with base URL
 * All API calls use this instance for consistent base URL and interceptors
 *
 * Use the same origin as the frontend (protocol + host + port),
 * so it works in dev and avoids unsafe/blocked ports.
 */
const API_BASE_URL = window.location.origin;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: add token to requests if user is logged in
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optional: handle 401 (e.g. clear token and redirect to login)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  },
);
