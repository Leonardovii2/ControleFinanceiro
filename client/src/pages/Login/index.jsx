import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./styles.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useLogin from "../../hooks/useLogin";

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
    <main className={styles.container}>
      <ToastContainer />
      <section className={styles.firstSection}>
        <h1>Bem-vindo!</h1>
        <p>
          Gerencie suas despesas de forma rápida e simples. Sem complicação, o
          melhor sistema para organizar suas finanças.
        </p>
        <button
          className={styles.buttonRegister}
          onClick={handleRegisterClick}
          type="button"
        >
          Cadastrar-se
        </button>
      </section>

      <section className={styles.secondSection}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Entrar</h2>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            className={styles.input}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          <label className={styles.label} htmlFor="senha">
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
              placeholder="Senha"
            />
            <span
              onClick={togglePasswordVisibility}
              className={styles.eyeIcon}
              style={
                {
                  /* position: "absolute",
                right: "10px",
                display: "flex",
                alignItems: "center",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#555", */
                }
              }
            >
              {mostrarSenha ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>

          <button
            type="button"
            className={styles.esqueciSenha}
            onClick={handleForgotPasswordClick}
          >
            Esqueceu sua senha?
          </button>

          <button className={styles.button} type="submit">
            Entrar
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
