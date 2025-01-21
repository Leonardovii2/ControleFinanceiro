import styles from "./styles.module.css";
import pigImg from "../../assets/pig-bank.svg";
import { useEffect, useState } from "react";

export default function SecondOfcSection() {
  const [nomeUsuario, setNomeUsuario] = useState("");

  useEffect(() => {
    const nome = localStorage.getItem("nomeUsuario");
    setNomeUsuario(nome);
  });

  return (
    <>
      <section className={styles.container}>
        <div className={styles.contant}>
          <h2>{nomeUsuario}</h2>
          <img className={styles.img} src={pigImg} alt="" />
        </div>
      </section>
    </>
  );
}
