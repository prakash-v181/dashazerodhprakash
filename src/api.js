import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Render backend
  withCredentials: true,
  timeout: 10000
});

API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

export default API;
