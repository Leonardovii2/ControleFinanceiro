import React, { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const formatDateForDisplay = (date) => {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export default function Grid({ gastos, setGastos, setOnEdit, atualizarTotal }) {
  const [gastoToEdit, setGastoToEdit] = useState(null); // Estado para armazenar o gasto a ser editado

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Você precisa estar logado para excluir um gasto.");
      return;
    }

    try {
      const { data } = await axios.delete(
        `http://localhost:8801/gastos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newArray = gastos.filter((gasto) => gasto.id !== id);
      setGastos(newArray);
      toast.success(data.message);
      atualizarTotal();
    } catch (error) {
      const message = error.response
        ? error.response.data.message
        : "Erro inesperado ao deletar!";
      toast.error(message);
    }
  };

  const handleEditClick = (item) => {
    setGastoToEdit(item); // Definindo o gasto a ser editado
    setOnEdit(true); // Isso ativa o modal de edição
  };

  return (
    <section className={styles.container}>
      <div className={styles.scrollContainer}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={`${styles.th}`}>Data</th>
              <th className={styles.th}>Descrição</th>
              <th className={`${styles.th}`}>Categoria</th>
              <th className={styles.th}>Valor</th>
              <th className={styles.th}></th>
              <th className={styles.th}></th>
            </tr>
          </thead>

          <tbody className={styles.tbody}>
            {gastos.map((item) => {
              const valorFormatado = parseFloat(item.valor);
              return (
                <tr key={item.id}>
                  <td className={`${styles.firstConfigTd}`}>
                    {formatDateForDisplay(item.data_gasto.split("T")[0])}
                  </td>
                  <td className={styles.firstConfigTd}>{item.descricao}</td>
                  <td className={`${styles.firstConfigTd}`}>
                    {item.categoria}
                  </td>
                  <td className={styles.firstConfigTd}>
                    {isNaN(valorFormatado)
                      ? "Valor inválido"
                      : formatCurrency(valorFormatado)}
                  </td>
                  <td className={styles.secondConfigTd}>
                    <FaEdit
                      onClick={() => handleEditClick(item)}
                      aria-label="Editar gasto"
                    />
                  </td>
                  <td className={styles.secondConfigTd}>
                    <FaTrash
                      onClick={() => handleDelete(item.id)}
                      aria-label="Excluir gasto"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>

  );
}
