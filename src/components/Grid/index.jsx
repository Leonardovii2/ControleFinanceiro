import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import AdicionarGasto from "../../components/Form";

export default function Grid({
  gastos = [],
  setGastos,
  atualizarTotal,
  getGastos,
}) {
  const [gastoToEdit, setGastoToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Paginação
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const itemsPerPage = 5; // Itens por página

  // Calcular índice inicial e final dos itens a serem exibidos
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Seleciona os gastos para a exibição na página atual
  const currentItems = gastos.slice(startIndex, endIndex);

  // Número total de páginas
  const totalPages = Math.ceil(gastos.length / itemsPerPage);

  // Função para mudar a página
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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

      getGastos();
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
                <th className={styles.th}>Ações</th>
              </tr>
            </thead>

            <tbody className={styles.tbody}>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td className={styles.firstConfigTd}>
                    {item.data_gasto.split("T")[0].replace(/-/g, "/")}
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

          {/* Páginas */}
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
