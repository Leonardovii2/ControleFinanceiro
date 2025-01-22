import React, { useState } from "react";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nome || !email || !senha) {
      toast.error("Por favor, preencha todos os campos!");
      return;
    }

    /* https://controlefinanceiro-dktx.onrender.com/usuarios/register */

    try {
      const response = await fetch("http://localhost:8801/register/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 409) {
          toast.error("E-mail já está em uso!");
        } else {
          toast.error("Erro ao cadastrar usuário!");
        }
        return;
      }

      const data = await response.json();
      console.log(data);
      toast.success("Cadastro realizado com sucesso!");

      // Resetar os campos do formulário
      setNome("");
      setEmail("");
      setSenha("");
      navigate("/login");
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Erro ao cadastrar usuário!");
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <main className={styles.main}>
      <section className={styles.sectionInfo}>
        <h1>Bem-vindo!</h1>
        <p>
          Cadastre-se e tenha controle total sobre suas finanças. Organize seus
          gastos e melhore seu planejamento em minutos.
        </p>
        <button className={styles.buttonCadastro} onClick={handleLoginClick}>
          Logar
        </button>
      </section>
      <section className={styles.sectionForm}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.titulo}>Cadastro</h2>
          <label className={styles.padding} htmlFor="nome">
            Nome
          </label>
          <input
            className={styles.input}
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label className={styles.padding} htmlFor="email">
            E-mail
          </label>
          <input
            className={styles.input}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className={styles.padding} htmlFor="">
            Senha
          </label>
          <input
            className={styles.input}
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button className={styles.buttonLogin} type="submit">
            Cadastrar
          </button>
        </form>
      </section>
    </main>
  );
}

export default Register;
