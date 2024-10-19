import styles from "./styles.module.css";
import imgUsuarioLogado from "../../assets/Perfil.svg";
import DateDisplay from "../DateDisplay";

export default function FirstSection() {
  return (
    <header className={styles.container}>
      <div className={styles.titles}>
        <h1>Painel Financeiro</h1>
        <DateDisplay />
      </div>
      <div className={styles.usuLogado}>
        <img
          className={styles.imgUsuarioLogado}
          src={imgUsuarioLogado}
          alt=""
        />
        <h2>Leonardo Viana</h2>
      </div>
    </header>
  );
}
