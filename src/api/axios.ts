import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const apiClient = axios.create({
  baseURL: "http://172.16.17.35:8000",
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = cookies.get("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
