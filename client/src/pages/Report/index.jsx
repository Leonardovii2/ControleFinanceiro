import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import SecondIconeNovo from "../../assets/Images/2IconeNovo.svg";
import api from "../../services/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaFilePdf, FaDownload } from "react-icons/fa";
import Navbar from "../../components/Navbar/index";
import FinancialDashboardHeader from "../../components/FinancialDashboardHeader";

const BaixarButton = () => {
  return (
    <button className="btn-baixar">
      <FaFilePdf style={{ marginRight: "8px" }} />
      Baixar Relatório
      <FaDownload style={{ marginLeft: "8px" }} />
    </button>
  );
};

export default function Report() {
  const [gastos, setGastos] = useState([]);
  const [mesSelecionado, setMesSelecionado] = useState("");
  const [salario, setSalario] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const mesSalvo = localStorage.getItem("mesSelecionado");
    if (mesSalvo) {
      setMesSelecionado(mesSalvo);
    } else {
      const mesAtual = new Date().toISOString().slice(0, 7);
      setMesSelecionado(mesAtual);
    }

    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Você precisa estar logado.");
        return;
      }

      setLoading(true);
      try {
        const [salarioRes, gastosRes] = await Promise.all([
          api.get("/usuarios/salario", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get(`/gastos?mes=${mesSelecionado}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setSalario(salarioRes.data.salario || 0);
        setGastos(gastosRes.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        toast.error("Erro ao carregar os dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mesSelecionado]);

  const fetchGastos = async (mes) => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Você precisa estar logado.");

    setLoading(true);
    try {
      const { data } = await api.get(`/gastos?mes=${mes}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGastos(data);
    } catch (error) {
      console.error("Erro ao buscar gastos:", error);
      toast.error("Erro ao carregar os gastos.");
    } finally {
      setLoading(false);
    }
  };

  const handleMesChange = (e) => {
    const novoMes = e.target.value;
    localStorage.setItem("mesSelecionado", novoMes);
    setMesSelecionado(novoMes);
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const formatDateForDisplay = (date) => {
    if (!date) return "-";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const formatarMes = (mes) => {
    const [ano, numeroMes] = mes.split("-");
    const nomesMeses = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    return `${nomesMeses[parseInt(numeroMes, 10) - 1]} de ${ano}`;
  };

  const gerarPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Relatório de Gastos", 14, 20);

    // Informações principais
    doc.setFontSize(12);
    doc.text(`Mês selecionado: ${formatarMes(mesSelecionado)}`, 14, 30);
    doc.text(`Salário: ${formatCurrency(salario)}`, 14, 38);
    doc.text(`Gasto Total do Mês: ${formatCurrency(saldoTotalGasto)}`, 14, 46);
    doc.text(
      `Saldo Disponível (Sobrou): ${formatCurrency(saldoDisponivel)}`,
      14,
      54
    );

    // Tabela de gastos com parcelas no formato 1/x
    const tableData = gastos.map((gasto) => [
      formatDateForDisplay(gasto.data_gasto?.split("T")[0]),
      gasto.descricao,
      gasto.categoria,
      formatCurrency(gasto.valor),
      gasto.metodo,
      gasto.parcelas > 1 ? `1/${gasto.parcelas}` : "-", // formato 1/x ou "-"
    ]);

    autoTable(doc, {
      head: [
        ["Data", "Descrição", "Categoria", "Valor", "M. Pagamento", "Parcelas"],
      ],
      body: tableData,
      startY: 65,
      theme: "grid",
      styles: { fontSize: 10 },
    });

    doc.save(`relatorio-${mesSelecionado}.pdf`);
  };

  const saldoTotalGasto = gastos.reduce(
    (acc, gasto) => acc + (Number(gasto.valor) || 0),
    0
  );
  const saldoDisponivel = salario - saldoTotalGasto;

  return (
    <main className={styles.container}>
      <Navbar />
      <FinancialDashboardHeader />

      <h2 className={styles.title}>Relatório Mensal</h2>

      <section className={styles.content}>
        <div className={styles.firstContent}>
          <div className={styles.seletorMes}>
            <div className={styles.divSeletorMes}>
              <label htmlFor="mesInput">Selecione o mês</label>
              <input
                id="mesInput"
                type="month"
                value={mesSelecionado}
                onChange={handleMesChange}
                className={styles.inputMes}
              />
            </div>
            <button className={styles.button} onClick={gerarPDF}>
              <div>
                <FaDownload />
              </div>
              Gerar PDF
            </button>
          </div>

          <div className={styles.totalsInformationSection}>
            <div className={styles.containerCard}>
              <div className={styles.contentTotals}>
                <img className={styles.icone} src={SecondIconeNovo} />
                <h2>Gasto do mês</h2>
              </div>
              <p>{formatCurrency(saldoTotalGasto)}</p>
            </div>

            <div className={styles.containerCard}>
              <div className={styles.contentTotals}>
                <img className={styles.icone} src={SecondIconeNovo} />
                <h2>Saldo do mês</h2>
              </div>
              <p>{formatCurrency(saldoDisponivel)}</p>
            </div>
          </div>
        </div>

        <div className={styles.containerCrud}>
          <div className={styles.divTable}>
            {loading ? (
              <p>Carregando...</p>
            ) : gastos.length === 0 ? (
              <p>Não possui gasto para o mês selecionado.</p>
            ) : (
              <table className={styles.table}>
                <thead className={styles.thead}>
                  <tr>
                    <th className={styles.th}>Data</th>
                    <th className={styles.th}>Descrição</th>
                    <th className={styles.th}>Categoria</th>
                    <th className={styles.th}>Valor</th>
                    <th className={styles.th}>M. Pagamento</th>
                    <th className={styles.th}>Parcelas</th>
                  </tr>
                </thead>
                <tbody className={styles.tbody}>
                  {gastos.map((gasto) => (
                    <tr key={gasto.id}>
                      <td>
                        {formatDateForDisplay(gasto.data_gasto?.split("T")[0])}
                      </td>
                      <td>{gasto.descricao}</td>
                      <td>{gasto.categoria}</td>
                      <td>{formatCurrency(gasto.valor)}</td>
                      <td>{gasto.metodo}</td>
                      <td>
                        {gasto.parcelas > 1 ? `1/${gasto.parcelas}` : "-"}
                      </td>{" "}
                      {/* Aqui */}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
