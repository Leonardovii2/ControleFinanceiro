import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function useMonthlyFilter() {
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
      toast.error("Você precisa estar logado.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.get(
        `http://localhost:8801/gastos?mes=${mes}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGastos(data);
    } catch (error) {
      toast.error("Erro ao carregar os gastos.");
      console.error("Erro ao buscar gastos:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSalario = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get(
        "http://localhost:8801/usuarios/salario",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSalario(data.salario || 0);
    } catch (error) {
      console.error("Erro ao buscar salário:", error);
      setSalario(0);
    }
  };

  const handleMesChange = (e) => {
    const novoMes = e.target.value;
    setMesSelecionado(novoMes);
    fetchGastos(novoMes);
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const formatDateForDisplay = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  return {
    gastos,
    mesSelecionado,
    loading,
    saldoTotalGasto,
    saldoDisponivel,
    handleMesChange,
    formatCurrency,
    formatDateForDisplay,
  };
}
