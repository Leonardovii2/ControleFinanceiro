import styles from "./styles.module.css";
import imgUsuarioLogado from "../../assets/Perfil.svg";

export default function FirstSection() {
  return (
    <header className={styles.container}>
      <div className={styles.titles}>
        <h1>Painel Financeiro</h1>
        <h2 className={styles.futureApi}>Segunda-feira, 11/10/2024</h2>
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
