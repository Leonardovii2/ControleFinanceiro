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
  { value: "debito", label: "Débito" },
  { value: "pix", label: "Pix" },
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
    <div className={styles.modalOverlay} onClick={closeModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeModalButton}
          onClick={closeModal}
          type="button"
          aria-label="Fechar modal"
        >
          <FaTimes />
        </button>

        <h2>{isEditing ? "Editar Gasto" : "Adicionar Gasto"}</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Descrição */}
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

          {/* Categoria */}
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

          {/* Valor */}
          <div className={styles.field}>
            <label>Valor (R$)</label>
            <input
              type="number"
              step="0.01"
              placeholder="0,00"
              value={valor}
              onChange={(e) => setValor(Number(e.target.value))}
              required
            />
          </div>

          {/* Método de pagamento */}
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

          {/* Parcelas */}
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

          {/* Gasto fixo */}
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={fixo}
              onChange={() => setFixo(!fixo)}
            />
            Gasto fixo mensal
          </label>

          <button type="submit" className={styles.button}>
            {isEditing ? "Salvar alterações" : "Adicionar gasto"}
          </button>
        </form>
      </div>
    </div>
  );
}
