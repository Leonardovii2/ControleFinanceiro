import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./styles.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import useLogin from "../../assets/Hooks/useLogin";

function Login() {
  const {
    email,
    setEmail,
    senha,
    setSenha,
    mostrarSenha,
    togglePasswordVisibility,
    handleSubmit,
    handleRegisterClick,
    handleForgotPasswordClick,
  } = useLogin();

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
            className={styles.input}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className={styles.padding} htmlFor="senha">
            Senha
          </label>
          <div style={{ position: "relative", width: "100%" }}>
            <input
              className={styles.input}
              type={mostrarSenha ? "text" : "password"}
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              style={{ paddingRight: "40px" }}
            />
            <span
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "10px",
                top: "55%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#555",
              }}
            >
              {mostrarSenha ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>

          <button
            type="button"
            className={styles.esqueciSenha}
            onClick={handleForgotPasswordClick}
          >
            Esqueci minha senha
          </button>

          <button className={styles.buttonLogin} type="submit">
            Acessar
          </button>
        </form>
      </section>
      <ToastContainer />
    </main>
  );
}

export default Login;
