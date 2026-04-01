import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    console.error("Status:", error.response?.status);
    return Promise.reject(error);
  },
);

// Authentication
export const auth = {
  register: (data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) => api.post("/register", data),
  login: (data: { email: string; password: string }) =>
    api.post("/login", data),
  getProfile: () => api.get("/profile"),
  logout: () => api.post("/logout"),
};

// Categories
export const categories = {
  getAll: () => api.get("/categories"),
  getOne: (id: number) => api.get(`/categories/${id}`),
  create: (data: { name: string }) => api.post("/categories", data),
};

// Movies
export const movies = {
  getAll: () => api.get("/movies"),
  getOne: (id: number) => api.get(`/movies/${id}`),
  create: (data: {
    title: string;
    description?: string;
    category_id: number;
  }) => api.post("/movies", data),
  update: (
    id: number,
    data: { title?: string; description?: string; category_id?: number },
  ) => api.put(`/movies/${id}`, data),
  delete: (id: number) => api.delete(`/movies/${id}`),
};

// Watchlist
export const watchlist = {
  get: () => api.get("/watchlist"),
  addMovie: (data: { movie_id: number }) => api.post("/watchlist", data),
  removeMovie: (movieId: number) => api.delete(`/watchlist/${movieId}`),
};

export default api;
