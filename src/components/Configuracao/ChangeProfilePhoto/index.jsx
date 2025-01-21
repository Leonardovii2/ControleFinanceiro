import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function ChangeProfilePhotoSection() {
  const [nomeUsuario, setNomeUsuario] = useState("");

  useEffect(() => {
    const nome = localStorage.getItem("nomeUsuario");
    setNomeUsuario(nome);
  });

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
