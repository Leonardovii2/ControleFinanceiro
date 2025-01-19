import styles from "./styles.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FirstIconeNovo from "../../assets/1iconeNovo.svg";
import SecondIconeNovo from "../../assets/2iconeNovo.svg";
import ThirdIconeNovo from "../../assets/3iconeNovo.svg";

export default function TotalSection({ atualizar }) {
  const [totalGastos, setTotalGastos] = useState(0);
  const [saldoDisponivel, setSaldoDisponivel] = useState(0);
  const [saldoInvestido, setSaldoInvestido] = useState(0);

  const fetchTotalGastos = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:8801/gastos/totalGastos",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTotalGastos(response.data.totalGastos || 0);
    } catch (error) {
      console.error("Erro ao buscar total de gastos:", error.message);
      setTotalGastos(0);
    }
  };

  useEffect(() => {
    fetchTotalGastos();
  }, [atualizar]);

  return (
    <section className={styles.container}>
  <div className={styles.cardWrapper}>
    <article className={`${styles.card} ${styles.firstCard}`}>
      <img
        className={styles.icone}
        src={FirstIconeNovo}
        alt="Ícone de total de gastos"
      />
      <h2 className={styles.h2}>Saldo total gasto</h2>
      <p className={styles.saldo}>
        R$ {totalGastos.toFixed(2).replace(".", ",")}
      </p>
    </article>

    <article className={styles.card}>
      <img
        className={styles.icone}
        src={SecondIconeNovo}
        alt="Ícone de saldo disponível"
      />
      <h2 className={styles.h2}>Saldo disponível</h2>
      <p className={styles.saldo}>
        R$ {saldoDisponivel.toFixed(2).replace(".", ",")}
      </p>
    </article>

    <article className={styles.card}>
      <img
        className={styles.icone}
        src={ThirdIconeNovo}
        alt="Ícone de saldo investido"
      />
      <h2 className={styles.h2}>Saldo investido</h2>
      <p className={styles.saldo}>
        R$ {saldoInvestido.toFixed(2).replace(".", ",")}
      </p>
    </article>
  </div>
</section>


  );
}
