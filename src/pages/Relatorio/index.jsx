import React, { useState } from "react";
import styles from "./styles.module.css";
import Navbar from "../../components/Navbar";
import FirstSection from "../../components/FirstSection";
import FiltroMensal from "../../components/Relatorio/filtroMensal";

export default function Perfil() {
  return (
    <div className={styles.container}>
      <Navbar />
      <FirstSection />
      <div className={styles.title}>
        <h2>Histórico Financeiro</h2>
      </div>
      <FiltroMensal />
    </div>
  );
}
