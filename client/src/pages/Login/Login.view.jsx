import styles from "./styles.module.css";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";

export default function LoginView({
  email,
  setEmail,
  senha,
  setSenha,
  mostrarSenha,
  setMostrarSenha,
  handleSubmit,
  handleRegisterClick,
}) {
  return (
    <main className={styles.container}>
      <section className={styles.firstSection}>
        <h1>Gestão Financeira</h1>
        <p>
          Organize seus gastos, acompanhe seus investimentos e tenha clareza
          total da sua vida financeira em um só lugar.
        </p>

        <button
          type="button"
          className={styles.buttonSecondary}
          onClick={handleRegisterClick}
        >
          Criar conta
        </button>
      </section>

      <section className="secontSecond">
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Entrar</h2>

          <div className={styles.inputEmail}>
            <span className={styles.icon}>
              <FaUser />
            </span>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputPassword}>
            <span className={styles.icon}>
              <FaLock />
            </span>
            <input
              type={mostrarSenha ? "text" : "password"}
              placeholder="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

            <span
              className={styles.eye}
              onClick={() => setMostrarSenha(!mostrarSenha)}
            >
              {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="button" className={styles.forgotPassword}>
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
