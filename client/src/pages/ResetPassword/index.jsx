import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.css";

export default function ResetPassword() {
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    handleSubmit,
  } = UseResetPassword();

  return (
    <main className={styles.container}>
      <section className={styles.section}>
        <div className={styles.firstDiv}>
          <h1 className={styles.titulo}>Alterar senha!</h1>
        </div>
        <div className={styles.secondDiv}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label} htmlFor="new-password">
              Nova senha
            </label>
            <input
              className={styles.input}
              type="password"
              id="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className={styles.label} htmlFor="confirm-password">
              Confirmar senha
            </label>
            <input
              className={styles.input}
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button className={styles.button} type="submit" disabled={loading}>
              {loading ? "Alterando..." : "Alterar senha"}
            </button>
          </form>
        </div>
      </section>
      <ToastContainer />
    </main>
  );
}
