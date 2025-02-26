import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import api from "../../services/api";

export default function AdicionarGasto({
  onEdit,
  setGastoToEdit,
  setIsModalOpen,
  getGastos,
  getTotalGastos,
}) {
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [valor, setValor] = useState("");
  const [categorias, setCategorias] = useState([
    "Alimentação",
    "Transporte",
    "Lazer",
    "Saúde",
    "Outros",
  ]);

  useEffect(() => {
    if (onEdit) {
      setDescricao(onEdit.descricao || "");
      setCategoria(onEdit.categoria || "");
      setValor(onEdit.valor || "");
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!descricao || !categoria || !valor) {
      toast.error("Preencha todos os campos.");
      return;
    }

    const token = localStorage.getItem("token");

    const payload = {
      descricao,
      categoria,
      valor: parseFloat(valor),
    };

    console.log("Enviando payload:", payload);

    try {
      if (onEdit) {
        // Se estamos editando, usamos o método PUT
        const response = await api.put(`/gastos/${onEdit.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Gasto editado com sucesso!");
      } else {
        // Se não estamos editando, usamos o método POST
        const response = await api.post("/gastos", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Gasto adicionado com sucesso!");
      }

      // Atualiza os gastos e o total após salvar
      getGastos();
      getTotalGastos(); // Atualiza o total de gastos após adicionar ou editar
      setIsModalOpen(false); // Fecha o modal
      setGastoToEdit(null); // Limpa o estado de edição
    } catch (error) {
      console.error("Erro ao salvar gasto:", error.response || error);
      const errorMessage =
        error.response?.data?.message || "Erro ao salvar gasto.";
      toast.error(errorMessage);
    }
  };

  const fecharModal = () => {
    setIsModalOpen(false);
    setGastoToEdit(null);
  };

  return (
    <div className={styles.modalContainer} onClick={fecharModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeModalButton} onClick={fecharModal}>
          X
        </button>
        <form onSubmit={handleSubmit}>
          <div className={styles.titulo}>
            <h1>{onEdit ? "Editar Gasto" : "Adicionar Gasto"}</h1>
          </div>
          <div className={styles.container}>
            <label className={styles.labelStyle}>Descrição</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Descrição do gasto"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />

            <label className={styles.labelStyle}>Categoria</label>
            <select
              className={styles.input}
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <label className={styles.labelStyle}>Valor</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Valor do gasto"
              value={valor}
              onChange={(e) =>
                setValor(
                  e.target.value.replace(",", ".").replace(/[^0-9.]/g, "")
                )
              }
            />

            <button className={styles.button} type="submit">
              {onEdit ? "Atualizar" : "Adicionar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
