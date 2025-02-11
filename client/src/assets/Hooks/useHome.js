import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api";

export default function useHome() {
  const [gastos, setGastos] = useState([]);
  const [atualizar, setAtualizar] = useState(false);
  const [onEdit, setOnEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const getGastos = async () => {
    const token = localStorage.getItem("token");
    const mes = new Date().toISOString().slice(0, 7);

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const { data } = await api.get(`/gastos?mes=${mes}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGastos(data);
    } catch (error) {
      console.error("Erro ao buscar gastos:", error);
      alert("Não foi possível carregar os gastos. Tente novamente.");
    }
  };

  useEffect(() => {
    if (atualizar) {
      getGastos();
      setAtualizar(false); // Reseta a flag após atualizar
    }
  }, [atualizar]);

  return {
    gastos,
    atualizar,
    setAtualizar,
    onEdit,
    setOnEdit,
    isModalOpen,
    setIsModalOpen,
    getGastos,
    setGastos,
  };
}
