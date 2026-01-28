import styles from "./styles.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

export default function LoginView({
  email,
  setEmail,
  senha,
  setSenha,
  mostrarSenha,
  togglePasswordVisibility,
  handleSubmit,
  handleRegisterClick,
  handleForgotPasswordClick,
}) {
  return (
    <main className={styles.container}>
      {/* ===== Texto lado esquerdo ===== */}
      <section className={styles.firstSection}>
        <h1>Bem-vindo 👋</h1>
        <p>
          Gerencie suas despesas de forma simples, rápida e segura. Tenha total
          controle da sua vida financeira em um só lugar.
        </p>

        <button
          className={styles.buttonRegister}
          type="button"
          onClick={handleRegisterClick}
        >
          Criar conta
        </button>
      </section>

      {/* ===== Formulário ===== */}
      <section>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Entrar</h2>

          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            placeholder="seuemail@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className={styles.label}>Senha</label>
          <div style={{ position: "relative" }}>
            <input
              className={styles.input}
              type={mostrarSenha ? "text" : "password"}
              placeholder="Sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <span className={styles.eyeIcon} onClick={togglePasswordVisibility}>
              {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
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
