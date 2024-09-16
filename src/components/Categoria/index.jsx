import styles from "./styles.module.css";

export default function Categoria(props) {
  return (
    <div className={styles.containerCategoria}>
      <div className={styles.imgs}>
        <img className={styles.controle} src={props.controleImg} alt="" />
      </div>
      <h2 className={styles.titleCategoria}>{props.title}</h2>
    </div>
  );
}
