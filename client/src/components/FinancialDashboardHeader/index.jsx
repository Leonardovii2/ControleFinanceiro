import DateDisplay from "../../components/DateDisplay";
import styles from "./styles.module.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function FinancialDashboardHeader() {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  // Função para alternar a visibilidade do dropdown
  const toggleDropdown = () => setIsDropdownVisible((prev) => !prev);

  // Função de logout
  const handleLogout = () => {
    // Limpeza de informações armazenadas
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("nomeUsuario");
    sessionStorage.removeItem("nomeUsuario");
    localStorage.removeItem("rememberMe");

    // Redirecionamento para a página de login
    navigate("/login");
    window.location.reload(); // Garante que o estado seja atualizado corretamente
  };

  // Função para obter as iniciais do nome
  const getInitials = (name) => {
    if (!name) return "U"; // Se não houver nome, usa "U" de usuário
    const words = name.trim().split(" ");
    return words.length > 1
      ? `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase() // Primeiro + Último
      : words[0][0].toUpperCase(); // Se for só um nome
  };

  useEffect(() => {
    const nomeCompleto = localStorage.getItem("nomeUsuario") || "";
    setNomeUsuario(nomeCompleto); // Define o nome no estado
    // Adiciona evento de clique fora para fechar o dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    // Controla o estado do dropdown
    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Limpeza do evento quando o componente for desmontado
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible]);
  return (
    <section className={styles.firstSection}>
      <div>
        <h1>Painel Financeiro</h1>
        <DateDisplay />
      </div>

      <div className={styles.usuLogado}>
        <div className={styles.imgUsuarioLogado} onClick={toggleDropdown}>
          <div className={styles.avatar}>{getInitials(nomeUsuario)}</div>
        </div>

        {isDropdownVisible && (
          <div className={styles.dropdownMenu} ref={dropdownRef}>
            <div className={styles.userInfo}>
              <p>{nomeUsuario || "Nome não disponível"}</p>
            </div>
            <hr />
            <button onClick={handleLogout} className={styles.dropdownItem}>
              Sair da conta
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
