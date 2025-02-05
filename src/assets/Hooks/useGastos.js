import { useState, useEffect } from "react";

export default function useGastos() {
  // Função de hook definida corretamente
  const [gastos, setGastos] = useState([]);

  const getGastos = async () => {
    try {
      const response = await fetch("/gastos", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Erro ao buscar gastos");
      const data = await response.json();
      setGastos(data); // Atualiza o estado com os dados recebidos
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getGastos();
    }
  }, []);

  return { gastos, getGastos, setGastos }; // Retorna o estado e a função para atualizar
}
