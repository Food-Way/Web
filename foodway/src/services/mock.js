import axios from "axios";

const api = axios.create({
    baseURL: "https://65218f30a4199548356d5ed4.mockapi.io"
});

export default api;
