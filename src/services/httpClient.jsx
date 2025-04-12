import axios from "axios";

// eslint-disable-next-line no-undef
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const httpClient = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default httpClient;