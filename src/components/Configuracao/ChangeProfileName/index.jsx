import { useState } from "react";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputSettings from "../InputSettings";

export default function ChangeProfileNameSection({ setAtualizar }) {
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );

  const handleUpdateName = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Você precisa estar logado.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8801/usuarios/update-name",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ nome }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Nome atualizado com sucesso!");
        localStorage.setItem("nomeUsuario", nome);
        setAtualizar((prev) => !prev);
        setNome("");
      } else {
        toast.error("Erro ao atualizar nome!");
      }
    } catch (error) {
      console.error("Erro ao atualizar nome:", error);
      alert("Erro ao atualizar nome!");
    }

    setLoading(false);
  };

  return (
    <section className={styles.container}>
      <InputSettings
        label="Nome"
        placeholder="Nome"
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        onSubmit={handleUpdateName}
        nameButton="Alterar"
        nameLoading="Alterando"
      />
    </section>
  );
}
