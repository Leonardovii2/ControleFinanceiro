import { useState, useEffect } from "react";
import api from "../../services/api"; // Instância do axios

export default function useGastos(navigate) {
  const [gastos, setGastos] = useState([]);

  const getGastos = async () => {
    try {
      const response = await api.get("/gastos"); // Faz a requisição usando a instância da API
      setGastos(response.data); // Atualiza o estado com os dados recebidos
    } catch (error) {
      if (error.response?.status === 401) {
        // Caso o token esteja expirado ou ausente (erro 401)
        navigate("/login"); // Navegar para a página de login
      } else {
        console.error("Erro ao buscar gastos:", error);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getGastos(); // Chama a função para obter os gastos
    } else {
      navigate("/login"); // Caso o token não exista, redireciona para o login
    }
  }, [navigate]);

  return { gastos, setGastos, getGastos };
}
