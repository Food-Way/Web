import axios from "axios";

let environment = "dev";

const urlProd = {
  "api": "/api",
  "nifi": "/nifi",
}

const urlDev = {
  "api": "http://localhost:8080/",
  "nifi": "http://localhost:80/",
}

const api = axios.create({
  baseURL: environment == "prod" ? urlProd.api : urlDev.api,
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
  baseURL: environment == "prod" ? urlProd.nifi : urlDev.nifi,
  headers: {
    "Content-Type": "application/json", 
  },
});

export default api;
export { api_mock, api, nifi_url };