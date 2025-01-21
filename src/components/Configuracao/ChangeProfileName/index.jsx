import { useState } from "react";
import styles from "./styles.module.css";

export default function ChangeProfileNameSection() {
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );

  const handleUpdateName = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado.");
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
        alert("Nome atualizado com sucesso!");
        setUserName(nome);
        localStorage.setItem("userName", nome);
      } else {
        alert("Erro ao atualizar nome!");
      }
    } catch (error) {
      console.error("Erro ao atualizar nome:", error);
      alert("Erro ao atualizar nome!");
    }

    setLoading(false);
  };

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.nameContent}>
          <h2>Nome</h2>
          <input
            placeholder="Nome"
            type="text"
            value={nome}
            className={styles.input}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <button
          type="button"
          className={styles.changePhotoButton}
          onClick={handleUpdateName}
          disabled={loading}
        >
          {loading ? "Salvando..." : "Alterar Nome"}
        </button>
      </div>
    </section>
  );
}
