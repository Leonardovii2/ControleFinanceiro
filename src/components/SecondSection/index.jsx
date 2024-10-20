import imgPorcoDinheiro from "../../assets/imgPorcoDinheiro.svg";
import styles from "./styles.module.css";
import Greeting from "../Greeting/index";

export default function SecondSection({ nome }) {
  return (
    <div className={styles.contant}>
      <div className={styles.container}>
        <Greeting username={nome} />
        <div className={styles.imgPorcoDinheiro}>
          <img src={imgPorcoDinheiro} alt="" />
        </div>
      </div>
    </div>
  );
}
