import DateDisplay from "../../components/DateDisplay";
import styles from "./styles.module.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import UserAvatar from "../UserAvatar";
import useLogin from "../../hooks/useLogin";

export default function FinancialDashboardHeader() {
  const { nomeLogado } = useLogin(); // Pegando o nome logado diretamente do hook
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Alterna a visibilidade do dropdown
  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev); // Alterna entre abrir e fechar
  };

  // Função de logout
  const handleLogout = () => {
    // Limpeza de informações armazenadas
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("nomeUsuario");
    sessionStorage.removeItem("nomeUsuario");
    localStorage.removeItem("rememberMe");

    // Redirecionamento e atualização da página
    navigate("/login");
    window.location.reload();
  };

  useEffect(() => {
    // Função que fecha o dropdown ao clicar fora
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false); // Fecha o dropdown se clicar fora
      }
    };

    // Adiciona o evento de clique fora se o dropdown estiver visível
    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Limpeza do evento quando o componente for desmontado ou dropdown mudar
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible]); // Depende da visibilidade do dropdown

  return (
    <section className={styles.firstSection}>
      <div>
        <h1>Painel Financeiro</h1>
        <DateDisplay />
      </div>

      <div className={styles.usuLogado}>
        <div
          className={styles.imgUsuarioLogado}
          onClick={toggleDropdown} // Alterna entre abrir e fechar o dropdown
        >
          <UserAvatar nome={nomeLogado || "Nome não disponível"} />
        </div>

        {isDropdownVisible && (
          <div className={styles.dropdownMenu} ref={dropdownRef}>
            <div className={styles.userInfo}>
              <p>{nomeLogado || "Nome não disponível"}</p>
              {/* Exibe o nome do usuário */}
            </div>
            <hr />
            <button className={styles.dropdownItem}>Aparência</button>
            <button onClick={handleLogout} className={styles.dropdownItem}>
              <FaSignOutAlt />
              <p>Sair</p>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
