import React, { useState } from "react";
import FirstSection from "../../components/FirstSection";
import AdicionarGasto from "../../components/Form";
import SecondSection from "../../components/SecondSection";
import Grid from "../../components/Grid";
import NavBar from "../../components/Navbar/index";

const Home = ({ onEdit, setOnEdit, getGastos, gastos, setGastos }) => {
  return (
    <>
      <NavBar />
      <FirstSection />
      <SecondSection />
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
