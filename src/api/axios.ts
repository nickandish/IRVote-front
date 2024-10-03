import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const apiClient = axios.create({
  baseURL: "http://172.16.17.35:8000",
});

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    console.log(token);
    if (token) {
      config.headers["Authorization"] = `bearer ${token}`;
      axios.defaults.withCredentials = true;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
