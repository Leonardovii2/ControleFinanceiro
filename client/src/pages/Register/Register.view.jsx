import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./styles.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterView({
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
}) {
  return (
    <main className={styles.container}>
      <ToastContainer />

      <section className={styles.firstSection}>
        <h1>Crie sua conta</h1>
        <p>
          Cadastre-se e tenha controle total sobre suas finanças. Organize seus
          gastos de forma simples e rápida.
        </p>

        <button
          className={styles.buttonRegister}
          type="button"
          onClick={handleLoginClick}
        >
          Já tenho conta
        </button>
      </section>

      <section>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Cadastrar</h2>

          <label className={styles.label}>Nome completo</label>
          <input
            className={styles.input}
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
            required
          />

          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          <label className={styles.label}>Senha</label>
          <div style={{ position: "relative" }}>
            <input
              className={styles.input}
              type={mostrarSenha ? "text" : "password"}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Senha"
              required
            />
            <span className={styles.eyeIcon} onClick={togglePasswordVisibility}>
              {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
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
