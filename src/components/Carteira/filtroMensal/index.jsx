import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./styles.module.css";

const formatDateForDisplay = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

export default function FiltroMensal() {
  const [gastos, setGastos] = useState([]);
  const [mesSelecionado, setMesSelecionado] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Definir mês atual como valor inicial
    const mesAtual = new Date().toISOString().slice(0, 7); // Formato YYYY-MM
    setMesSelecionado(mesAtual);
    fetchGastos(mesAtual);
  }, []);

  // Função para buscar os gastos do mês selecionado
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

  // Função chamada ao mudar o mês no seletor
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

          {/* Mostrar mensagem de carregamento enquanto os dados são buscados */}
          {loading ? (
            <p>Carregando...</p>
          ) : gastos.length === 0 ? ( // Verifica se a lista de gastos está vazia
            <p>Não possui gasto para o mês selecionado.</p>
          ) : (
            <ul className={styles.ul}>
              <div className={styles.ulContent}>
                <p>Data</p>
                <p>Descrição</p>
                <p>Categoria</p>
                <p>Valor</p>
              </div>

              {gastos.map((gasto) => (
                <li key={gasto.id}>
                  <span>{formatDateForDisplay(gasto.data_gasto.split("T")[0])}</span>
                  <span>{gasto.descricao}</span>
                  <span>{gasto.categoria}</span>
                  <span>R${Number(gasto.valor).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
