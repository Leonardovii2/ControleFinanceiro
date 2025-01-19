import React from "react";
import Grid from "../../components/Grid";
import Modal from "../../components/Form";
import styles from "./styles.module.css";

export default function ThirdSection({
  gastos,
  setGastos,
  getGastos,
  onEdit,
  setOnEdit,
  atualizarTotal,
  isModalOpen,
  setIsModalOpen,
}) {
  // Função para abrir o modal de edição
  const handleEditClick = (gasto) => {
    console.log('Edit clicked', gasto); // Verificar se o gasto correto é passado
    setOnEdit(gasto); // Passa os dados do gasto para o estado onEdit
    setIsModalOpen(true); // Abre o modal
  };

  const openModal = () => {
    setOnEdit(null); // Garante que o onEdit esteja vazio ao abrir o modal para adicionar novo gasto
    setIsModalOpen(true); // Abre o modal para adicionar novo gasto
  };

  return (
    <section className={styles.section}>
      <div className={styles.buttonContainer}>

        <div className={styles.transactioninformation}>
          <h2>Transações</h2>

          <button className={styles.addButton} onClick={openModal}>
            Adicionar Gasto
          </button>
        </div>

        <Grid
          gastos={gastos}
          setGastos={setGastos}
          getGastos={getGastos}
          setOnEdit={setOnEdit}
          atualizarTotal={atualizarTotal}
          handleEditClick={handleEditClick} // Passando a função de editar para o Grid
        />
      </div>

      {isModalOpen && (
        <Modal
          onEdit={onEdit} // Passa o gasto selecionado para o modal
          setOnEdit={setOnEdit}
          getGastos={getGastos}
          atualizarTotal={atualizarTotal}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </section>
  );
}
