import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/api";
import { FaChevronRight } from "react-icons/fa";
import Modal from "../../components/Modal";
import ModalConfirm from "../../components/ModalConfirm";
import Navbar from "../../components/Navbar/index";
import FinancialDashboardHeader from "../../components/FinancialDashboardHeader";

const fields = ["nome", "salario"];

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const Settings = () => {
  const [userData, setUserData] = useState({ nome: "", salario: "" });
  const [newUserData, setNewUserData] = useState({ nome: "", salario: "" });
  const [modals, setModals] = useState({ nome: false, salario: false });
  const [confirm, setConfirm] = useState({
    show: false,
    field: null,
    event: null,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/usuarios/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData({
          nome: response.data.nome,
          salario: response.data.salario || "",
        });
      } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
        toast.error("Erro ao buscar os dados do usuário.");
      }
    };

    fetchUserData();
  }, []);

  const setModalState = (field, isOpen) => {
    setModals((prev) => ({
      ...prev,
      [field]: isOpen,
    }));

    setNewUserData((prevData) => ({
      ...prevData,
      [field]: isOpen ? userData[field] : "",
    }));
  };

  const handleInputChange = (field, value) => {
    setNewUserData((prev) => ({ ...prev, [field]: value }));
  };

  const openConfirmModal = (event, field) => {
    event.preventDefault();
    setConfirm({ show: true, field, event });
    setModalState(field, false);
  };

  const handleConfirm = () => {
    const { field, event } = confirm;
    if (field && event) handleSubmit(event, field);
    setConfirm({ show: false, field: null, event: null });
  };

  const handleCancel = () => {
    setConfirm({ show: false, field: null, event: null });
  };

  const handleSubmit = async (event, field) => {
    event.preventDefault();

    // Verificar se o campo tem valor
    if (!newUserData[field] || newUserData[field].trim() === "") {
      toast.error(`${capitalize(field)} não pode ser vazio.`);
      return;
    }

    const token = localStorage.getItem("token");
    const endpoints = {
      nome: "/usuarios/update-name",
      salario: "/usuarios/salario",
    };

    // Formatando os dados corretamente
    const updatedData = {
      [field]: newUserData[field],
    };

    try {
      console.log("Enviando dados para o backend:", updatedData);

      // Enviando a requisição PUT
      const response = await api.put(
        endpoints[field],
        updatedData, // Aqui estamos passando o objeto já formatado
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        toast.success(`${capitalize(field)} atualizado com sucesso!`);
        setUserData((prev) => ({ ...prev, [field]: newUserData[field] }));
        setModalState(field, false); // Fecha o modal após sucesso
      } else {
        toast.error(`Erro ao atualizar ${capitalize(field)}.`);
      }
    } catch (error) {
      console.error("Erro na atualização:", error);
      toast.error(
        `Erro ao atualizar ${capitalize(field)}: ${error.message || error}`
      );
    }
  };

  return (
    <main className={styles.container}>
      <ToastContainer />

      <section>
        <Navbar />
        <FinancialDashboardHeader />
      </section>

      <section className={styles.firstSectionTest}>
        <div className={styles.cardContainer}>
          <div className={styles.divFirstCardContainer}>
            <h3>{userData.nome}</h3>
            <p>SeusGastos</p>
          </div>

          <div className={styles.card}>
            {fields.map((field) => (
              <div
                key={field}
                className={styles.contentChangeName}
                onClick={() => setModalState(field, true)}
              >
                {capitalize(field)}
                <FaChevronRight className="icon" />
              </div>
            ))}
          </div>
        </div>

        {fields.map((field) => (
          <Modal
            key={field}
            isOpen={modals[field]}
            closeModal={() => setModalState(field, false)}
            onSubmit={(e) => openConfirmModal(e, field)}
            label={`${capitalize(field)}:`}
            value={newUserData[field]}
            setValue={(value) => handleInputChange(field, value)}
            placeholder={`Novo ${capitalize(field)}`}
          />
        ))}

        {confirm.show && (
          <ModalConfirm
            message="Confirmar ação"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </section>
    </main>
  );
};

export default Settings;
