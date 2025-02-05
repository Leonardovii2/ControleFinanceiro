import { useState } from "react";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
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
      const response = await fetch("http://localhost:8801/usuarios/salario", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ salario: salarioNumerico }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro desconhecido");
      }

      toast.success("Salário atualizado com sucesso!");
      setAtualizarSalario(true); // 🚀 Agora a interface será atualizada
      setSalario("");
    } catch (error) {
      console.error("Erro ao atualizar o salário:", error);
      toast.error(error.message || "Erro ao atualizar o salário!");
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
