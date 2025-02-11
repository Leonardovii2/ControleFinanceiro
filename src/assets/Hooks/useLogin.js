import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function useLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Efeito para mostrar mensagem de sucesso de mudança de senha
  useEffect(() => {
    if (location.state?.passwordReset) {
      toast.success("Senha alterada com sucesso!");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const togglePasswordVisibility = () => {
    setMostrarSenha((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8801/login/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("nomeUsuario", data.nome);

        navigate("/home");
      } else {
        const error = await response.json();
        toast.error(error.message || "Erro ao fazer login");
      }
    } catch (error) {
      toast.error("Erro na conexão com o servidor.");
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleForgotPasswordClick = () => {
    navigate("/requestPassword");
  };

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
