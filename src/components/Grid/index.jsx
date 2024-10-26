import React from "react";
import axios from "axios"; // Para API
import styles from "./styles.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const formatDateForDisplay = (date) => {
  const [year, month, day] = date.split("-"); // Divide a data pelo "-"
  return `${day}/${month}/${year}`; // Retorna no formato DD/MM/YYYY
};

export default function Grid({ gastos, setGastos, setOnEdit }) {
  const handleEdit = async (updatedGasto) => {
    const token = localStorage.getItem("token"); // Obtém o token do localStorage

    try {
      const { data } = await axios.put(
        `http://localhost:8800/gastos/${updatedGasto.id}`,
        updatedGasto,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
          },
        }
      );

      // Atualiza o estado com o gasto atualizado
      updateGasto(data.gasto); // Supondo que a resposta inclua o gasto atualizado
      toast.success("Gasto atualizado com sucesso.");
    } catch (error) {
      const message = error.response
        ? error.response.data.message
        : "Erro inesperado ao atualizar!";
      toast.error(message); // Exibe a mensagem de erro
    } finally {
      setOnEdit(null); // Reseta o estado de edição
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token"); // Obtém o token do localStorage

    try {
      const { data } = await axios.delete(
        `http://localhost:8800/gastos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
          },
        }
      );

      const newArray = gastos.filter((gasto) => gasto.id !== id);
      setGastos(newArray);
      toast.success(data.message); // Usa data.message para mostrar a mensagem correta
    } catch (error) {
      const message = error.response
        ? error.response.data.message
        : "Erro inesperado ao deletar!";
      toast.error(message); // Exibe a mensagem de erro
    }
  };

  // Função para atualizar um gasto
  const updateGasto = (updatedGasto) => {
    const updatedGastos = gastos.map((gasto) =>
      gasto.id === updatedGasto.id ? updatedGasto : gasto
    );
    setGastos(updatedGastos);
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
          {gastos.map((item) => {
            const valorFormatado = parseFloat(item.valor); // Converte para número
            return (
              <tr key={item.id}>
                <td className={`${styles.firstConfigTd} ${styles.hideOnMobile}`}>
                  {formatDateForDisplay(item.data_gasto.split("T")[0])}
                </td>
                <td className={styles.firstConfigTd}>{item.descricao}</td>
                <td className={`${styles.firstConfigTd} ${styles.hideOnMobile}`}>
                  {item.categoria}
                </td>
                <td className={styles.firstConfigTd}>
                  R${" "}
                  {isNaN(valorFormatado)
                    ? "Valor inválido"
                    : valorFormatado.toFixed(2).replace(".", ",")}
                </td>
                <td className={styles.secondConfigTd}>
                  <FaEdit onClick={() => setOnEdit(item)} />
                </td>
                <td className={styles.secondConfigTd}>
                  <FaTrash onClick={() => handleDelete(item.id)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
