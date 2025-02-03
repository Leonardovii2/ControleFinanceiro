import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./styles.module.css";
import InformationCard from "../../InformationCard";
import axios from "axios";

import FirstIconeNovo from "../../../assets/1IconeNovo.svg";
import SecondIconeNovo from "../../../assets/2IconeNovo.svg";

const formatDateForDisplay = (date) => {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const formatarMesAno = (mesSelecionado) => {
  const [ano, mes] = mesSelecionado.split("-"); // Divide a string "YYYY-MM"
  return `${mes}-${ano}`; // Retorna no formato "MM-YYYY"
};

export default function FiltroMensal() {
  const [gastos, setGastos] = useState([]);
  const [mesSelecionado, setMesSelecionado] = useState("");
  const [loading, setLoading] = useState(false);
  const [saldoTotalGasto, setSaldoTotalGasto] = useState(0);
  const [salario, setSalario] = useState(0);
  const [saldoDisponivel, setSaldoDisponivel] = useState(0);

  useEffect(() => {
    const mesAtual = new Date().toISOString().slice(0, 7);
    setMesSelecionado(mesAtual);
    fetchSalario();
    fetchGastos(mesAtual);
  }, []);

  useEffect(() => {
    const total = gastos.reduce((acc, gasto) => acc + Number(gasto.valor), 0);
    setSaldoTotalGasto(total);
    setSaldoDisponivel(salario - total);
  }, [gastos, salario]);

  const fetchGastos = async (mes) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8801/gastos?mes=${mes}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao carregar os dados.");
      }

      const data = await response.json();
      setGastos(data);
    } catch (error) {
      toast.error("Erro ao carregar os gastos.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSalario = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:8801/usuarios/salario", {
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

  const handleMesChange = (e) => {
    const novoMes = e.target.value;
    setMesSelecionado(novoMes);
    fetchGastos(novoMes);
  };

  return (
    <div className={styles.carteiraContainer}>
      <div className={styles.content}>
        <div className={styles.seletorMes}>
          <label>Selecione o mês</label>
          <input
            type="month"
            value={mesSelecionado}
            onChange={handleMesChange}
            className={styles.inputMes}
          />
        </div>

        <section className={styles.totalsInformationSection}>
          <InformationCard
            
            title="Gasto do mês"
            value={formatCurrency(saldoTotalGasto)}
          />
          <InformationCard
            
            title="Saldo do mês"
            value={formatCurrency(saldoDisponivel)}
          />
        </section>

        <div className={styles.listaGastos}>
          <h2>Gastos de {formatarMesAno(mesSelecionado)}</h2>
          {loading ? (
            <p>Carregando...</p>
          ) : gastos.length === 0 ? (
            <p>Não possui gasto para o mês selecionado.</p>
          ) : (
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th>Data</th>
                  <th>Descrição</th>
                  <th>Categoria</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {gastos.map((gasto) => (
                  <tr key={gasto.id}>
                    <td>
                      {formatDateForDisplay(gasto.data_gasto.split("T")[0])}
                    </td>
                    <td>{gasto.descricao}</td>
                    <td>{gasto.categoria}</td>
                    <td>{formatCurrency(Number(gasto.valor).toFixed(2))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
