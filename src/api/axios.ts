import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const apiClient = axios.create({
  baseURL: "http://172.16.17.2:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("accessToken") || cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
