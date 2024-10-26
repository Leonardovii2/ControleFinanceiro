import React, { useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Defina o serviço aqui (exemplo: "gmail" ou "outlook")
  const service = "gmail"; // Você pode alterar isso ou torná-lo dinâmico

  const handlePasswordResetRequest = async (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário
    if (email) {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:8800/requestPassword/request",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, service }), // Adiciona a variável service
          }
        );

        if (response.ok) {
          const data = await response.json();
          toast.success(data.message); // Mensagem de sucesso
        } else {
          const errorData = await response.json();
          toast.error(errorData.message); // Mensagem de erro
        }
      } catch (error) {
        toast.error("Erro ao enviar a solicitação.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Por favor, insira um e-mail válido.");
    }
  };

  const returnToClick = () => {
    navigate("/login");
  };

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
              Digite seu e-mail
            </label>
            <input
              className={styles.input}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Digite seu e-mail"
            />
            <button className={styles.button} type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar"}
            </button>
            <a
              className={styles.returnToClick}
              onClick={returnToClick}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === "Enter" && returnToClick()} // Acessibilidade: permitir ativação por teclado
            >
              Voltar ao login
            </a>
          </form>
        </div>
      </section>
      <ToastContainer />
    </main>
  );
}
