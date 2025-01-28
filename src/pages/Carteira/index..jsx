import React from "react";
import styles from "./styles.module.css";
import Navbar from "../../components/Navbar";
import FirstSection from "../../components/FirstSection";
import FiltroMensal from "../../components/Carteira/filtroMensal";

export default function Wallet() {
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
