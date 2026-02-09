import styles from "./styles.module.css";

export default function ModalConfirm({
  isOpen,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmColor = "primary",
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{title}</h2>
        <p>{description}</p>

        <div className={styles.buttons}>
          <button type="button" className={styles.cancel} onClick={onCancel}>
            {cancelText}
          </button>

          <button
            type="button"
            className={`${styles.confirm} ${
              confirmColor === "danger" ? styles.danger : ""
            }`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
