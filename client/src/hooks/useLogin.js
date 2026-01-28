import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../src/AuthContext/index";
import api from "../services/api";

export default function useLogin() {
  const [nomeLogado, setNomeLogado] = useState(
    localStorage.getItem("nomeUsuario") || ""
  );
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Para pegar a página de onde o usuário veio

  const [loading, setLoading] = useState(false);
  const [error, setErros] = useState(null);
  const { login } = useAuth();

  const isSenhaValid = (senha) => senha.length >= 6;

  const togglePasswordVisibility = () => setMostrarSenha((prev) => !prev);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!email || !senha) {
        toast.error("Por favor, preencha todos os campos.");
        return;
      }

      if (!isSenhaValid(senha)) {
        toast.error("Senha deve ter pelo menos 6 caracteres.");
        setEmail("");
        setSenha("");
        return;
      }

      try {
        // 1. Login
        const { data } = await api.post("/login", { email, senha });

        if (!data?.token) {
          toast.error("Resposta inválida do servidor.");
          return;
        }

        const { token } = data;

        // 2. Armazenar token
        localStorage.setItem("token", token);

        // 3. Buscar nome do usuário
        const usuarioResponse = await api.get("/usuarios/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const nomeUsuario = usuarioResponse?.data?.nome;

        if (nomeUsuario) {
          localStorage.setItem("nomeUsuario", nomeUsuario);
          setNomeLogado(nomeUsuario); // Atualiza o nome no estado
          login({ nome: nomeUsuario, token });
        } else {
          console.warn(
            "Nome do usuário é nulo ou indefinido:",
            usuarioResponse?.data
          );
        }

        toast.success("Login bem-sucedido!");

        const from = location.state?.from || "/home"; // Redireciona para a página anterior ou para home
        navigate(from, { replace: true }); // Navega para a página desejada
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message || "Erro na conexão com o servidor.";
        toast.error(errorMessage);
        setEmail("");
        setSenha("");
      }
    },
    [email, senha, navigate, location.state, login] // Certifique-se de incluir location.state
  );

  const handleLogout = useCallback(() => {
    // Limpeza de informações armazenadas
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("nomeUsuario");
    sessionStorage.removeItem("nomeUsuario");
    localStorage.removeItem("rememberMe");

    // Atualiza o estado ao deslogar
    setNomeLogado("");
    login(null);
    navigate("/login");
  }, [navigate, login]);

  const handleRegisterClick = useCallback(
    () => navigate("/register"),
    [navigate]
  );
  const handleForgotPasswordClick = useCallback(
    () => navigate("/requestPassword"),
    [navigate]
  );

  const updateNomeUsuario = (newNome) => {
    setNomeLogado(newNome);
    localStorage.setItem("nomeUsuario", newNome); // Atualiza o nome no localStorage
  };

  return {
    nomeLogado,
    updateNomeUsuario,
    email,
    setEmail,
    senha,
    setSenha,
    mostrarSenha,
    togglePasswordVisibility,
    handleSubmit,
    handleRegisterClick,
    handleForgotPasswordClick,
    handleLogout,
  };
}
