import React from "react";
import styles from "./styles.module.css";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import UseRegister from "../../hooks/useRegister";

function Register() {
  const {
    nome,
    setNome,
    email,
    setEmail,
    senha,
    setSenha,
    mostrarSenha,
    togglePasswordVisibility,
    handleSubmit,
    handleLoginClick,
  } = UseRegister();

  return (
    <main className={styles.container}>
      <section className={styles.firstSection}>
        <h1>Bem-vindo!</h1>
        <p>
          Cadastre-se e tenha controle total sobre suas finanças. Organize seus
          gastos e melhore seu planejamento em poucos minutos.
        </p>
        <button className={styles.buttonCadastro} onClick={handleLoginClick}>
          Entrar
        </button>
      </section>

      <section className={styles.secondSection}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.titulo}>Cadastrar-se</h2>

          <label htmlFor="nome">Nome completo</label>
          <input
            className={styles.input}
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome completo"
          />

          <label htmlFor="email">E-mail</label>
          <input
            className={styles.input}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <label htmlFor="senha">Senha</label>

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

          <button className={styles.button} type="submit">
            Cadastrar
          </button>
        </form>
      </section>
    </main>
  );
}

export default Register;
