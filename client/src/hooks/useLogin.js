import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

export default function useLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();

  // Verifica se já existe um token e redireciona se já estiver autenticado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // Redireciona para a página inicial
    }
  }, [navigate]);

  const togglePasswordVisibility = () => {
    setMostrarSenha((prevState) => !prevState);
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Validação de campos
      if (!email || !senha) {
        toast.error("Por favor, preencha todos os campos.");
        return;
      }

      try {
        const { data } = await api.post("/login", { email, senha });

        if (!data) {
          toast.error("Resposta inválida do servidor.");
          return;
        }

        const { token, message } = data;

        if (token) {
          localStorage.setItem("token", token);
          navigate("/"); // Redireciona para a página inicial
        } else {
          toast.error(message || "Erro ao fazer login.");
        }
      } catch (error) {
        toast.error(
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
