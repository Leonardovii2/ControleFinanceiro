import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function ChangeProfilePhotoSection({ atualizar }) {
  const [nomeUsuario, setNomeUsuario] = useState(
    localStorage.getItem("nomeUsuario")
  );

  useEffect(() => {
    setNomeUsuario(localStorage.getItem("nomeUsuario"));
  }, [atualizar]);

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.profileContent}>
          <div className={styles.profileImage}>
            <img src="#" alt="" />
          </div>
          <span className={styles.tamNome}>{nomeUsuario}</span>
        </div>

        <button type="button" className={styles.changePhotoButton}>
          Alterar foto
        </button>
      </div>
    </section>
  );
}
