import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8801/usuarios", // URL do seu backend
    timeout: 60000, // Tempo máximo de resposta (60 segundos)
    withCredentials: true, // Para cookies e sessões, se necessário
});

// Intercepta as requisições para adicionar o token JWT no cabeçalho
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem("authToken"); // Supondo que você armazene o token no localStorage
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 🔥 Intercepta respostas e redireciona para login se a sessão expirar
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            alert("Sessão expirada. Faça login novamente.");
            window.location.href = "/login"; // Redireciona para login
        }
        return Promise.reject(error);
    }
);

export default api;