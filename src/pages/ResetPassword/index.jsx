import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importando para navegar programaticamente
import styles from "./styles.module.css";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Obtenha o token da URL
  const token = new URLSearchParams(window.location.search).get("token");
  const navigate = useNavigate(); // Para redirecionar com o estado

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    // Adicionando validação de senha
    if (password.length < 8) {
      toast.error("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8801/resetPassword", {
        token,
        password,
      });

      if (response.status === 200) {
        // Redireciona para a página de login com um estado indicando sucesso
        navigate("/login", { state: { passwordReset: true } });
      }
    } catch (error) {
      console.error(
        "Erro ao alterar a senha:",
        error.response?.status,
        error.response?.data
      );
      const errorMessage =
        error.response?.data?.message || "Erro ao alterar a senha.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
