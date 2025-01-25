import React, { useState } from "react";
import styles from "./styles.module.css";
import Navbar from "../../components/Navbar";
import FirstSection from "../../components/FirstSection";
import ChangeProfilePhotoSection from "../../components/Configuracao/ChangeProfilePhoto";
import ChangeProfileNameSection from "../../components/Configuracao/ChangeProfileName";

export default function Configuracao() {
  const [atualizar, setAtualizar] = useState(false);
  return (
    <div className={styles.container}>
      <Navbar />
      <FirstSection atualizar={atualizar} />
      <div className={styles.secondSectionSettings}>
        <ChangeProfilePhotoSection atualizar={atualizar} />
        <ChangeProfileNameSection setAtualizar={setAtualizar} />
      </div>
    </div>
  );
}
