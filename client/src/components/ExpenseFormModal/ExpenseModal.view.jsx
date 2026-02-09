import styles from "./styles.module.css";
import { FaTimes } from "react-icons/fa";

const CATEGORIAS = [
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

const METODOS_PAGAMENTO = [
  { value: "pix", label: "Pix" },
  { value: "debito", label: "Débito" },
  { value: "credito", label: "Crédito" },
];

export default function ExpenseModalView({
  descricao,
  categoria,
  valor,
  metodo,
  parcelas,
  fixo,
  setDescricao,
  setCategoria,
  setValor,
  setMetodo,
  setParcelas,
  setFixo,
  handleSubmit,
  closeModal,
  isEditing = false,
}) {
  return (
    <div className={styles.modalContainer} onClick={closeModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <button
            className={styles.closeModalButton}
            onClick={closeModal}
            type="button"
            aria-label="Fechar modal"
          >
            <FaTimes />
          </button>

          <h2 className={styles.titulo}>
            {isEditing ? "Editar Gasto" : "Adicionar Gasto"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Descrição</label>
            <input
              type="text"
              placeholder="Ex: Mercado, Uber, Netflix"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Categoria</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
            >
              <option value="">Selecione</option>
              {CATEGORIAS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label>Valor (R$)</label>
            <input
              className={styles.inputValor}
              type="number"
              step="0.01"
              placeholder="0,00"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              required
            />
          </div>

          {categoria !== "Investimento" && (
            <div className={styles.paymentMethods}>
              <label>Método de pagamento</label>

              <div className={styles.radioGroup}>
                {METODOS_PAGAMENTO.map(({ value, label }) => (
                  <label key={value} className={styles.radio}>
                    <input
                      type="radio"
                      name="metodoPagamento"
                      checked={metodo === value}
                      onChange={() => setMetodo(value)}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          )}

          {metodo === "credito" && (
            <div className={styles.field}>
              <label>Parcelas</label>
              <select
                value={parcelas}
                onChange={(e) => setParcelas(Number(e.target.value))}
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}x
                  </option>
                ))}
              </select>
            </div>
          )}

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={fixo}
              onChange={() => setFixo(!fixo)}
              className={styles.checkboxInput}
            />
            Gasto fixo mensal
          </label>

          <div className={styles.buttonsContainer}>
            <button
              onClick={closeModal}
              className={styles.buttonCancel}
              type="button"
            >
              Cancelar
            </button>

            <button type="submit" className={styles.buttonPrimary}>
              {isEditing ? "Salvar alterações" : "Adicionar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
