// Greeting.jsx
import React, { useEffect, useState } from "react";
import styles from "../Greeting/styles.module.css";

const Greeting = ({ username }) => {
  const [greeting, setGreeting] = useState("");

  const updateGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreeting(`Bom dia, ${username}`);
    } else if (currentHour < 18) {
      setGreeting(`Boa tarde, ${username}`);
    } else {
      setGreeting(`Boa noite, ${username}`);
    }
  };

  useEffect(() => {
    updateGreeting(); // Define a saudação inicial

    const intervalId = setInterval(updateGreeting, 60000); // Atualiza a cada 60 segundos

    return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar o componente
  }, []);

  return (
    <div>
      <h2>{greeting}</h2>
    </div>
  );
};

export default Greeting;