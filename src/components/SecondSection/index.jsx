import imgPorcoDinheiro from "../../assets/imgPorcoDinheiro.svg";
import styles from "./styles.module.css";

export default function SecondSection() {
  return (
    <div className={styles.contant}>
      <div className={styles.container}>
        <h2>Boa tarde, Leonardo</h2>
        <div className={styles.imgPorcoDinheiro}>
          <img src={imgPorcoDinheiro} alt="" />
        </div>
      </div>
    </div>
  );
}
