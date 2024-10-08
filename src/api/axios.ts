import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "http://172.16.17.22:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token
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
