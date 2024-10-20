import { db } from "../db.js";

// Função para validar dados
const validateGasto = (gasto) => {
  const { categoria, descricao, valor } = gasto;
  if (!categoria || !descricao || valor === undefined) {
    return { valid: false, message: "Todos os campos são obrigatórios." };
  }
  if (typeof valor !== "number" || valor <= 0) {
    return { valid: false, message: "O valor deve ser um número positivo." };
  }
  return { valid: true };
};

export const getGastos = (req, res) => {
  console.log("Requisição recebida para /gastos");
  const q = "SELECT * FROM gastos WHERE usuarioId = ?"; // Verifique se esta consulta está correta

  db.query(q, [req.user.id], (err, data) => {
    if (err) {
      console.error("Erro ao acessar o banco de dados:", err);
      return res.status(500).json({ message: "Ocorreu um erro ao acessar o banco de dados." });
    }
    console.log("Dados recebidos:", data); // Mostre os dados recebidos
    if (data.length === 0) {
      return res.status(404).json({ message: "Nenhum gasto encontrado." });
    }
    return res.status(200).json(data);
  });
};

export const addGasto = (req, res) => {
  const { categoria, descricao, valor } = req.body;

  const validation = validateGasto(req.body);
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  const q =
    "INSERT INTO gastos (`categoria`, `descricao`, `valor`, `usuarioId`) VALUES (?, ?, ?, ?)"; // Adiciona usuarioId
  db.query(q, [categoria, descricao, valor, req.user.id], (err, result) => {
    if (err) {
      console.error("Erro ao adicionar o gasto:", err);
      return res
        .status(500)
        .json({ message: "Ocorreu um erro ao adicionar o gasto." });
    }
    return res
      .status(201)
      .json({ message: "Gasto adicionado com sucesso.", id: result.insertId });
  });
};

export const updateGasto = (req, res) => {
  const { categoria, descricao, valor } = req.body;

  const validation = validateGasto(req.body);
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  const checkQuery = "SELECT * FROM gastos WHERE `id` = ? AND usuarioId = ?"; // Verifique se o gasto pertence ao usuário
  db.query(checkQuery, [req.params.id, req.user.id], (err, results) => {
    if (err) {
      console.error("Erro ao verificar o gasto:", err);
      return res
        .status(500)
        .json({ message: "Ocorreu um erro ao verificar o gasto." });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "Gasto não encontrado ou não pertence ao usuário." });
    }

    const q =
      "UPDATE gastos SET `categoria` = ?, `descricao` = ?, `valor` = ? WHERE `id` = ?";
    db.query(q, [categoria, descricao, valor, req.params.id], (err) => {
      if (err) {
        console.error("Erro ao atualizar o gasto:", err);
        return res
          .status(500)
          .json({ message: "Ocorreu um erro ao atualizar o gasto." });
      }
      return res.status(200).json({ message: "Gasto atualizado com sucesso." });
    });
  });
};

export const deleteGasto = (req, res) => {
  const q = "DELETE FROM gastos WHERE `id` = ? AND usuarioId = ?"; // Verifique se o gasto pertence ao usuário
  db.query(q, [req.params.id, req.user.id], (err) => {
    if (err) {
      console.error("Erro ao deletar o gasto:", err);
      return res
        .status(500)
        .json({ message: "Ocorreu um erro ao deletar o gasto." });
    }
    return res
      .status(200)
      .json({ message: "Gasto deletado com sucesso.", id: req.params.id });
  });
};
