import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

export default function ExpensesByCategory({ gastos }) {
  if (gastos.length === 0) {
    return <p>No data available for this chart.</p>;
  }

  // Certifica que cada valor é um número
  const gastosNumericos = gastos.map((item) => ({
    ...item,
    valor: Number(item.valor),
  }));

  // Calcula o total de gastos
  const totalGastos = gastosNumericos.reduce(
    (acc, item) => acc + item.valor,
    0
  );

  // Agrupa os gastos por categoria
  const categorias = gastosNumericos.reduce((acc, item) => {
    const existingCategory = acc.find(
      (cat) => cat.categoria === item.categoria
    );
    if (existingCategory) {
      existingCategory.valor += item.valor;
    } else {
      acc.push({ categoria: item.categoria, valor: item.valor });
    }
    return acc;
  }, []);

  // Função para calcular porcentagem com fallback se totalGastos for 0 e arredondando
  const calcPercentage = (valor) =>
    totalGastos > 0 ? Math.round((valor / totalGastos) * 100) : 0;

  const data = {
    labels: categorias.map((item) => item.categoria),
    datasets: [
      {
        data: categorias.map((item) => calcPercentage(item.valor)),
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

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: false, // Desativa o tooltip
      },
      legend: {
        position: "top",
        labels: {
          boxWidth: 20,
        },
      },
      datalabels: {
        color: "#fff",
        font: {
          weight: "bold",
        },
        formatter: function (value, context) {
          const totalValue = categorias[context.dataIndex].valor;
          const percentage = calcPercentage(totalValue);
          return `${percentage}%`; // Exibe apenas a porcentagem
        },
      },
    },
    animation: {
      animateScale: true, // Anima o gráfico ao carregar
    },
  };

  return (
    <div style={{ maxWidth: "300px", width: "100%" }}>
      <Pie data={data} options={options} />
    </div>
  );
}
