import React, { useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Corrigido para usar o parâmetro e

    const response = await fetch("http://localhost:8800/usuarios/login", { // URL corrigida
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    });

    if (response.ok) {
      const data = await response.json();
      // Armazenando o token e o nome do usuário no localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("nomeUsuario", data.nome); // Armazena o nome do usuário
      // Redirecionar para a página inicial ou outra lógica
      navigate("/home");
    } else {
      // Trate erros, como e-mail ou senha inválidos
      const error = await response.json();
      alert(error.message || "Erro ao fazer login");
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
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

          <a className={styles.padding} href="#">
            Esqueci minha senha
          </a>

          <button className={styles.buttonLogin} type="submit">
            Acessar
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
