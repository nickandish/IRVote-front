import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "https://172.16.17.35:8000/",
  headers: {
    "Content-Type": "application/json",
  },
  //timeout: 10000, Specifies that if a request takes more than 10 seconds (10,000 milliseconds), it will fail.
});

// Add interceptors for request/response here if needed
apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = cookies.get("token");
    if (token) {
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config as any;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    // Handle response errors globally, e.g., logging or displaying alerts
    return Promise.reject(error);
  }
);

export default apiClient;
