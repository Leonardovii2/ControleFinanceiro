import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../services/api"; // Importando a instância do axios
import styles from "./styles.module.css";

export default function Grid({
  gastos = [],
  setGastos,
  getGastos,
  setGastoToEdit,
  setIsModalOpen, // Função que permite abrir o modal
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    getGastos();
  }, [getGastos]);

  // Função para editar gasto
  const handleEditClick = (item) => {
    setGastoToEdit(item);
    setIsModalOpen(true); // Abre o modal de edição
  };

  // Função para excluir gasto
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Você precisa estar logado para excluir um gasto.");
      return;
    }

    try {
      const { data } = await api.delete(`/gastos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedGastos = gastos.filter((gasto) => gasto.id !== id);
      setGastos(updatedGastos);
      toast.success(data.message);

      getGastos();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erro inesperado ao deletar!"
      );
    }
  };

  // Função para mudar de página
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Paginação
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = gastos.slice(startIndex, endIndex);
  const totalPages = Math.ceil(gastos.length / itemsPerPage);

  return (
    <div className={styles.section}>
      <div className={styles.buttonContainer}>
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
            <tbody>
              {currentItems.map((item) => {
                const formattedDate = new Date(
                  item.data_gasto
                ).toLocaleDateString("pt-BR");
                const formattedValue = new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(item.valor);

                return (
                  <tr key={item.id}>
                    <td className={styles.firstConfigTd}>{formattedDate}</td>
                    <td className={styles.firstConfigTd}>{item.descricao}</td>
                    <td className={styles.firstConfigTd}>{item.categoria}</td>
                    <td className={styles.firstConfigTd}>{formattedValue}</td>
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
                );
              })}
            </tbody>
          </table>
        </div>

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
    </div>
  );
}
