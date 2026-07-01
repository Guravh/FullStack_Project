import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("aurelia_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchProducts = (params) =>
  api.get("/products", { params }).then((r) => r.data);
export const fetchProduct = (id) =>
  api.get(`/products/${id}`).then((r) => r.data);
export const fetchFeatured = () =>
  api.get("/products/featured").then((r) => r.data);
export const fetchNewArrivals = () =>
  api.get("/products/new-arrivals").then((r) => r.data);
export const fetchByCategory = (cat) =>
  api.get(`/products/category/${cat}`).then((r) => r.data);

export const loginUser = (data) =>
  api.post("/auth/login", data).then((r) => r.data);
export const registerUser = (data) =>
  api.post("/auth/register", data).then((r) => r.data);
export const fetchProfile = () => api.get("/auth/profile").then((r) => r.data);

export const createOrder = (data) =>
  api.post("/orders", data).then((r) => r.data);
export const fetchMyOrders = () => api.get("/orders/my").then((r) => r.data);

export const fetchWishlist = () =>
  api.get("/orders/wishlist").then((r) => r.data);
export const addToWishlist = (id) =>
  api.post(`/orders/wishlist/${id}`).then((r) => r.data);
export const removeFromWishlist = (id) =>
  api.delete(`/orders/wishlist/${id}`).then((r) => r.data);

export default api;
