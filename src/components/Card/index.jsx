import styles from "./styles.module.css";

export default function Card(props) {
  return (
      <div className={styles.container}>
        <h1>{props.title}</h1>
        <h2>R$ {props.valor}</h2>
      </div>
  );
}
