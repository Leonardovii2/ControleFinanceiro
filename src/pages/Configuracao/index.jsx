import React, { useState } from "react";
import styles from "./styles.module.css";
import Navbar from "../../components/Navbar";
import FirstSection from "../../components/FirstSection";
import ChangeProfilePhotoSection from "../../components/Configuracao/ChangeProfilePhoto";
import ChangeProfileNameSection from "../../components/Configuracao/ChangeProfileName";

export default function Configuracao() {
  return (
    <div className={styles.container}>
      <Navbar />
      <FirstSection />
      <div className={styles.secondSectionSettings}>
        <ChangeProfilePhotoSection />
        <ChangeProfileNameSection />
      </div>
    </div>
  );
}
