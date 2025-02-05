import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:8801/", // URL do seu backend
  timeout: 60000, // Tempo máximo de resposta (60 segundos)
  withCredentials: true, // Para cookies e sessões, se necessário
});

// Função para verificar se o token está expirado
const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    // Decodifica a parte payload do JWT (parte central)
    const payload = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payload)); // Decodifica de base64 para texto

    // Verifica se a expiração já passou
    return decodedPayload.exp < Date.now() / 1000; // Expiração é em segundos, então divide o tempo atual por 1000
  } catch (error) {
    return true; // Caso não consiga decodificar o token, considera como expirado
  }
};

// Intercepta as requisições para adicionar o token JWT no cabeçalho
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // O nome do token no localStorage precisa ser o mesmo de quando foi salvo (use "token" se for isso que você usa no login)
    if (token && !isTokenExpired(token)) {
      config.headers["Authorization"] = `Bearer ${token}`; // Adiciona o token ao cabeçalho
    } else {
      // Usar navigate para redirecionar no React
      const navigate = useNavigate();
      navigate("/login"); // Redireciona para o login se o token estiver expirado ou não presente
      return Promise.reject("Token expirado");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepta as respostas e redireciona para login se a sessão expirar
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Usar navigate para redirecionar no React
      const navigate = useNavigate();
      alert("Sessão expirada. Faça login novamente.");
      navigate("/login"); // Redireciona para login
    }
    return Promise.reject(error);
  }
);

export default api;
