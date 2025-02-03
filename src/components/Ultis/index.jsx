import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function GetInitialsContainer({ atualizar }) {
  const [nomeUsuario, setNomeUsuario] = useState(
    localStorage.getItem("nomeUsuario") || ""
  );

  useEffect(() => {
    setNomeUsuario(localStorage.getItem("nomeUsuario") || "");
  }, [atualizar]);

  const getInitials = (name) => {
    if (!name) return "U"; // Se não houver nome, usa "U" de usuário
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase(); // Se for só um nome
    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase(); // Primeiro + Último
  };
  return (
    <div className={styles.profileImage}>
      <div className={styles.avatar}>{getInitials(nomeUsuario)}</div>
    </div>
  );
}
