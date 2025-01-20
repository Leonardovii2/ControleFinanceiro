import axios from "axios";

const api = axios.create({
    baseURL: "https://my-app-hazel-six.vercel.app", // URL do seu backend
    timeout: 60000, // Tempo máximo de resposta (60 segundos)
    withCredentials: true, // Para cookies e sessões, se necessário
});

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