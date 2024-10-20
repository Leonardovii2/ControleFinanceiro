import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import FirstSection from "../../components/FirstSection";
import AdicionarGasto from "../../components/Form";
import SecondSection from "../../components/SecondSection";
import Grid from "../../components/Grid";
import NavBar from "../../components/Navbar/index";
import axios from "axios"; 
import { toast } from "react-toastify"; 

const Home = () => {
  const [gastos, setGastos] = useState([]); 
  const [onEdit, setOnEdit] = useState(null); 
  const [nomeUsuario, setNomeUsuario] = useState("");
  const navigate = useNavigate(); 

  // Função para buscar gastos
  const getGastos = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get("http://localhost:8800/gastos", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setGastos(data); 
    } catch (error) {
      console.error("Erro ao buscar gastos:", error);
    }
  };



  // useEffect para verificar autenticação
  useEffect(() => {
    const token = localStorage.getItem("token");
    const nome = localStorage.getItem("nomeUsuario");

    if (!token) {
      navigate("/login"); // Redireciona para a tela de login se não houver token
    } else {
      setNomeUsuario(nome || "Usuário"); // Define o nome do usuário
      getGastos(); // Se houver token, busca os gastos
    }
  }, [navigate]);

  return (
    <>
      <NavBar />
      <FirstSection />
      <SecondSection nome={nomeUsuario} />
      <AdicionarGasto
        onEdit={onEdit}
        setOnEdit={setOnEdit}
        getGastos={getGastos} 
        setGastos={setGastos} 
      />
      <Grid gastos={gastos} setGastos={setGastos} setOnEdit={setOnEdit} />
    </>
  );
};

export default Home;
