import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import api from "../../services/api";
import { FaTimes } from "react-icons/fa";

const categorias = [
  "Alimentação",
  "Transporte",
  "Lazer",
  "Saúde",
  "Contas",
  "Assinaturas",
  "Eletrodoméstico",
  "Outros",
  "Investimento",
];

export default function AdicionarGasto({
  onEdit,
  setGastoToEdit,
  getGastos,
  getTotalGastos,
  setIsModalOpen,
  isModalOpen,
}) {
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [valor, setValor] = useState("");
  const [metodo, setMetodo] = useState("");
  const [parcelas, setParcelas] = useState("");
  const [fixo, setFixo] = useState(false);

  useEffect(() => {
    if (onEdit) {
      setDescricao(onEdit.descricao || "");
      setCategoria(onEdit.categoria || "");
      setValor(onEdit.valor?.toString() || "");
      setMetodo(onEdit.metodo || "");
      setParcelas(onEdit.parcelas?.toString() || "");
      setFixo(onEdit.fixo || false);
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação
    if (
      !descricao ||
      !categoria ||
      !valor ||
      (categoria !== "Investimento" && !metodo) ||
      (metodo === "credito" && !parcelas)
    ) {
      toast.error("Preencha todos os campos.");
      return;
    }

    const token = localStorage.getItem("token");
    const payload = {
      descricao,
      categoria,
      valor: parseFloat(valor),
      // Envia null para metodo se for investimento
      metodo: categoria === "Investimento" ? null : metodo,
      parcelas: metodo === "credito" ? parseInt(parcelas) : null,
      fixo,
    };

    try {
      const url = onEdit ? `/gastos/${onEdit.id}` : "/gastos";
      const method = onEdit ? "put" : "post";
      await api[method](url, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(
        `${onEdit ? "Gasto editado" : "Gasto adicionado"} com sucesso!`
      );
      getGastos();
      getTotalGastos();
      fecharModal();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Erro ao salvar gasto.";
      toast.error(errorMessage);
    }
  };

  const fecharModal = () => {
    setIsModalOpen(false);
    setGastoToEdit(null);
    setDescricao("");
    setCategoria("");
    setValor("");
    setMetodo("");
    setParcelas("");
    setFixo(false);
  };

  return (
    isModalOpen && (
      <div
        className={`${styles.modalContainer} ${isModalOpen ? styles.open : ""}`}
        onClick={fecharModal}
      >
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <button
            onClick={fecharModal}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            aria-label="Fechar modal"
          >
            <FaTimes size={20} color="#333" />
          </button>

          <h2 className={styles.titulo}>
            {onEdit ? "Editar Gasto" : "Adicionar Gasto"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className={styles.contentForm}>
              <label>Descrição:</label>
              <input
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Ex: Compra de comida"
              />
            </div>

            <div className={styles.contentForm}>
              <label>Categoria:</label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.contentForm}>
              <label>Valor:</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder="R$"
              />
            </div>

            {categoria !== "Investimento" && (
              <div className={styles.containerMetodo}>
                <label>Método de Pagamento:</label>
                <div className={styles.metodoPagamento}>
                  {["debito", "pix", "credito"].map((option) => (
                    <label key={option}>
                      <input
                        type="radio"
                        name="metodo"
                        value={option}
                        checked={metodo === option}
                        onChange={(e) => setMetodo(e.target.value)}
                      />
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {metodo === "credito" && (
              <div className={styles.contentMetodoCredito}>
                <label>Parcelas:</label>
                <select
                  value={parcelas}
                  onChange={(e) => setParcelas(e.target.value)}
                >
                  <option value="">1x</option>
                  {[...Array(12)].map((_, idx) => (
                    <option key={idx + 1} value={idx + 1}>
                      {idx + 1}x
                    </option>
                  ))}
                </select>
              </div>
            )}

            <label>
              <input
                type="checkbox"
                id="fixo"
                name="fixo"
                checked={fixo}
                onChange={() => setFixo(!fixo)}
              />
              Gasto fixo (repete todo mês)
            </label>

            <div className={styles.modalButtons}>
              <button className={styles.modalbutton} type="submit">
                Salvar
              </button>
              <button
                className={styles.modalbutton}
                type="button"
                onClick={fecharModal}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
