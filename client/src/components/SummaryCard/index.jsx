import styles from "./styles.module.css";

export default function SummaryCard({ title, value, icon, highlight }) {
  return (
    <div className={`${styles.card} ${highlight ? styles.highlight : ""}`}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <div className={styles.icon}>{icon}</div>
      </div>

      <strong className={styles.value}>{value}</strong>
    </div>
  );
}
