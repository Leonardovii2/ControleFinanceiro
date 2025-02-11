import styles from "./styles.module.css";

export default function InformationCard({ image, title, value }) {
  return (
    <div className={styles.container}>
      <img className={styles.icone} src={image} alt="" />
      <h2>{title}</h2>
      <p>R$ {value}</p>
    </div>
  );
}
