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
  const q =
    "SELECT * FROM gastos WHERE usuarioId = $1 ORDER BY data_gasto DESC"; // Ordena por data_gasto de forma decrescente

  db.query(q, [req.user.id], (err, result) => {
    if (err) {
      console.error("Erro ao acessar o banco de dados:", err);
      return res
        .status(500)
        .json({ message: "Ocorreu um erro ao acessar o banco de dados." });
    }

    console.log("Dados recebidos:", result.rows); // Mostrar os dados recebidos
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Nenhum gasto encontrado." });
    }
    return res.status(200).json(result.rows); // Retornar os gastos
  });
};

export const addGasto = (req, res) => {
  const { categoria, descricao, valor } = req.body;

  const validation = validateGasto(req.body);
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  const q =
    "INSERT INTO gastos (categoria, descricao, valor, usuarioId, data_gasto) VALUES ($1, $2, $3, $4, NOW()) RETURNING id"; // Inserir a data atual
  db.query(q, [categoria, descricao, valor, req.user.id], (err, result) => {
    if (err) {
      console.error("Erro ao adicionar o gasto:", err);
      return res
        .status(500)
        .json({ message: "Ocorreu um erro ao adicionar o gasto." });
    }
    return res.status(201).json({
      message: "Gasto adicionado com sucesso.",
      id: result.rows[0].id,
    });
  });
};

export const updateGasto = (req, res) => {
  const { categoria, descricao, valor } = req.body;

  const validation = validateGasto(req.body);
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  const checkQuery = "SELECT * FROM gastos WHERE id = $1 AND usuarioId = $2"; // Verifique se o gasto pertence ao usuário
  db.query(checkQuery, [req.params.id, req.user.id], (err, results) => {
    if (err) {
      console.error("Erro ao verificar o gasto:", err);
      return res
        .status(500)
        .json({ message: "Ocorreu um erro ao verificar o gasto." });
    }

    if (results.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Gasto não encontrado ou não pertence ao usuário." });
    }

    const q =
      "UPDATE gastos SET categoria = $1, descricao = $2, valor = $3 WHERE id = $4";
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
  const q = "DELETE FROM gastos WHERE id = $1 AND usuarioId = $2"; // Verifique se o gasto pertence ao usuário
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

export const getTotalGastos = (req, res) => {
  console.log(
    "Requisição recebida para /totalGastos, usuário ID:",
    req.user.id
  );

  const q =
    "SELECT SUM(CAST(valor AS DECIMAL)) AS totalgastos FROM gastos WHERE usuarioid = $1";
  db.query(q, [req.user.id], (err, result) => {
    if (err) {
      console.error("Erro ao acessar o banco de dados:", err);
      return res
        .status(500)
        .json({ message: "Erro ao acessar o banco de dados." });
    }

    // Converta totalgastos para um número
    const totalGastos = result.rows[0]?.totalgastos ? parseFloat(result.rows[0].totalgastos) : 0;
    console.log("Total de gastos:", totalGastos);
    return res.status(200).json({ totalGastos });
  });
};
