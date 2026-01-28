import dayjs from "dayjs";

export function processarGastos(gastos, mesAtual) {
  return gastos.flatMap((gasto) => {
    if (gasto.fixo && gasto.parcelas > 1) {
      const dataCompra = dayjs(gasto.data_gasto).startOf("month");
      const diffMeses = mesAtual.diff(dataCompra, "month");

      if (diffMeses >= 0 && diffMeses < gasto.parcelas) {
        return [
          {
            ...gasto,
            id: `${gasto.id}-${diffMeses + 1}`,
            parcelaAtual: diffMeses + 1,
            data_gasto: mesAtual.toISOString(),
            valor: gasto.valor / gasto.parcelas,
          },
        ];
      }
      return [];
    }

    return [
      {
        ...gasto,
        valor: gasto.parcelas > 1 ? gasto.valor / gasto.parcelas : gasto.valor,
      },
    ];
  });
}

export function calcularInvestimentos(gastos) {
  return gastos
    .filter((g) => g.categoria === "Investimento")
    .reduce((acc, g) => acc + Number(g.valor), 0);
}
