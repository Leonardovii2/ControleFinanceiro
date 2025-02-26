import React from "react";
import styles from "./styles.module.css";
import Navbar from "../../components/Navbar";
import FiltroMensal from "../../components/Relatorio/MonthlyFilter";

export default function Report() {
  return (
    <div className={styles.container}>
      <Navbar />

      <section className={styles.monthlyReportSection}>
        <h2 className={styles.title}>Relátorio Mensal</h2>
        <FiltroMensal />
      </section>
    </div>
  );
}
