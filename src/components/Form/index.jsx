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

  // Preenche os campos do formulário se for edição
  useEffect(() => {
    if (onEdit) {
      setDescricao(onEdit.descricao); // Preenche o campo descrição
      setCategoria(onEdit.categoria); // Preenche o campo categoria
      setValor(onEdit.valor); // Preenche o campo valor
    } else {
      setDescricao(""); // Limpa os campos para adição
      setCategoria(""); // Limpa os campos para adição
      setValor(""); // Limpa os campos para adição
    }
  }, [onEdit]); // Recarrega os dados sempre que onEdit mudar

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
    const payload = { descricao, categoria, valor: parsedValor };

    try {
      const endpoint = onEdit
        ? `http://localhost:8801/gastos/${onEdit.id}` // Se estamos editando, usamos o ID do gasto
        : "http://localhost:8801/gastos"; // Caso contrário, criamos um novo gasto

      const method = onEdit ? "put" : "post"; // Se estamos editando, usamos PUT, caso contrário, POST
      const { data } = await axios[method](endpoint, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(data.message);
      setOnEdit(null); // Limpa os dados de edição
      getGastos(); // Atualiza a lista de gastos
      atualizarTotal(); // Atualiza o total
      setIsModalOpen(false); // Fecha o modal
    } catch (error) {
      console.error("Erro ao salvar gasto:", error);
      toast.error(error.response?.data?.message || "Erro inesperado!");
    }
  };

  return (
    <>
      {isModalOpen && (
        <div
          className={styles.modalContainer}
          onClick={() => setIsModalOpen(false)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeModalButton}
              onClick={() => setIsModalOpen(false)}
            >
              X
            </button>
            <form onSubmit={handleSubmit}>
              <div className={styles.titulo}>
                <h1>Adicionar gasto</h1>
              </div>
              <div className={styles.container}>
                <label className={styles.labelStyle}>Descrição</label>
                <input
                  name="descricao"
                  className={styles.input}
                  type="text"
                  placeholder="Descrição do gasto"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
                <label className={styles.labelStyle}>Categoria</label>
                <select
                  value={categoria}
                  className={styles.input}
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
                  name="valor"
                  type="text"
                  className={styles.input}
                  placeholder="Valor do gasto"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
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
