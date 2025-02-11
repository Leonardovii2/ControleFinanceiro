import axios from "axios";

// Criar a instância do axios
const api = axios.create({
  /* baseURL: "http://localhost:8801/", */ // URL do seu backend
  baseURL: process.env.REACT_APP_API_URL,
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
    const expirationTime = decodedPayload.exp;
    if (!expirationTime) return true; // Se não houver 'exp', considera como expirado

    return expirationTime < Date.now() / 1000; // Expiração é em segundos, então divide o tempo atual por 1000
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
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
      // Se o token não existir ou estiver expirado, lança um erro
      return Promise.reject(new Error("Token expirado ou não presente"));
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
      // Retorna o erro para o App.jsx tratar o redirecionamento
      return Promise.reject(new Error("Sessão expirada"));
    }
    return Promise.reject(error);
  }
);

export default api;
