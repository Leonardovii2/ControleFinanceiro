import React from "react";
import axios from "axios";  // Para api 
import styles from "./styles.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const formatDateForDisplay = (date) => {
  const [year, month, day] = date.split("-"); // Divide a data pelo "-"
  return `${day}/${month}/${year}`; // Retorna no formato DD/MM/YYYY
};

export default function Grid({ gastos, setGastos, setOnEdit }) {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:8800/gastos/${id}`) // Adicione /gastos
      .then(({ data }) => {
        const newArray = gastos.filter((gasto) => gasto.id !== id);
        setGastos(newArray);
        toast.success(data.message); // Use data.message para mostrar a mensagem correta
      })
      .catch(({ response }) => toast.error(response.data.message)); // Use response para obter a mensagem de erro
    setOnEdit(null);
  };
  return (
    <section className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={`${styles.th} ${styles.hideOnMobile}`}>Data</th>
            <th className={styles.th}>Descrição</th>
            <th className={`${styles.th} ${styles.hideOnMobile}`}>Categoria</th>
            <th className={styles.th}>Valor</th>
            <th className={styles.th}></th>
            <th className={styles.th}></th>
          </tr>
        </thead>

        <tbody>
          {gastos.map((item, i) => (
            <tr key={i}>
              <td className={`${styles.firstConfigTd} ${styles.hideOnMobile}`}>
              {formatDateForDisplay(item.data_gasto.split("T")[0])}
              </td>
              <td className={styles.firstConfigTd}>{item.descricao}</td>
              <td className={`${styles.firstConfigTd} ${styles.hideOnMobile}`}>
                {item.categoria}
              </td>
              <td className={styles.firstConfigTd}>
                R$ {item.valor.toFixed(2)}
              </td>
              <td className={styles.secondConfigTd}>
                <FaEdit onClick={() => handleEdit(item)} />
              </td>
              <td className={styles.secondConfigTd}>
                <FaTrash onClick={() => handleDelete(item.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
