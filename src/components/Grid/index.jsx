import React from "react";
import styles from "./styles.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import useGrid from "../../assets/Hooks/useGrid";
import AdicionarGasto from "../../components/Form";

export default function Grid({
  gastos = [],
  setGastos,
  atualizarTotal,
  getGastos,
}) {
  const {
    gastoToEdit,
    setGastoToEdit,
    isModalOpen,
    setIsModalOpen,
    currentItems,
    currentPage,
    totalPages,
    changePage,
    handleDelete,
    handleEditClick,
  } = useGrid(setGastos, atualizarTotal, getGastos, gastos);

  return (
    <>
      <section className={styles.container}>
        <div className={styles.scrollContainer}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>Data</th>
                <th className={styles.th}>Descrição</th>
                <th className={styles.th}>Categoria</th>
                <th className={styles.th}>Valor</th>
                <th className={styles.th}>Ações</th>
              </tr>
            </thead>

            <tbody className={styles.tbody}>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td className={styles.firstConfigTd}>
                    {new Date(item.data_gasto).toLocaleDateString("pt-BR")}
                  </td>
                  <td className={styles.firstConfigTd}>{item.descricao}</td>
                  <td className={styles.firstConfigTd}>{item.categoria}</td>
                  <td className={styles.firstConfigTd}>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.valor)}
                  </td>
                  <td className={styles.secondConfigTd}>
                    <FaEdit
                      onClick={() => handleEditClick(item)}
                      aria-label="Editar gasto"
                      className={styles.icone}
                    />
                    <FaTrash
                      onClick={() => handleDelete(item.id)}
                      aria-label="Excluir gasto"
                      className={styles.icone}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginação */}
          <div className={styles.pagination}>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={styles.pageButton}
                onClick={() => changePage(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </section>

      {isModalOpen && (
        <AdicionarGasto
          onEdit={gastoToEdit}
          getGastos={getGastos}
          setOnEdit={setGastoToEdit}
          atualizarTotal={atualizarTotal}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          gastos={gastos}
          setGastos={setGastos}
        />
      )}
    </>
  );
}
