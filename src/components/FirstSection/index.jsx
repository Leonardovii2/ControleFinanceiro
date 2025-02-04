import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import imgUsuarioLogado from "../../assets/Images/Perfil.svg";
import DateDisplay from "../DateDisplay";
import React, { useState, useEffect, useRef } from "react";
import GetInitialsContainer from "../Ultis/index";

export default function FirstSection({ atualizar }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const [nomeUsuario, setNomeUsuario] = useState("");

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible]);

  useEffect(() => {
    const nomeCompleto = localStorage.getItem("nomeUsuario") || "";
    setNomeUsuario(nomeCompleto.trim().split(" ")[0]); // Pega o primeiro nome
  }, [atualizar]);

  return (
    <header className={styles.container}>
      <div className={styles.titles}>
        <h1>Painel Financeiro</h1>
        <DateDisplay />
      </div>
      <div className={styles.usuLogado} ref={dropdownRef}>
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
