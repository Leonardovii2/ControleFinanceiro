import styles from "./styles.module.css";
import pigImg from "../../assets/Images/pigLogo.svg";
import { useEffect, useState } from "react";

export const getGreeting = () => {
  const hours = new Date().getHours();
  if (hours >= 5 && hours < 12) return "Bom dia";
  if (hours >= 12 && hours < 18) return "Boa tarde";
  return "Boa noite";
};

export default function SecondOfcSection() {
  const [userName, setUserName] = useState("");
  const [greeting, setGreeting] = useState(getGreeting());

  useEffect(() => {
    const name = localStorage.getItem("nomeUsuario") || "";
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000);

    // Evita erro ao aplicar .trim() em null
    setUserName(name.trim().split(" ")[0]);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className={styles.container}>
        <div className={styles.contant}>
          <h2>
            {greeting}, {userName}
          </h2>
          <img className={styles.img} src={pigImg} alt="" />
        </div>
      </section>
    </>
  );
}
