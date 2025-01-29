import { useState } from "react";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputSettings from "../InputSettings";

export default function AddSalary({ setAtualizarSalario }) {
  const [salario, setSalario] = useState();
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
        body: JSON.stringify({ salario }),
      });

      const data = await response.json();

      // Se a resposta não for OK, lançar um erro
      if (!response.ok) {
        throw new Error(`Erro: ${data.message || "Erro desconhecido"}`);
      }

      // Checando a resposta de sucesso do backend
      if (data.message === "Salário atualizado com sucesso!") {
        toast.success("Salário atualizado com sucesso!");
        setAtualizarSalario((prev) => !prev);
        setSalario(0);
      } else {
        toast.error("Erro ao atualizar o salário!");
      }
    } catch (error) {
      console.error("Erro ao atualizar o salário:", error);
      toast.error(error.message || "Erro ao atualizar o salário!");
    }

    setLoading(false);
  };

  return (
    <form className={styles.container}>
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
