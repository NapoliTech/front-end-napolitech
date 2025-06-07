import axios from "axios";

export  const api = axios.create({
  baseURL:import.meta.env.VITE_ENDERECO_API,
})

api.interceptors.request.use(
  (config) => {
      const token = localStorage.getItem('token'); // Obtém o token do sessionStorage
      if (token) {
          config.headers.Authorization = `Bearer ${token}`; // Adiciona o token no cabeçalho Authorization
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

export const apiChatBot = axios.create({
  baseURL: import.meta.env.VITE_ENDERECO_CHAT,
});
