import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import styles from "./styles.module.css";
import { motion } from "framer-motion";

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("pt-BR");

const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

export default function Grid({
  gastos = [],
  setGastoToEdit,
  setIsModalOpen,
  handleDeleteGasto,
  mostrarValor,
}) {
  const handleEditClick = (item) => {
    setGastoToEdit(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Deseja realmente excluir este gasto?")) {
      handleDeleteGasto(id);
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.buttonContainer}>
        <div className={styles.container}>
          <div className={styles.scrollBody}>
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
                {gastos.length > 0 ? (
                  gastos.map((item) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <td>{formatDate(item.data_gasto)}</td>
                      <td>{item.descricao}</td>
                      <td>{item.categoria}</td>
                      <td>
                        {mostrarValor ? formatCurrency(item.valor) : "*****"}
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
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className={styles.noData}>
                      Nenhum gasto cadastrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
