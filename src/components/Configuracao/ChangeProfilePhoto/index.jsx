import { useState } from "react";
import GetInitialsContainer from "../../Ultis/index";
import styles from "./styles.module.css";

export default function ChangeProfilePhotoSection() {
  const [nomeUsuario, setNomeUsuario] = useState(
    localStorage.getItem("nomeUsuario") || ""
  );
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.profileContent}>
          <div className={styles.profileImage}>
            <GetInitialsContainer atualizar={true} />
          </div>
          <span className={styles.tamNome}>{nomeUsuario}</span>
        </div>
      </div>
    </section>
  );
}
