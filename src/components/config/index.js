import axios from "axios";

const request = axios.create({
  baseURL: "https://gmcar-backend.best-change-grozniy.ru/api/v1"
});

request.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("auth");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default request;
