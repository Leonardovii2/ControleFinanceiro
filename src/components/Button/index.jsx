import styles from "./styles.module.css";

export default function Button({ buttonText, onSubmit, loading, loadingText }) {
  return (
    <button
      className={styles.button}
      type="button"
      onClick={onSubmit}
      disabled={loading}
    >
      {loading ? loadingText : buttonText}
    </button>
  );
}
