import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import imgUsuarioLogado from "../../assets/Perfil.svg";
import DateDisplay from "../DateDisplay";
import React, { useState, useEffect } from "react";

export default function FirstSection() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const navigate = useNavigate(); // Para redirecionar no logout

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = () => {
    // Remover token do localStorage ou sessionStorage
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  useEffect(() => {
    const nome = localStorage.getItem("nomeUsuario");
    setNomeUsuario(nome || "Bem-vindo!");
  }, []);

  return (
    <header className={styles.container}>
      <div className={styles.titles}>
        <h1>Painel Financeiro</h1>
        <DateDisplay />
      </div>
      <div className={styles.usuLogado}>
        <img
          className={styles.imgUsuarioLogado}
          src={imgUsuarioLogado}
          alt="Perfil do usuário"
          onClick={toggleDropdown}
        />
        {isDropdownVisible && (
          <div className={styles.dropdownMenu}>
            <div className={styles.userInfo}>
              <p>{nomeUsuario}</p>
            </div>
            <hr />
            <button onClick={handleLogout} className={styles.dropdownItem}>
              Sair da conta
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
