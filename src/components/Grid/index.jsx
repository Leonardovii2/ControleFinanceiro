import React from "react";
import axios from "axios"; /* Para api */
import styles from "./styles.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Grid({ gastos, setGastos, setOnEdit }) {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
        const newArray = gastos.filter((gasto) => gasto.id !== id);

        setGastos(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));
    setOnEdit(null);
  };


  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>Data</th>
          <th className={styles.th}>Descrição</th>
          <th className={styles.th}>Categoria</th>
          <th className={styles.th}>Valor</th>
          <th className={styles.th}></th>
          <th className={styles.th}></th>
        </tr>
      </thead>

      <tbody>
        {gastos.map((item, i) => (
          <tr key={i}>
            <td className={styles.firstConfigTd}>
              {item.data_gasto.split("T")[0]}
            </td>
            <td className={styles.firstConfigTd}>{item.descricao}</td>
            <td className={styles.firstConfigTd}>{item.categoria}</td>
            <td className={styles.firstConfigTd}>R$ {item.valor}</td>
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
  );
}
