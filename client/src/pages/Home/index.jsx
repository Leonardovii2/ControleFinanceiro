import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Grid from "../../../src/components/Grid";
import ExpensesByCategory from "../../components/ExpensesByCategory";
import styles from "./styles.module.css";
import FirstIconeNovo from "../../assets/Images/1IconeNovo.svg";
import SecondIconeNovo from "../../assets/Images/2IconeNovo.svg";
import ThirdIconeNovo from "../../assets/Images/3IconeNovo.svg";
import { FaEye, FaEyeSlash, FaPlus } from "react-icons/fa";
import AdicionarGasto from "../../components/ExpenseFormModal";
import Navbar from "../../components/Navbar/index";
import FinancialDashboardHeader from "../../components/FinancialDashboardHeader";
import { checkAndStoreMonth } from "../../utils/checkNewMonth";
import dayjs from "dayjs";

const Home = () => {
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
      try {
        await api.post("/gastos/replicar-fixos", null, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error("Erro ao replicar gastos fixos:", error);
      }
    }
  };

  const fetchData = async () => {
    try {
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
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setTotalGastos(0);
      setSalario(0);
    }
  };

  const processarGastos = (gastos) => {
    let gastosExpandidos = [];

    gastos.forEach((gasto) => {
      if (gasto.fixo && gasto.parcelas && gasto.parcelas > 1) {
        const dataCompra = dayjs(gasto.data_gasto).startOf("month");
        const diffMeses = mesAtual.diff(dataCompra, "month");

        if (diffMeses >= 0 && diffMeses < gasto.parcelas) {
          gastosExpandidos.push({
            ...gasto,
            id: `${gasto.id}-${diffMeses + 1}`,
            parcelaAtual: diffMeses + 1,
            data_gasto: mesAtual.toISOString(),
            valor: gasto.valor / gasto.parcelas,
          });
        }
      } else {
        gastosExpandidos.push({
          ...gasto,
          valor:
            gasto.parcelas && gasto.parcelas > 1
              ? gasto.valor / gasto.parcelas
              : gasto.valor,
        });
      }
    });

    return gastosExpandidos;
  };

  const reloadData = async () => {
    try {
      const { data } = await api.get(
        `/gastos?mes=${mesAtual.format("YYYY-MM")}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const gastosProcessados = processarGastos(data);
      setGastos(gastosProcessados);
    } catch (error) {
      console.error("Erro ao buscar gastos:", error);
      alert("Não foi possível carregar os gastos. Tente novamente.");
    }
  };

  const handleDeleteGasto = async (id) => {
    const gastoId = typeof id === "string" ? id.split("-")[0] : id;

    try {
      await api.delete(`/gastos/${gastoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await reloadData();
      await fetchData();
    } catch (error) {
      console.error("Erro ao excluir gasto:", error);
      alert("Não foi possível excluir o gasto. Tente novamente.");
    }
  };

  const toggleValor = () => {
    const novoValor = !mostrarValor;
    setMostrarValor(novoValor);
    localStorage.setItem("mostrarValor", JSON.stringify(novoValor));
  };

  useEffect(() => {
    async function carregarTudo() {
      await replicarFixosSeNecessario();
      await fetchData();
      await reloadData();
    }
    carregarTudo();
  }, [mesAtual, token]);

  useEffect(() => {
    setSaldoDisponivel(Number(salario) - Number(totalGastos));
  }, [salario, totalGastos]);

  const handleAddGastoClick = () => {
    setGastoToEdit(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const formatCurrency = (value) =>
    typeof value === "number" && !isNaN(value)
      ? `R$ ${value.toFixed(2).replace(".", ",")}`
      : "*****";

  const calcularInvestimentos = () => {
    return gastos
      .filter((gasto) => gasto.categoria === "Investimento")
      .reduce((acc, gasto) => acc + Number(gasto.valor), 0);
  };

  return (
    <main className={styles.container}>
      <section>
        <Navbar />
        <FinancialDashboardHeader />
      </section>

      <section className={styles.containerFirstSection}>
        <div className={styles.miniMenu}>
          <h2>Resumo</h2>
          <button className={styles.eyeButton} onClick={toggleValor}>
            {mostrarValor ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className={styles.cardWrapper}>
          <div className={styles.containerCard}>
            <div className={styles.content}>
              <img className={styles.icone} src={FirstIconeNovo} />
              <h2>Total gasto</h2>
            </div>
            <div className={styles.divP}>
              <p>{mostrarValor ? formatCurrency(totalGastos) : "*****"}</p>
            </div>
          </div>

          <div className={styles.containerCard}>
            <div className={styles.content}>
              <img className={styles.icone} src={SecondIconeNovo} />
              <h2>Saldo disponível</h2>
            </div>
            <div className={styles.divP}>
              <p>{mostrarValor ? formatCurrency(saldoDisponivel) : "*****"}</p>
            </div>
          </div>

          <div className={styles.containerCard}>
            <div className={styles.content}>
              <img className={styles.icone} src={ThirdIconeNovo} />
              <h2>Valor investido</h2>
            </div>
            <div className={styles.divP}>
              <p>
                {mostrarValor
                  ? formatCurrency(calcularInvestimentos())
                  : "*****"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.secondSection}>
        <div className={styles.contentGrid}>
          <div className={styles.gridSection}>
            <div className={styles.firstRow}>
              <h2>Transações</h2>
              <button
                className={styles.addButton}
                onClick={handleAddGastoClick}
              >
                <FaPlus />
                Adicionar
              </button>
            </div>
            <Grid
              gastos={gastos}
              setGastoToEdit={setGastoToEdit}
              setIsModalOpen={setIsModalOpen}
              handleDeleteGasto={handleDeleteGasto}
              mostrarValor={mostrarValor}
            />
          </div>

          <div className={styles.graphSection}>
            <h2>Gastos por Categoria</h2>
            <ExpensesByCategory gastos={gastos} />
          </div>
        </div>

        {isModalOpen && (
          <AdicionarGasto
            onEdit={gastoToEdit}
            setGastoToEdit={setGastoToEdit}
            getGastos={reloadData}
            getTotalGastos={fetchData}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
          />
        )}
      </section>
    </main>
  );
};

export default Home;
