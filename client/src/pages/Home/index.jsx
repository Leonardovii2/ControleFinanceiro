import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import TotalSection from "../../components/SecondSection";
import Grid from "../../components/Grid";
import Modal from "../../components/Form";
import ExpensesByCategory from "../../components/ExpensesByCategory";
import styles from "./styles.module.css";

// Função para verificar se o token expirou
const isTokenExpired = (token) => {
  try {
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    return exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

const Home = () => {
  const [gastos, setGastos] = useState([]);
  const [total, setTotal] = useState(0); // Estado para o total de gastos
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gastoToEdit, setGastoToEdit] = useState(null);
  const navigate = useNavigate();

  const checkToken = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      navigate("/login");
      return false;
    }
    return true;
  }, [navigate]);

  const getGastos = useCallback(async () => {
    if (!checkToken()) return;

    const mes = new Date().toISOString().slice(0, 7);
    try {
      const { data } = await api.get(`/gastos?mes=${mes}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setGastos(data);
    } catch (error) {
      console.error("Erro ao buscar gastos:", error);
      alert("Não foi possível carregar os gastos. Tente novamente.");
    }
  }, [checkToken]);

  // Função para buscar o total de gastos
  const getTotalGastos = useCallback(async () => {
    if (!checkToken()) return;

    try {
      const mes = new Date().toISOString().slice(0, 7);
      const { data } = await api.get(`/gastos/totalGastos?mes=${mes}`, {
        // Ajuste da rota aqui
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setTotal(data.totalGastos); // Atualiza o estado do total de gastos
    } catch (error) {
      console.error("Erro ao buscar total de gastos:", error);
    }
  }, [checkToken]);

  // Abre o modal
  const handleAddGastoClick = () => {
    setGastoToEdit(null);
    setIsModalOpen(true);
  };

  useEffect(() => {
    getGastos();
    getTotalGastos(); // Chama para atualizar o total de gastos
  }, [getGastos, getTotalGastos]);

  return (
    <main className={styles.container}>
      <section>
        <TotalSection total={total} />
      </section>

      <section className={styles.secondSection}>
        <div className={styles.firstRow}>
          <h2>Transações</h2>
          <button className={styles.addButton} onClick={handleAddGastoClick}>
            Adicionar Gasto
          </button>
        </div>

        <div className={styles.secondRow}>
          <Grid
            gastos={gastos}
            setGastos={setGastos}
            getGastos={getGastos}
            setGastoToEdit={setGastoToEdit}
            setIsModalOpen={setIsModalOpen}
          />

          {isModalOpen && (
            <Modal
              onEdit={gastoToEdit}
              setGastoToEdit={setGastoToEdit}
              getGastos={getGastos}
              getTotalGastos={getTotalGastos}
              setIsModalOpen={setIsModalOpen}
            />
          )}
          <ExpensesByCategory gastos={gastos} />
        </div>
      </section>
    </main>
  );
};

export default Home;
