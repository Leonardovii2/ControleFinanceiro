import styles from "./styles.module.css";
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import FirstIconeNovo from "../../assets/Images/1IconeNovo.svg";
import SecondIconeNovo from "../../assets/Images/2IconeNovo.svg";
/* import ThirdIconeNovo from "../../assets/images/3IconeNovo.svg"; */
import InformationCard from "../InformationCard";

export default function TotalSection({ atualizar }) {
  const [totalGastos, setTotalGastos] = useState(0);
  const [saldoDisponivel, setSaldoDisponivel] = useState(0);
  const [salario, setSalario] = useState(0);

  const fetchTotalGastos = async () => {
    const token = localStorage.getItem("token");
    const mesAtual = new Date().toISOString().slice(0, 7); // Obtém o mês no formato YYYY-MM

    try {
      const response = await api.get(`/gastos/totalGastos?mes=${mesAtual}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTotalGastos(response.data.totalGastos || 0);
    } catch (error) {
      console.error("Erro ao buscar total de gastos:", error.message);
      setTotalGastos(0);
    }
  };

  const fetchSalario = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await api.get("/usuarios/salario", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSalario(response.data.salario || 0);
    } catch (error) {
      console.error("Erro ao buscar salário:", error.message);
      setSalario(0);
    }
  };

  useEffect(() => {
    fetchTotalGastos();
    fetchSalario();
  }, [atualizar]);

  // Atualiza o saldo disponível sempre que o salário ou total de gastos mudarem
  useEffect(() => {
    setSaldoDisponivel(salario - totalGastos);
  }, [salario, totalGastos]);

  return (
    <section className={styles.container}>
      <div className={styles.cardWrapper}>
        <InformationCard
          image={FirstIconeNovo}
          title="Saldo total gasto"
          value={totalGastos.toFixed(2).replace(".", ",")}
        />

        <InformationCard
          image={SecondIconeNovo}
          title="Saldo disponível"
          value={saldoDisponivel.toFixed(2).replace(".", ",")}
        />
      </div>
    </section>
  );
}
