import React from "react";
import { useExpensesByCategory } from "../../hooks/useExpensesByCategory";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpensesByCategory({ gastos }) {
  const categorias = useExpensesByCategory(gastos); // Recebe o array de categorias com gastos totais

  // Se não houver dados, retorna uma mensagem de "No data available"
  if (categorias.length === 0) {
    return <p>No data available for this chart.</p>;
  }

  // Preparar os dados para o gráfico
  const data = {
    labels: categorias.map((item) => item.categoria),
    datasets: [
      {
        data: categorias.map((item) => item.valor),
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffcd56",
          "#4bc0c0",
          "#f8c8dc",
        ],
        hoverBackgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffcd56",
          "#4bc0c0",
          "#f8c8dc",
        ],
      },
    ],
  };

  return (
    <div style={{ maxWidth: "300px", width: "100%" }}>
      <h3>Gastos por Categoria</h3>
      <Pie data={data} />
    </div>
  );
}
