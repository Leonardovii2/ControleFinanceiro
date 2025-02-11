import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

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

    /* https://controlefinanceiro-dktx.onrender.com/usuarios/register */

    try {
      const response = await fetch("http://localhost:8801/register/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 409) {
          toast.error("E-mail já está em uso!");
        } else {
          toast.error("Erro ao cadastrar usuário!");
        }
        return;
      }

      const data = await response.json();
      console.log(data);
      toast.success("Cadastro realizado com sucesso!");

      // Resetar os campos do formulário
      setNome("");
      setEmail("");
      setSenha("");
      navigate("/login");
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Erro ao cadastrar usuário!");
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
