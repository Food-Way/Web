import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_URL_BACKEND,
  headers: {
    "Content-Type": "application/json",
  },
});

const api_mock = axios.create({
  baseURL: "https://6514aa4fdc3282a6a3cd5f35.mockapi.io/",
  headers: {
    "Content-Type": "application/json",
  },
});

const nifi_url = axios.create({
  baseURL: import.meta.env.VITE_URL_NIFI,
  headers: {
    "Content-Type": "application/json", 
  },
});

export default api;
export { api_mock, api, nifi_url };