import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";

import styles from "./styles.module.css";

export default function AdicionarGasto({ onEdit, getGastos, setOnEdit }) {
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

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          descricao: gasto.descricao.value,
          categoria: gasto.categoria.value,
          valor: gasto.valor.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          descricao: gasto.descricao.value,
          categoria: gasto.categoria.value,
          valor: gasto.valor.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    gasto.descricao.value = "";
    gasto.categoria.value = "";
    gasto.valor.value = "";

    setOnEdit(null);
    getGastos();
  };

  return (
    <form className={styles.contant} ref={ref} onSubmit={handleSubmit}>
      <div className={styles.container}>
        <div>
          <label>Descrição</label>
          <input
            className={styles.input}
            name="descricao"
            id="descricao"
            type="text"
          />
        </div>
        <div>
          <label>Categoria</label>
          <input className={styles.input} name="categoria" type="text" />
        </div>
        <div>
          <label>Valor</label>
          <input className={styles.input} name="valor" id="valor" type="text" />
        </div>

        <button className={styles.button} type="submit">
          Salvar
        </button>
      </div>
    </form>
  );
}
