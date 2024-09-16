import styles from "./styles.module.css";

export default function Navbar() {
  return (
    <nav className={styles.container}>
      <h1><a href="#">Finanças</a></h1>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Perfil</a></li>
        <li><a href="#">Sair</a></li>
      </ul>
    </nav>
  );
}
