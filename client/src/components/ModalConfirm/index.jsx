// components/ModalConfirm.jsx
import React from "react";
import styles from "./styles.module.css"; // ou use estilos embutidos
import { FaTimes } from "react-icons/fa";

const ModalConfirm = ({ message, onConfirm, onCancel }) => (
  <div className={styles.modalOverlay}>
    <div className={styles.modalContent}>
      <div className={styles.divButton}>
        <button
          className={styles.closeModalButton}
          onClick={onCancel}
          type="button"
        >
          <FaTimes
            size={20}
            color="#333"
            onClick={onCancel}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
            }}
          />
        </button>
        <p>{message}</p>
      </div>

      <hr />

      <p className={styles.firstP}>Essa ação não poderá ser disfeita</p>

      <div className={styles.actions}>
        <button className={styles.addButtonCall} onClick={onCancel}>
          Cancelar
        </button>
        <button className={styles.addButton} onClick={onConfirm}>
          Confirmar
        </button>
      </div>
    </div>
  </div>
);

export default ModalConfirm;
