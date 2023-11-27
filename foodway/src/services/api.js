import axios from "axios";

let ambiente = "desenvolvimento";
let urlProducao = "https://lobster-app-ompes.ondigitalocean.app/";
let urlDesenvolvimento = "http://localhost:8080/";

const api = axios.create({
  baseURL: ambiente == "producao" ? urlProducao : urlDesenvolvimento,
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

const api_maps = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/",
  headers: {
    "Content-Type": "image/png",
  },
});

export default api;
export { api_mock, api, api_maps };