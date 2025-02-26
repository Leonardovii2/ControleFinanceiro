import { useEffect, useState } from "react";

export function useExpensesByCategory(gastos) {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    if (gastos && gastos.length > 0) {
      // Agrupar os gastos por categoria
      const categoriasMap = gastos.reduce((acc, { categoria, valor }) => {
        acc[categoria] = (acc[categoria] || 0) + valor;
        return acc;
      }, {});

      // Converter para um formato de array com categoria e valor
      const categoriasArray = Object.keys(categoriasMap).map((categoria) => ({
        categoria,
        valor: categoriasMap[categoria],
      }));

      setCategorias(categoriasArray);
    } else {
      setCategorias([]); // Caso não haja gastos, retorna um array vazio
    }
  }, [gastos]);

  return categorias;
}
