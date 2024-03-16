import axios from "axios";

let environment = "prod";
let urlProd = "https://10.0.0.243:8080/";
// let urlProd2 = "http://ip-10-0-0-243.ec2.internal:8080/";
let urlDev = "http://localhost:8080/";

const api = axios.create({
  baseURL: environment == "prod" ? urlProd : urlDev,
  timeout: 30000,
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
  baseURL: "http://localhost:80",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
export { api_mock, api, nifi_url };