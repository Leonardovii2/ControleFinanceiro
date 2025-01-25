import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import AdicionarGasto from "../../components/Form";

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

export default function Grid({ gastos = [], setGastos, atualizarTotal }) {
  const [gastoToEdit, setGastoToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Atualiza o localStorage sempre que os gastos forem alterados
  useEffect(() => {
    if (Array.isArray(gastos)) {
      localStorage.setItem("gastos", JSON.stringify(gastos));
    }
  }, [gastos]);

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
    setGastoToEdit(item);
    setIsModalOpen(true);
  };

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
                <th className={styles.th}></th>
                <th className={styles.th}></th>
              </tr>
            </thead>

            <tbody className={styles.tbody}>
              {gastos.map((item) => (
                <tr key={item.id}>
                  <td className={styles.firstConfigTd}>
                    {formatDateForDisplay(item.data_gasto.split("T")[0])}
                  </td>
                  <td className={styles.firstConfigTd}>{item.descricao}</td>
                  <td className={styles.firstConfigTd}>{item.categoria}</td>
                  <td className={styles.firstConfigTd}>
                    {formatCurrency(parseFloat(item.valor))}
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
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {isModalOpen && (
        <AdicionarGasto
          onEdit={gastoToEdit}
          getGastos={atualizarTotal}
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
