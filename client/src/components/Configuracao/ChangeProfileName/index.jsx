import { useState } from "react";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputSettings from "../InputSettings/index";
import api from "../../../services/api"; // Importando a instância do axios

export default function ChangeProfileNameSection({ setAtualizar }) {
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState(
    localStorage.getItem("nomeUsuario") || ""
  );

  const handleUpdateName = async () => {
    if (!nome.trim()) {
      toast.error("O nome não pode estar vazio!");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Você precisa estar logado.");
      return;
    }

    setLoading(true);

    try {
      // Usando a instância do Axios (api)
      const response = await api.put("/usuarios/update-name", { nome });

      if (response.data.success) {
        toast.success("Nome atualizado com sucesso!");
        localStorage.setItem("nomeUsuario", nome);
        setUserName(nome);
        setAtualizar((prev) => !prev);
        setNome("");
      } else {
        toast.error("Erro ao atualizar nome!");
      }
    } catch (error) {
      console.error("Erro ao atualizar nome:", error);
      toast.error("Erro ao atualizar nome!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.container}>
      <InputSettings
        label="Nome completo"
        placeholder="Novo nome completo"
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        onSubmit={!loading ? handleUpdateName : null} // Evita cliques múltiplos
        nameButton={loading ? "Alterando..." : "Alterar"}
      />
    </section>
  );
}
