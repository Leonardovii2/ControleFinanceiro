import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api"; // Importando a instância do axios configurada

export default function useRegister() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verifica se todos os campos foram preenchidos
    if (!nome || !email || !senha) {
      toast.error("Por favor, preencha todos os campos!");
      return;
    }

    try {
      // Realiza a requisição de cadastro
      const response = await api.post("/register", {
        nome,
        email,
        senha,
      });

      if (!response || !response.data) {
        toast.error("Resposta inválida do servidor.");
        return;
      }

      // Sucesso no cadastro
      toast.success("Cadastro realizado com sucesso!");

      // Resetando os campos do formulário após o cadastro
      setNome("");
      setEmail("");
      setSenha("");

      // Redireciona o usuário para a página de login
      navigate("/login");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      if (error.response?.status === 409) {
        // E-mail já cadastrado
        toast.error("E-mail já está em uso!");
      } else {
        // Outros erros
        toast.error("Erro ao cadastrar usuário!");
      }
    }
  };

  const handleLoginClick = () => {
    // Redireciona para a página de login
    navigate("/login");
  };

  const togglePasswordVisibility = () => {
    // Alterna a visibilidade da senha
    setMostrarSenha((prevState) => !prevState);
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
