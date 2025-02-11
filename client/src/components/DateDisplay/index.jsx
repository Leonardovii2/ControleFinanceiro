import React, { useEffect, useState } from "react";

const DateDisplay = () => {
  const [date, setDate] = useState("");

  const formatDate = () => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const today = new Date().toLocaleDateString("pt-BR", options);
    setDate(today);
  };

  useEffect(() => {
    formatDate(); // Formata a data ao montar o componente
  }, []);

  return <p>{date}</p> /* Exibe a data formatada */;
};

export default DateDisplay;
