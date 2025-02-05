import React from "react";
import FirstSection from "../../components/FirstSection";
import NavBar from "../../components/Navbar";
import TotalSection from "../../components/SecondSection";
import ThirdSection from "../../components/ThirdSection";
import SecondSection from "../../components/Pig";

import styles from "./styles.module.css";
import useHome from "../../assets/Hooks/useHome";

const Home = () => {
  const {
    atualizar,
    gastos,
    isModalOpen,
    onEdit,
    setAtualizar,
    setIsModalOpen,
    setOnEdit,
    getGastos,
    setGastos,
  } = useHome();
  return (
    <div className={styles.container}>
      <NavBar />
      <FirstSection />
      <SecondSection />
      <TotalSection atualizar={atualizar} gastos={gastos} />
      <ThirdSection
        gastos={gastos}
        setGastos={setGastos}
        getGastos={getGastos}
        onEdit={onEdit}
        setOnEdit={setOnEdit}
        atualizarTotal={() => setAtualizar((prev) => !prev)}
        isModalOpen={isModalOpen} // Passando o estado para ThirdSection
        setIsModalOpen={setIsModalOpen} // Passando a função para ThirdSection
      />
    </div>
  );
};

export default Home;
