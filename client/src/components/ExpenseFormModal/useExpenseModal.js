import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";

export default function useExpenseModal({
  gastoToEdit,
  setIsModalOpen,
  setGastoToEdit,
  refreshGastos,
  getTotalGastos,
}) {
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [valor, setValor] = useState(0);
  const [metodo, setMetodo] = useState("");
  const [parcelas, setParcelas] = useState(1);
  const [fixo, setFixo] = useState(false);

  const isEditing = Boolean(gastoToEdit);

  /* =======================
     Preenche formulário
  ======================= */
  useEffect(() => {
    if (!gastoToEdit) return;

    setDescricao(gastoToEdit.descricao ?? "");
    setCategoria(gastoToEdit.categoria ?? "");
    setValor(gastoToEdit.valor ?? 0);
    setMetodo(gastoToEdit.metodo ?? "");
    setParcelas(gastoToEdit.parcelas ?? 1);
    setFixo(Boolean(gastoToEdit.fixo));
  }, [gastoToEdit]);

  /* =======================
     Reset
  ======================= */
  const resetForm = useCallback(() => {
    setDescricao("");
    setCategoria("");
    setValor(0);
    setMetodo("");
    setParcelas(1);
    setFixo(false);
    setGastoToEdit(null);
  }, [setGastoToEdit]);

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  /* =======================
     Validação
  ======================= */
  const isValid = () => {
    if (!descricao || !categoria || valor <= 0) return false;
    if (categoria !== "Investimento" && !metodo) return false;
    if (metodo === "credito" && parcelas < 1) return false;
    return true;
  };

  /* =======================
     Submit
  ======================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid()) {
      toast.error("Preencha todos os campos corretamente.");
      return;
    }

    const token = localStorage.getItem("token");

    const payload = {
      descricao,
      categoria,
      valor,
      metodo: categoria === "Investimento" ? null : metodo,
      parcelas: metodo === "credito" ? parcelas : null,
      fixo,
    };

    try {
      if (isEditing) {
        await api.put(`/gastos/${gastoToEdit.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Gasto atualizado com sucesso!");
      } else {
        await api.post("/gastos", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Gasto adicionado com sucesso!");
      }

      await refreshGastos(); // 🔥 ATUALIZA LISTA
      await getTotalGastos(); // 🔥 ATUALIZA CARDS
      closeModal();
    } catch (error) {
      toast.error("Erro ao salvar gasto.");
    }
  };

  return {
    /* states */
    descricao,
    categoria,
    valor,
    metodo,
    parcelas,
    fixo,

    /* setters */
    setDescricao,
    setCategoria,
    setValor,
    setMetodo,
    setParcelas,
    setFixo,

    /* helpers */
    isEditing,
    handleSubmit,
    closeModal,
  };
}
