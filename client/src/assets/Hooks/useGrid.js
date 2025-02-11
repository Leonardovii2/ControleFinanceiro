import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../services/api"; // Importando a instância do axios

export default function useGrid(setGastos, atualizarTotal, getGastos, gastos) {
  const [gastoToEdit, setGastoToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    getGastos();
  }, []);

  // Paginação
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = gastos.slice(startIndex, endIndex);
  const totalPages = Math.ceil(gastos.length / itemsPerPage);

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
      const { data } = await api.delete(`/gastos/${id}`, {
        // Usando a instância api
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

  return {
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
  };
}
