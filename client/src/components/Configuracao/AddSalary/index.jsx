import { useState } from "react";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import api from "../../../services/api"; // Importando a instância do axios
import "react-toastify/dist/ReactToastify.css";
import InputSettings from "../InputSettings/index";

export default function AddSalary({ setAtualizarSalario }) {
  const [salario, setSalario] = useState("");
  const [loading, setLoading] = useState(false);

  const atualizarSalario = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado.");
      return;
    }

    const salarioNumerico = parseFloat(salario);
    if (isNaN(salarioNumerico) || salarioNumerico <= 0) {
      toast.error("Por favor, insira um valor válido para o salário.");
      return;
    }

    setLoading(true);

    try {
      // Usando a instância personalizada do Axios (api)
      const response = await api.put("/usuarios/salario", {
        salario: salarioNumerico,
      });

      toast.success("Salário atualizado com sucesso!");
      setAtualizarSalario(true); // 🚀 Agora a interface será atualizada
      setSalario("");
    } catch (error) {
      console.error("Erro ao atualizar o salário:", error);
      toast.error(
        error.response?.data?.message || "Erro ao atualizar o salário!"
      );
    }

    setLoading(false);
  };

  return (
    <form className={styles.container} onSubmit={(e) => e.preventDefault()}>
      <InputSettings
        label="Salário"
        value={salario}
        onChange={(e) => setSalario(e.target.value)}
        onSubmit={atualizarSalario}
        loading={loading}
        placeholder="ex. 1000"
        id="salario"
        nameButton="Adicionar"
      />
    </form>
  );
}
