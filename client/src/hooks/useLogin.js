import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../services/api";

export default function useLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();

  // Função de validação de senha
  const isSenhaValid = (senha) => senha.length >= 6;

  // Verifica se já existe um token e redireciona se já estiver autenticado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // Redireciona para a página inicial
    }
  }, [navigate]);

  const togglePasswordVisibility = () => setMostrarSenha((prev) => !prev);

  const showToastError = (message) => toast.error(message);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Validação de campos
      if (!email || !senha) {
        return showToastError("Por favor, preencha todos os campos.");
      }

      if (!isSenhaValid(senha)) {
        return showToastError("Senha deve ter pelo menos 6 caracteres.");
      }

      try {
        const { data } = await api.post("/login", { email, senha });

        if (!data) {
          return showToastError("Resposta inválida do servidor.");
        }

        const { token, message, nomeUsuario } = data;

        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("nomeUsuario", nomeUsuario); // Salva o nome do usuário corretamente
          toast.success("Login bem-sucedido!");
          navigate("/"); // Redireciona para a página inicial
        } else {
          showToastError(message || "Erro ao fazer login.");
        }
      } catch (error) {
        showToastError(
          error.response?.data?.message || "Erro na conexão com o servidor."
        );
      }
    },
    [email, senha, navigate]
  );

  const handleRegisterClick = useCallback(
    () => navigate("/register"),
    [navigate]
  );

  const handleForgotPasswordClick = useCallback(
    () => navigate("/requestPassword"),
    [navigate]
  );

  return {
    email,
    setEmail,
    senha,
    setSenha,
    mostrarSenha,
    togglePasswordVisibility,
    handleSubmit,
    handleRegisterClick,
    handleForgotPasswordClick,
  };
}
