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
    <section className={styles.section}>
      <div className={styles.tableContainer}>
        <div className={styles.scrollBody}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Data</th>
                <th scope="col">Descrição</th>
                <th scope="col">Categoria</th>
                <th scope="col" className={styles.alignRight}>
                  Valor
                </th>
                <th scope="col" className={styles.alignCenter}>
                  Ações
                </th>
              </tr>
            </thead>

            <tbody>
              {gastos.length > 0 ? (
                gastos.map((item) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td>{formatDate(item.data_gasto)}</td>
                    <td>{item.descricao}</td>
                    <td>
                      <span className={styles.badge}>{item.categoria}</span>
                    </td>
                    <td className={styles.alignRight}>
                      <span>{formatCurrency(item.valor)}</span>
                    </td>
                    <td className={styles.actions}>
                      <button
                        onClick={() => handleEditClick(item)}
                        aria-label="Editar gasto"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        aria-label="Excluir gasto"
                      >
                        <FaTrash />
                      </button>
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
    </section>
  );
}
