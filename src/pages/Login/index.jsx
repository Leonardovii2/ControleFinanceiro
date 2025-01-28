import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // ✅ Importando os ícones
import styles from "./styles.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.passwordReset) {
      toast.success("Senha alterada com sucesso!");
    }
  }, [location.state]);

  const togglePasswordVisibility = () => {
    setMostrarSenha((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8801/login/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("nomeUsuario", data.nome);
      navigate("/home");
    } else {
      const error = await response.json();
      toast.error(error.message || "Erro ao fazer login");
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleForgotPasswordClick = () => {
    navigate("/requestPassword");
  };

  return (
    <main className={styles.main}>
      <section className={styles.sectionInfo}>
        <h1>Bem-vindo!</h1>
        <p>
          Gerencie suas despesas de forma rápida e simples. Sem enrolação, o
          melhor sistema para organizar suas finanças.
        </p>
        <button
          className={styles.buttonCadastro}
          onClick={handleRegisterClick}
          type="button"
        >
          Cadastrar
        </button>
      </section>
      <section className={styles.sectionForm}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.titulo}>Login</h2>
          <label className={styles.padding} htmlFor="email">
            E-mail
          </label>
          <input
            className={styles.input}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className={styles.padding} htmlFor="senha">
            Senha
          </label>
          {/* 🔹 Envolvendo o input e o ícone dentro de um div */}
          <div style={{ position: "relative", width: "100%" }}>
            <input
              className={styles.input}
              type={mostrarSenha ? "text" : "password"}
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              style={{ paddingRight: "40px" }} // 🔹 Espaço para o ícone
            />
            <span
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#555",
              }}
            >
              {mostrarSenha ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>

          <a
            className={styles.esqueciSenha}
            onClick={handleForgotPasswordClick}
          >
            Esqueci minha senha
          </a>

          <button className={styles.buttonLogin} type="submit">
            Acessar
          </button>
        </form>
      </section>
      <ToastContainer />
    </main>
  );
}

export default Login;
