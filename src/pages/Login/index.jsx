import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { useNavigate, useLocation } from "react-router-dom"; // Importando useLocation para obter o estado
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Exibir notificação de sucesso se passwordReset for true
    if (location.state?.passwordReset) {
      toast.success("Senha alterada com sucesso!");
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8800/usuarios/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleForgotPasswordClick = () => {
    navigate("/requestPassword");
  };

  return (
    <main className={styles.main}>
      <section className={styles.sectionInfo}>
        <h1>Bem-vindo!</h1>
        <p>
          Gerencie suas despesas de forma rápida e simples. Sem enrolação, o
          melhor sistema para organizar suas finanças.
        </p>
        <button
          className={styles.buttonCadastro}
          onClick={handleRegisterClick}
          type="button"
        >
          Cadastrar
        </button>
      </section>
      <section className={styles.sectionForm}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.titulo}>Login</h2>
          <label className={styles.padding} htmlFor="email">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className={styles.padding} htmlFor="senha">
            Senha
          </label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <a
            className={styles.esqueciSenha}
            onClick={handleForgotPasswordClick}
          >
            Esqueci minha senha
          </a>

          <button className={styles.buttonLogin} type="submit">
            Acessar
          </button>
        </form>
      </section>
      <ToastContainer /> {/* Componente para exibir as notificações */}
    </main>
  );
}

export default Login;
