import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { checkAndStoreMonth } from "../../utils/checkNewMonth";
import dayjs from "dayjs";

export function useHome() {
  const [gastos, setGastos] = useState([]);
  const [totalGastos, setTotalGastos] = useState(0);
  const [saldoDisponivel, setSaldoDisponivel] = useState(0);
  const [salario, setSalario] = useState(0);
  const [gastoToEdit, setGastoToEdit] = useState(null);
  const [mostrarValor, setMostrarValor] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const mesAtual = useMemo(() => dayjs().startOf("month"), []);

  useEffect(() => {
    const valorSalvo = localStorage.getItem("mostrarValor");
    if (valorSalvo !== null) setMostrarValor(JSON.parse(valorSalvo));
  }, []);

  const replicarFixosSeNecessario = async () => {
    if (checkAndStoreMonth()) {
      await api.post("/gastos/replicar-fixos", null, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  };

  const fetchData = async () => {
    const [gastosRes, salarioRes] = await Promise.all([
      api.get(`/gastos/totalGastos?mes=${mesAtual.format("YYYY-MM")}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      api.get("/usuarios/salario", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    setTotalGastos(gastosRes.data.totalGastos || 0);
    setSalario(salarioRes.data.salario || 0);
  };

  const processarGastos = (gastos) => {
    let gastosExpandidos = [];

    gastos.forEach((gasto) => {
      if (gasto.fixo && gasto.parcelas > 1) {
        const dataCompra = dayjs(gasto.data_gasto).startOf("month");
        const diffMeses = mesAtual.diff(dataCompra, "month");

        if (diffMeses >= 0 && diffMeses < gasto.parcelas) {
          gastosExpandidos.push({
            ...gasto,
            id: `${gasto.id}-${diffMeses + 1}`,
            valor: gasto.valor / gasto.parcelas,
          });
        }
      } else {
        gastosExpandidos.push({
          ...gasto,
          valor:
            gasto.parcelas > 1 ? gasto.valor / gasto.parcelas : gasto.valor,
        });
      }
    });

    return gastosExpandidos;
  };

  const reloadData = async () => {
    const { data } = await api.get(
      `/gastos?mes=${mesAtual.format("YYYY-MM")}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    setGastos(processarGastos(data));
  };

  const handleDeleteGasto = async (id) => {
    const gastoId = typeof id === "string" ? id.split("-")[0] : id;
    await api.delete(`/gastos/${gastoId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    await reloadData();
    await fetchData();
  };

  const toggleValor = () => {
    setMostrarValor((prev) => {
      localStorage.setItem("mostrarValor", JSON.stringify(!prev));
      return !prev;
    });
  };

  useEffect(() => {
    async function carregarTudo() {
      await replicarFixosSeNecessario();
      await fetchData();
      await reloadData();
    }
    carregarTudo();
  }, []);

  useEffect(() => {
    setSaldoDisponivel(Number(salario) - Number(totalGastos));
  }, [salario, totalGastos]);

  const calcularInvestimentos = () =>
    gastos
      .filter((g) => g.categoria === "Investimento")
      .reduce((acc, g) => acc + Number(g.valor), 0);

  const formatCurrency = (value) =>
    typeof value === "number"
      ? `R$ ${value.toFixed(2).replace(".", ",")}`
      : "*****";

  const refreshGastos = async () => {
    const res = await api.get("/gastos", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setGastos(res.data);
  };
  return {
    gastos,
    totalGastos,
    saldoDisponivel,
    mostrarValor,
    toggleValor,
    formatCurrency,
    calcularInvestimentos,
    handleDeleteGasto,
    setGastoToEdit,
    setIsModalOpen,
    isModalOpen,
    gastoToEdit,
    getGastos: reloadData,
    getTotalGastos: fetchData,
  };
}
