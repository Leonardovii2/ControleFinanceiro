import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"; 
import { ToastContainer } from "react-toastify";
import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { toast } from "react-toastify";

import Home from "./pages/Home/index";
import Login from "./pages/Login/index";
import Register from "./pages/Register/index";

function App() {
  const [gastos, setGastos] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  // Função para buscar gastos
  const getGastos = async () => {
    try {
      const res = await axios.get("http://localhost:8800/gastos");
      console.log(res.data);
      setGastos(res.data);
    } catch (error) {
      console.error("Erro ao buscar gastos", error);
      toast.error("Erro ao buscar gastos.");
    }
  };

  // useEffect para buscar gastos uma vez quando o componente é montado
  useEffect(() => {
    getGastos();
  }, []); 

  return (
    <Router>
      <div className="app">
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={<Navigate to="/login" />} // Redireciona para a tela de login
          />
          <Route
            path="/home"
            element={
              <Home
                onEdit={onEdit}
                setOnEdit={setOnEdit}
                getGastos={getGastos}
                gastos={gastos}
                setGastos={setGastos}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
