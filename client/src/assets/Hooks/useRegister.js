import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import api from "../../services/api"; // Importando a instância do axios

export default function UseRegister() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nome || !email || !senha) {
      toast.error("Por favor, preencha todos os campos!");
      return;
    }

    try {
      const response = await api.post("/register/register", {
        // Usando a instância api
        nome,
        email,
        senha,
      });

      const data = response.data;

      toast.success("Cadastro realizado com sucesso!");

      // Resetar os campos do formulário
      setNome("");
      setEmail("");
      setSenha("");
      navigate("/login");
    } catch (error) {
      console.error("Erro:", error);
      if (error.response?.status === 409) {
        toast.error("E-mail já está em uso!");
      } else {
        toast.error("Erro ao cadastrar usuário!");
      }
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const togglePasswordVisibility = () => {
    setMostrarSenha((prevState) => !prevState); // Alterna a visibilidade da senha
  };

  return {
    nome,
    setNome,
    email,
    setEmail,
    senha,
    setSenha,
    mostrarSenha,
    setMostrarSenha,
    handleLoginClick,
    togglePasswordVisibility,
    handleSubmit,
  };
}
