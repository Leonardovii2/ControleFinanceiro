import styles from "./styles.module.css";
import { FaTimes } from "react-icons/fa";

const Modal = ({
  isOpen,
  closeModal,
  onSubmit,
  label,
  value,
  setValue,
  placeholder,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={closeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.divButton}>
            <button
              className={styles.closeModalButton}
              onClick={closeModal}
              type="button"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <FaTimes size={20} color="#333" />
            </button>
          </div>

          <label>{label}</label>

          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className={styles.input}
          />
          <button className={styles.addButton} type="submit">
            Confirmar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
