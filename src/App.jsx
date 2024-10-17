import { ToastContainer } from "react-toastify";
import FirstSection from "./components/FirstSection";
import AdicionarGasto from "./components/Form";
import Navbar from "./components/Navbar/index";
import SecondSection from "./components/SecondSection";

import React, { useState, useEffect } from "react";
import Grid from "./components/Grid";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function App() {
  const [gastos, setGastos] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getGastos = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setGastos(res.data);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getGastos();
  }, [setGastos]);

  return (
    <div className="app">
      <Navbar />
      <FirstSection />
      <SecondSection />
      <AdicionarGasto
        onEdit={onEdit}
        setOnEdit={setOnEdit}
        getGastos={getGastos}
      />
      <Grid gastos={gastos} setGastos={setGastos} setOnEdit={setOnEdit} />
      <ToastContainer />
    </div>
  );
}

export default App;
