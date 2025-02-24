import React from "react";
import styles from "./styles.module.css";
import InformationCard from "../../InformationCard";
import useMonthlyFilter from "../../../hooks/useMonthlyFilter";

export default function MonthlyFilter() {
  const {
    gastos,
    mesSelecionado,
    loading,
    saldoTotalGasto,
    saldoDisponivel,
    handleMesChange,
    formatCurrency,
    formatDateForDisplay,
  } = useMonthlyFilter();

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

        <section className={styles.totalsInformationSection}>
          <InformationCard
            title="Gasto do mês"
            value={formatCurrency(saldoTotalGasto)}
          />
          <InformationCard
            title="Saldo do mês"
            value={formatCurrency(saldoDisponivel)}
          />
        </section>

        <div className={styles.listaGastos}>
          <h2>Gastos de {mesSelecionado.split("-").reverse().join("/")}</h2>
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
                    <td>{formatCurrency(gasto.valor)}</td>
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
