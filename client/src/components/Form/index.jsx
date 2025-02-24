import React from "react";
import styles from "./styles.module.css";
import useForm from "../../hooks/useForm";

export default function AdicionarGasto({
  onEdit,
  setOnEdit,
  setIsModalOpen,
  getGastos,
  atualizarTotal,
  isModalOpen,
}) {
  // Chamando o hook useForm e passando as funções e variáveis necessárias
  const {
    categorias,
    descricao,
    setDescricao,
    categoria,
    setCategoria,
    valor,
    setValor,
    handleSubmit,
  } = useForm({ onEdit, setOnEdit, setIsModalOpen, getGastos, atualizarTotal });

  // Função para fechar o modal e limpar o estado
  const fecharModal = () => {
    setIsModalOpen(false);
    setOnEdit(null); // Limpar o estado de edição
  };

  return (
    isModalOpen && (
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
    )
  );
}
