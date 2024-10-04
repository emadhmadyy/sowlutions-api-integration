import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const _get = (url, config = {}) => {
  return apiClient.get(url, config);
};

export { _get };
