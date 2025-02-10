import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

export default function useForm({
  onEdit,
  setOnEdit,
  setIsModalOpen,
  atualizarTotal,
  getGastos,
}) {
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [valor, setValor] = useState("");

  const categorias = [
    "Mercado",
    "Saúde",
    "Lazer",
    "Educação",
    "Transporte",
    "Moradia",
    "Roupas",
  ];

  useEffect(() => {
    if (onEdit) {
      setDescricao(onEdit.descricao || "");
      setCategoria(onEdit.categoria || "");
      setValor(String(onEdit.valor || "")); // Garantindo que o valor seja string para evitar problemas em inputs
    } else {
      limparCampos();
    }
  }, [onEdit]);

  const limparCampos = () => {
    setDescricao("");
    setCategoria("");
    setValor("");
    setOnEdit(null);
  };

  const fecharModal = () => {
    limparCampos();
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!descricao || !categoria || !valor) {
      return toast.warn("Preencha todos os campos!");
    }

    const parsedValor = parseFloat(valor.replace(",", "."));
    if (isNaN(parsedValor) || parsedValor <= 0) {
      return toast.warn("O valor deve ser um número maior que zero!");
    }

    const token = localStorage.getItem("token");
    if (!token) {
      return toast.error("Você precisa estar logado para adicionar um gasto.");
    }

    const dataGasto = new Date().toISOString().split("T")[0];
    const payload = {
      descricao,
      categoria,
      valor: parsedValor,
      data_gasto: dataGasto,
    };

    try {
      let response;
      if (onEdit) {
        response = await axios.put(
          `http://localhost:8801/gastos/${onEdit.id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        response = await axios.post("http://localhost:8801/gastos", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      toast.success(response.data.message);

      await getGastos(); // Atualiza os gastos do backend
      atualizarTotal();
      fecharModal();
    } catch (error) {
      console.error("Erro ao salvar gasto:", error);
      toast.error(error.response?.data?.message || "Erro inesperado!");
    }
  };

  return {
    categorias,
    descricao,
    setDescricao,
    categoria,
    setCategoria,
    valor,
    setValor,
    handleSubmit,
  };
}
