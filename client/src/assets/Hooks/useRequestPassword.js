import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api"; // Importando a instância do axios

export default function useRequestPassword(service = "gmail") {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordResetRequest = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Por favor, insira um e-mail válido.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/requestPassword/request", {
        // Usando a instância api
        email,
        service,
      });

      const data = response.data;
      if (response.status === 200) {
        toast.success(data.message);
      } else {
        toast.error(
          data.message || "Erro ao solicitar a redefinição de senha."
        );
      }
    } catch (error) {
      console.error("Erro ao enviar solicitação de senha:", error);
      toast.error("Erro ao processar a solicitação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const returnToClick = () => navigate("/login");

  return {
    email,
    setEmail,
    loading,
    handlePasswordResetRequest,
    returnToClick,
  };
}
