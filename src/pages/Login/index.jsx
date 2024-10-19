import React, { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { toast } from "react-toastify"; // Importa toast

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8800/usuarios/login", { // URL atualizada
        email,
        senha,
      });

      if (res.status === 200) {
        toast.success("Login bem-sucedido!");
        navigate("/home"); // Redireciona para a página Home
      }
    } catch (error) {
      console.error("Erro ao fazer login", error);
      toast.error("Erro no login. Verifique suas credenciais.");
    }
  };

  const handleRegisterClick = () => {
    navigate("/register"); // Redireciona para a página de registro
  };

  return (
    <main className={styles.main}>
      <section className={styles.sectionInfo}>
        <h1>Bem vindo!</h1>
        <p>
          Gerencie suas despesas de forma rápida e simples. Sem enrolação, o
          melhor sistema para organizar suas finanças.
        </p>
        <button className={styles.buttonCadastro} onClick={handleRegisterClick} type="submit">Cadastrar</button>
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
          />

          <label className={styles.padding} htmlFor="senha">
            Senha
          </label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
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
