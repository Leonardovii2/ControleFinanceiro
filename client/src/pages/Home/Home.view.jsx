import styles from "./styles.module.css";
import Grid from "../../components/Grid";
import ExpensesByCategory from "../../components/ExpensesByCategory";
import AdicionarGasto from "../../components/ExpenseFormModal";
import SummaryCard from "../../components/SummaryCard";
import {
  FaEye,
  FaEyeSlash,
  FaArrowUp,
  FaWallet,
  FaChartLine,
} from "react-icons/fa";

const HomeView = ({
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
}) => {
  return (
    <main className={styles.page}>
      <section className={styles.summary}>
        <div className={styles.summaryHeader}>
          <h2>Resumo</h2>
          <button onClick={toggleValor}>
            {mostrarValor ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className={styles.cards}>
          <SummaryCard
            icon={<FaArrowUp />}
            title="Total gasto"
            value={mostrarValor ? formatCurrency(totalGastos) : "*****"}
          />
          <SummaryCard
            icon={<FaWallet />}
            title="Saldo disponível"
            value={mostrarValor ? formatCurrency(saldoDisponivel) : "*****"}
          />
          <SummaryCard
            icon={<FaChartLine />}
            title="Valor investido"
            value={
              mostrarValor ? formatCurrency(calcularInvestimentos()) : "*****"
            }
          />
        </div>
      </section>

      <section className={styles.content}>
        <Grid
          gastos={gastos}
          setGastoToEdit={setGastoToEdit}
          setIsModalOpen={setIsModalOpen}
          handleDeleteGasto={handleDeleteGasto}
          mostrarValor={mostrarValor}
        />

        <ExpensesByCategory gastos={gastos} />
      </section>

      {isModalOpen && (
        <AdicionarGasto
          onEdit={gastoToEdit}
          setGastoToEdit={setGastoToEdit}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </main>
  );
};

export default HomeView;
