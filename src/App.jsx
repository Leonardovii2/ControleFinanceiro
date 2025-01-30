import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home/index";
import Login from "./pages/Login/index";
import Register from "./pages/Register/index";

import RequestPassword from "./pages/RequestPassword";
import ResetPassword from "./pages/ResetPassword";

import Relatorio from "./pages/Relatorio/index";
import Carteira from "./pages/Carteira";
import Configuracao from "./pages/Configuracao/index";

function App() {
  const [gastos, setGastos] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  // Função para buscar gastos
  const getGastos = async () => {
    try {
      const response = await fetch("/gastos", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Erro ao buscar gastos");
      const data = await response.json();
      setGastos(data); // Atualiza o estado com os dados recebidos
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect para buscar gastos uma vez quando o componente é montado
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getGastos();
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/requestPassword" element={<RequestPassword />} />{" "}
          <Route path="/resetPassword" element={<ResetPassword />} />{" "}
          {/* Rota de Esqueci minha senha */}
          <Route
            path="/"
            element={<Navigate to="/login" />} // Redireciona para a tela de login
          />
          <Route
            path="/home"
            element={
              localStorage.getItem("token") ? (
                <Home
                  onEdit={onEdit}
                  setOnEdit={setOnEdit}
                  getGastos={getGastos}
                  gastos={gastos}
                  setGastos={setGastos}
                />
              ) : (
                <Navigate to="/login" /> // Redireciona para a tela de login se não houver token
              )
            }
          />
          <Route
            path="/relatorio"
            element={
              localStorage.getItem("token") ? (
                <Relatorio />
              ) : (
                <Navigate to="/relatorio" />
              )
            }
          />
          <Route
            path="/configuracao"
            element={
              localStorage.getItem("token") ? (
                <Configuracao />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/carteira"
            element={
              localStorage.getItem("token") ? (
                <Carteira />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
