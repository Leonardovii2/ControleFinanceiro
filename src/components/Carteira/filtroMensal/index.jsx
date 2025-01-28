import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./styles.module.css";

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

export default function FiltroMensal() {
  const [gastos, setGastos] = useState([]);
  const [mesSelecionado, setMesSelecionado] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const mesAtual = new Date().toISOString().slice(0, 7);
    setMesSelecionado(mesAtual);
    fetchGastos(mesAtual);
  }, []);

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

        <div className={styles.listaGastos}>
          <h2>Gastos de {mesSelecionado}</h2>
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
                    <td>R$ {formatCurrency(Number(gasto.valor).toFixed(2))}</td>
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
