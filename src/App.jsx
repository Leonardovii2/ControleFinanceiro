import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home/index";
import Login from "./pages/Login/index";
import Register from "./pages/Register/index";
import RequestPassword from "./pages/RequestPassword";
import ResetPassword from "./pages/ResetPassword";
import Relatorio from "./pages/Relatorio/index";
import Carteira from "./pages/Carteira";
import Configuracao from "./pages/Configuracao/index";
import useGastos from "./assets/Hooks/useGastos";

function App() {
  const [onEdit, setOnEdit] = useState(null);
  const { gastos, setGastos, getGastos } = useGastos();

  return (
    <Router>
      <div className="app">
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/requestPassword" element={<RequestPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/" element={<Navigate to="/login" />} />
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
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/relatorio"
            element={
              localStorage.getItem("token") ? (
                <Relatorio />
              ) : (
                <Navigate to="/login" />
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
