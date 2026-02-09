import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";

export default function useRegister() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !email || !senha) {
      toast.error("Preencha todos os campos.");
      return;
    }

    if (senha.length < 6) {
      toast.error("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    try {
      await api.post("/register", { nome, email, senha });

      toast.success("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Erro ao realizar cadastro.",
      );
    }
  };

  const handleLoginClick = () => navigate("/login");

  return {
    nome,
    setNome,
    email,
    setEmail,
    senha,
    setSenha,
    mostrarSenha,
    setMostrarSenha,
    handleSubmit,
    handleLoginClick,
  };
}
