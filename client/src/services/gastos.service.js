import api from "../api";

export const gastosService = {
  listarPorMes: (mes) => api.get(`/gastos?mes=${mes}`),
  totalPorMes: (mes) => api.get(`/gastos/totalGastos?mes=${mes}`),
  replicarFixos: () => api.post("/gastos/replicar-fixos"),
  remover: (id) => api.delete(`/gastos/${id}`),
};
