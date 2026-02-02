import styles from "./styles.module.css";
import Grid from "../../components/Grid";
import ExpensesByCategory from "../../components/ExpensesByCategory";
import ExpenseModal from "../../components/ExpenseFormModal";
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
  getGastos,
  getTotalGastos,
  refreshGastos,
}) => {
  return (
    <main className={styles.page}>
      <section className={styles.summary}>
        <div className={styles.summaryHeader}>
          <h2>Resumo</h2>
          <button onClick={toggleValor} className={styles.toggleButton}>
            {mostrarValor ? <FaEyeSlash  /> : <FaEye />}
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

      <section className={styles.contentHeader}>
        <button
          className={styles.addButton}
          onClick={() => setIsModalOpen(true)}
        >
          + Adicionar gasto
        </button>
      </section>

      <section className={styles.content}>
        <div className={styles.main}>
          <Grid
            gastos={gastos}
            setGastoToEdit={setGastoToEdit}
            setIsModalOpen={setIsModalOpen}
            handleDeleteGasto={handleDeleteGasto}
            mostrarValor={mostrarValor}
          />
        </div>

        <aside className={styles.aside}>
          <ExpensesByCategory gastos={gastos} />
        </aside>
      </section>

      {isModalOpen && (
        <ExpenseModal
          gastoToEdit={gastoToEdit}
          setIsModalOpen={setIsModalOpen}
          setGastoToEdit={setGastoToEdit}
          refreshGastos={getGastos}
          getTotalGastos={getTotalGastos}
        />
      )}
    </main>
  );
};

export default HomeView;
