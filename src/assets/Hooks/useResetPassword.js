import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function UseResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Obtém o token da URL de forma segura
  const token = new URLSearchParams(location.search).get("token");

  // Se não houver token, redireciona para login
  useEffect(() => {
    if (!token) {
      toast.error("Token inválido ou expirado.");
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    if (password.length < 8) {
      toast.error("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8801/resetPassword", {
        token,
        password,
      });

      if (response.status === 200) {
        toast.success("Senha alterada com sucesso!");
        navigate("/login", { state: { passwordReset: true } });
      }
    } catch (error) {
      console.error("Erro ao alterar a senha:", error.response?.data);
      toast.error(error.response?.data?.message || "Erro ao alterar a senha.");
    } finally {
      setLoading(false);
    }
  };

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    handleSubmit,
  };
}
