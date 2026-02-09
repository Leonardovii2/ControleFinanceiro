import styles from "./styles.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RequestPassword() {
  const {
    email,
    setEmail,
    loading,
    handlePasswordResetRequest,
    returnToClick,
  } = useRequestPassword();

  return (
    <main className={styles.container}>
      <section className={styles.section}>
        <div className={styles.firstDiv}>
          <h1 className={styles.titulo}>Usar o email da sua conta</h1>
          <p className={styles.paragrafo}>
            Vamos enviar um link de recuperação de senha para o email da sua
            conta.
          </p>
        </div>

        <div className={styles.secondDiv}>
          <form className={styles.form} onSubmit={handlePasswordResetRequest}>
            <label className={styles.label} htmlFor="email">
              Digite seu email
            </label>
            <input
              className={styles.input}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
            <button className={styles.button} type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar"}
            </button>
            <button
              className={styles.returnToClick}
              type="button"
              onClick={returnToClick}
            >
              Voltar ao login
            </button>
          </form>
        </div>
      </section>
      <ToastContainer />
    </main>
  );
}
