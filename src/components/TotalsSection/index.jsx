import styles from "./styles.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios"; // Para fazer requisições

export default function TotalSection() {
  const [totalGastos, setTotalGastos] = useState(0);

  const fetchTotalGastos = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:8800/gastos/totalGastos",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTotalGastos(response.data.totalGastos);
    } catch (error) {
      console.error("Erro ao buscar total de gastos:", error.message);
    }
  };

  const fetchGastos = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:8800/gastos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGastos(response.data); // Atualiza a lista de gastos
    } catch (error) {
      console.error("Erro ao buscar gastos:", error.message);
    }
  };

  useEffect(() => {
    fetchTotalGastos();
    fetchGastos(); // Chama a função para buscar os gastos
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.h2}>Saldo disponível</h2>
        <p className={styles.saldo}>R$ </p>
      </div>
      <div className={styles.card}>
        <h2 className={styles.h2}>Saldo total gasto</h2>
        <p className={styles.saldo}>
          R$ {totalGastos.toFixed(2).replace(".", ",")}
        </p>{" "}
        {/* Exibindo totalGastos */}
      </div>
    </section>
  );
}
