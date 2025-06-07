import axios from "axios";

// Use import.meta.env para Vite
const backendUrl = import.meta.env.VITE_ENDERECO_API;

const httpClient = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default httpClient;