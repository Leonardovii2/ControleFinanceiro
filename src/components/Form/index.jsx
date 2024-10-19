import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";

import styles from "./styles.module.css";

export default function AdicionarGasto({ onEdit, getGastos, setOnEdit, setGastos }) {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const gasto = ref.current;

      gasto.descricao.value = onEdit.descricao;
      gasto.categoria.value = onEdit.categoria;
      gasto.valor.value = onEdit.valor;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const gasto = ref.current;

    if (
      !gasto.descricao.value ||
      !gasto.categoria.value ||
      !gasto.valor.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    const valor = parseFloat(gasto.valor.value);
    if (isNaN(valor)) {
      return toast.warn("O valor deve ser um número válido!");
    }

    try {
      if (onEdit) {
        const { data } = await axios.put(`http://localhost:8800/gastos/${onEdit.id}`, {
          descricao: gasto.descricao.value,
          categoria: gasto.categoria.value,
          valor: valor,
        });
        toast.success(data.message); // Supondo que o backend retorne uma mensagem
      } else {
        const { data } = await axios.post("http://localhost:8800/gastos", {
          descricao: gasto.descricao.value,
          categoria: gasto.categoria.value,
          valor: valor,
        });
        toast.success(data.message); // Supondo que o backend retorne uma mensagem
      }

      // Limpa os campos após a adição/edição
      gasto.descricao.value = "";
      gasto.categoria.value = "";
      gasto.valor.value = "";

      setOnEdit(null);
      getGastos();
    } catch (error) {
      const message = error.response ? error.response.data.message : "Erro inesperado ao salvar!";
      toast.error(message); // Mostra a mensagem de erro
    }
  };

  return (
    <form className={styles.contant} ref={ref} onSubmit={handleSubmit}>
      <div className={styles.container}>
        <div>
          <label className={styles.labelStyle}>Descrição</label>
          <input
            className={styles.input}
            name="descricao"
            id="descricao"
            type="text"
          />
        </div>
        <div>
          <label className={styles.labelStyle}>Categoria</label>
          <input className={styles.input} name="categoria" type="text" />
        </div>
        <div>
          <label className={styles.labelStyle}>Valor</label>
          <input className={styles.input} name="valor" id="valor" type="text" />
        </div>

        <button className={styles.button} type="submit">
          Adicionar
        </button>
      </div>
    </form>
  );
}
