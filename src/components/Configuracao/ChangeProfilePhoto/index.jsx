import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function ChangeProfilePhotoSection({ atualizar }) {
  const [nomeUsuario, setNomeUsuario] = useState(
    localStorage.getItem("nomeUsuario") || ""
  );

  useEffect(() => {
    setNomeUsuario(localStorage.getItem("nomeUsuario") || "");
  }, [atualizar]);

  // Função para gerar as iniciais
  const getInitials = (name) => {
    if (!name) return "U"; // Se não houver nome, usa "U" de usuário
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase(); // Se for só um nome
    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase(); // Primeiro + Último
  };

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.profileContent}>
          <div className={styles.profileImage}>
            <div className={styles.avatar}>{getInitials(nomeUsuario)}</div>
          </div>
          <span className={styles.tamNome}>{nomeUsuario}</span>
        </div>
      </div>
    </section>
  );
}
