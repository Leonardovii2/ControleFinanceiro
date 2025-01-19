import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FirstSection from "../../components/FirstSection";
import NavBar from "../../components/Navbar";
import api from "../../services/api"; // 🛑 Importa o Axios configurado
import TotalSection from "../../components/SecondSection";
import ThirdSection from "../../components/ThirdSection";
import SecondSection from "../../components/Pig"

const Home = () => {
  const [gastos, setGastos] = useState([]);
  const [atualizar, setAtualizar] = useState(false);
  const [onEdit, setOnEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Adicionado estado do modal
  const navigate = useNavigate();

  const getGastos = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const { data } = await api.get("http://localhost:8801/gastos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGastos(data);
    } catch (error) {
      console.error("Erro ao buscar gastos:", error);
    }
  };

  useEffect(() => {
    const nome = localStorage.getItem("nomeUsuario");
    getGastos();
  }, []);

  return (
    <>
      <NavBar />
      <FirstSection />
      <SecondSection/>
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
    </>
  );
};

export default Home;
