import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../AuthContext";
import api from "../../services/api";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!email || !senha) {
        toast.error("Preencha todos os campos.");
        return;
      }

      if (senha.length < 6) {
        toast.error("Senha deve ter pelo menos 6 caracteres.");
        return;
      }

      try {
        const { data } = await api.post("/login", { email, senha });
        const token = data?.token;

        if (!token) {
          toast.error("Resposta inválida do servidor.");
          return;
        }

        localStorage.setItem("token", token);

        const userRes = await api.get("/usuarios/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const nomeUsuario = userRes?.data?.nome;

        login({ nome: nomeUsuario, token });
        localStorage.setItem("nomeUsuario", nomeUsuario);

        toast.success("Login realizado com sucesso!");

        const from = location.state?.from || "/home";
        navigate(from, { replace: true });
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Erro ao conectar com o servidor.",
        );
      }
    },
    [email, senha, navigate, location.state, login],
  );

  return {
    email,
    setEmail,
    senha,
    setSenha,
    mostrarSenha,
    setMostrarSenha,
    handleSubmit,
    handleRegisterClick: () => navigate("/register"),
  };
}
