import styles from "./styles.module.css";
import imgIconeCasa from "../../assets/iconeCasa.svg";
import imgIconeCarteira from "../../assets/iconeCarteira.svg";
import imgIconeEngrenagem from "../../assets/iconeUsuario.svg";
import imgIconeUsuario from "../../assets/iconeEngrenagem.svg";

export default function Navbar() {
  return (
    <nav className={styles.container}>
      <ul className={styles.icons}>
        <li>
          <a href="/">
            <img
              className={styles.icone}
              src={imgIconeCasa}
              alt="Icone de casa navbar"
            />
          </a>
        </li>
        <li>
          <a href="/">
            <img
              className={styles.icone}
              src={imgIconeCarteira}
              alt="Icone de casa navbar"
            />
          </a>
        </li>
        <li>
          <a href="/">
            <img
              className={styles.icone}
              src={imgIconeEngrenagem}
              alt="Icone de casa navbar"
            />
          </a>
        </li>
        <li>
          <a href="/">
            <img
              className={styles.icone}
              src={imgIconeUsuario}
              alt="Icone de casa navbar"
            />
          </a>
        </li>
      </ul>
    </nav>
  );
}
