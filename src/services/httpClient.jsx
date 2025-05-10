import axios from "axios";

// eslint-disable-next-line no-undef
const backendUrl = process.env.VITE_ENDERECO_API;

const httpClient = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default httpClient;