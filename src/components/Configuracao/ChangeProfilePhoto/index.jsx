import { useState, useEffect } from "react";
import GetInitialsContainer from "../../GetInitials/index";
import styles from "./styles.module.css";

export default function ChangeProfilePhotoSection({ atualizar }) {
  const [nomeUsuario, setNomeUsuario] = useState(
    localStorage.getItem("nomeUsuario") || ""
  );

  useEffect(() => {
    setNomeUsuario(localStorage.getItem("nomeUsuario") || "");
  }, [atualizar]); // Quando atualizar mudar, recarrega o nome

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.profileContent}>
          <div className={styles.profileImage}>
            <GetInitialsContainer atualizar={atualizar} />
          </div>
          <span className={styles.tamNome}>{nomeUsuario}</span>
        </div>
      </div>
    </section>
  );
}
