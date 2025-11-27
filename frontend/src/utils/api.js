// src/utils/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://mood-tracker-backend-p4lb.onrender.com", // backend base
});

// attach token on requests if exists
API.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
