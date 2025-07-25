// src/api.js
import axios from 'axios';

// Configuração que funciona em qualquer ambiente
const baseURL = (() => {
  // Para Vite
  if (typeof import.meta.env !== 'undefined' && import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // Para Create React App
  if (typeof process !== 'undefined' && process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  // Valor padrão
  return 'https://space-burger-gdfn.onrender.com';
})();

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptadores (opcional)
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

export default api;