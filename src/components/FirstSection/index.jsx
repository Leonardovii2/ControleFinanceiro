import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import imgUsuarioLogado from "../../assets/Perfil.svg";
import DateDisplay from "../DateDisplay";
import React, { useState } from "react";

export default function FirstSection() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate(); // Para redirecionar no logout

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = () => {
    // Remover token do localStorage ou sessionStorage
    localStorage.removeItem("authToken"); // ou sessionStorage.removeItem('authToken');

    // Redirecionar para a página de login
    navigate("/login"); // Usando useNavigate para redirecionamento
  };

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
              <p>Leonardo Viana</p>
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
