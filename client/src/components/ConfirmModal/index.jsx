import styles from "./ConfirmModal.module.css";

export default function ConfirmModal({
  isOpen,
  title = "Confirmar ação",
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmColor = "danger",
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <h2>{title}</h2>
          <button className={styles.close} onClick={onCancel}>
            ×
          </button>
        </header>

        <p className={styles.description}>{description}</p>

        <footer className={styles.footer}>
          <button className={styles.cancel} onClick={onCancel}>
            {cancelText}
          </button>

          <button
            className={`${styles.confirm} ${
              confirmColor === "danger" ? styles.danger : styles.primary
            }`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </footer>
      </div>
    </div>
  );
}
