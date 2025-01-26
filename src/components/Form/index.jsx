import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./styles.module.css";

export default function AdicionarGasto({
  onEdit,
  getGastos,
  setOnEdit,
  atualizarTotal,
  isModalOpen,
  setIsModalOpen,
}) {
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [valor, setValor] = useState("");

  const categorias = [
    "Mercado",
    "Saúde",
    "Lazer",
    "Educação",
    "Transporte",
    "Moradia",
    "Roupas",
  ];

  useEffect(() => {
    if (onEdit) {
      setDescricao(onEdit.descricao || "");
      setCategoria(onEdit.categoria || "");
      setValor(onEdit.valor || "");
    } else {
      limparCampos();
    }
  }, [onEdit]);

  const limparCampos = () => {
    setDescricao("");
    setCategoria("");
    setValor("");
    setOnEdit(null);
  };

  const fecharModal = () => {
    limparCampos();
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!descricao || !categoria || !valor) {
      return toast.warn("Preencha todos os campos!");
    }

    const parsedValor = parseFloat(valor);
    if (isNaN(parsedValor) || parsedValor <= 0) {
      return toast.warn("O valor deve ser um número maior que zero!");
    }

    const token = localStorage.getItem("token");
    const payload = onEdit
      ? { id: onEdit.id, descricao, categoria, valor: parsedValor }
      : { descricao, categoria, valor: parsedValor };

    try {
      let data;
      if (onEdit) {
        data = await axios.put(
          `http://localhost:8801/gastos/${onEdit.id}`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        data = await axios.post("http://localhost:8801/gastos", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      toast.success(data.data.message);
      getGastos(); // Atualiza os gastos do backend

      atualizarTotal();
      fecharModal();
    } catch (error) {
      console.error("Erro ao salvar gasto:", error);
      toast.error(error.response?.data?.message || "Erro inesperado!");
    }
  };

  return (
    <>
      {isModalOpen && (
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
                  type="number"
                  className={styles.input}
                  placeholder="Valor do gasto"
                  value={valor}
                  onChange={(e) =>
                    setValor(
                      e.target.value
                        ? Math.max(0, parseFloat(e.target.value))
                        : ""
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
      )}
    </>
  );
}
