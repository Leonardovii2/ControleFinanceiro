import { FaEye, FaEyeSlash, FaUser, FaLock, FaIdCard } from "react-icons/fa";
import styles from "./styles.module.css";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterView({
  nome,
  setNome,
  email,
  setEmail,
  senha,
  setSenha,
  mostrarSenha,
  setMostrarSenha,
  handleSubmit,
  handleLoginClick,
}) {
  return (
    <main className={styles.container}>
      <section className={styles.firstSection}>
        <h1>Crie sua conta</h1>
        <p>
          Cadastre-se e tenha controle total sobre suas finanças. Organize seus
          gastos de forma simples e rápida.
        </p>

        <button
          className={styles.buttonSecondary}
          type="button"
          onClick={handleLoginClick}
        >
          Já tenho conta
        </button>
      </section>

      <section>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Cadastrar</h2>

          <div className={styles.inputName}>
            <span className={styles.icon}>
              <FaIdCard />
            </span>
            <input
              className={styles.input}
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome"
              required
            />
          </div>

          <div className={styles.inputEmail}>
            <span className={styles.icon}>
              <FaUser />
            </span>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>

          <div className={styles.inputPassword}>
            <span className={styles.icon}>
              <FaLock />
            </span>
            <input
              type={mostrarSenha ? "text" : "password"}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Senha"
              required
            />

            <span
              className={styles.eye}
              onClick={() => setMostrarSenha(!mostrarSenha)}
            >
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
