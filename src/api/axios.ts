import axios, { AxiosResponse } from "axios";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "http://172.16.17.35:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    return Promise.reject(error);
  }
);

export default apiClient;
