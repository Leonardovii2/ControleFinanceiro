import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
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
import useGastos from "./assets/Hooks/useGastos";

function App() {
  const [onEdit, setOnEdit] = useState(null);
  const navigate = useNavigate();
  const { gastos, setGastos, getGastos } = useGastos(navigate);

  const isAuthenticated = localStorage.getItem("token");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
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
            <ProtectedRoute>
              <Home
                onEdit={onEdit}
                setOnEdit={setOnEdit}
                getGastos={getGastos}
                gastos={gastos}
                setGastos={setGastos}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/relatorio"
          element={
            <ProtectedRoute>
              <Relatorio />
            </ProtectedRoute>
          }
        />
        <Route
          path="/configuracao"
          element={
            <ProtectedRoute>
              <Configuracao />
            </ProtectedRoute>
          }
        />
        <Route
          path="/carteira"
          element={
            <ProtectedRoute>
              <Carteira />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
