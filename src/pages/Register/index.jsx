import React, { useState } from "react";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Aqui você pode adicionar a lógica de validação e envio dos dados
    if (!nome || !email || !senha) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    fetch("http://localhost:8800/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, email, senha }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao cadastrar usuário");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        toast.success("Cadastro realizado com sucesso!"); // Exibe um toast de sucesso
        // Resetar os campos do formulário
        setNome("");
        setEmail("");
        setSenha("");
      })
      .catch((error) => {
        console.error("Erro:", error);
        toast.error("Erro ao cadastrar usuário!"); // Exibe um toast de erro
      });
  };

  const handleLoginClick = () => {
    navigate("/login"); // Redireciona para a página de registro
  };

  return (
    <main className={styles.main}>
      <section className={styles.sectionInfo}>
        <h1>Bem vindo!</h1>
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
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label className={styles.padding} htmlFor="email">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className={styles.padding} htmlFor="">
            Senha
          </label>
          <input
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
