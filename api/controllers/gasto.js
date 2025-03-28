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

// Função para atualizar total de gastos
const updateTotalGastos = (usuarioId, res) => {
  const q =
    "SELECT SUM(CAST(valor AS DECIMAL)) AS totalgastos FROM gastos WHERE usuarioId = $1";
  db.query(q, [usuarioId], (err, result) => {
    if (err) {
      console.error("Erro ao calcular total de gastos:", err);
      return res
        .status(500)
        .json({ message: "Erro ao calcular total de gastos." });
    }

    const totalGastos = result.rows[0]?.totalgastos
      ? parseFloat(result.rows[0].totalgastos)
      : 0;
    console.log("Total de gastos atualizado:", totalGastos);
    // Aqui você pode fazer o que for necessário com o total de gastos, como armazenar em um campo do usuário, por exemplo.
  });
};

export const getGastos = (req, res) => {
  console.log("Requisição recebida para /gastos");

  const mes = req.query.mes || new Date().toISOString().slice(0, 7);

  const q =
    "SELECT * FROM gastos WHERE usuarioId = $1 AND TO_CHAR(data_gasto, 'YYYY-MM') = $2 ORDER BY data_gasto DESC";

  db.query(q, [req.user.id, mes], (err, result) => {
    if (err) {
      console.error("Erro ao acessar o banco de dados:", err);
      return res
        .status(500)
        .json({ message: "Ocorreu um erro ao acessar o banco de dados." });
    }

    console.log("Dados recebidos:", result.rows);

    return res.status(200).json(result.rows);
  });
};

export const addGasto = (req, res) => {
  const { categoria, descricao, valor } = req.body;

  // Validação dos campos obrigatórios
  const validation = validateGasto(req.body);
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  // Verifica o formato de valor (se é um número válido)
  if (isNaN(valor) || valor <= 0) {
    return res.status(400).json({
      message: "O valor do gasto deve ser um número válido maior que zero.",
    });
  }

  // Não precisa validar ou enviar data_gasto, pois o banco vai preencher automaticamente
  const mes = new Date().toISOString().slice(0, 7); // Mes atual

  const q =
    "INSERT INTO gastos (categoria, descricao, valor, usuarioId, data_gasto, mes) VALUES ($1, $2, $3, $4, DEFAULT, $5) RETURNING id";

  db.query(
    q,
    [categoria, descricao, valor, req.user.id, mes],
    (err, result) => {
      if (err) {
        console.error("Erro ao adicionar o gasto:", err);
        return res.status(500).json({
          message: "Ocorreu um erro ao adicionar o gasto.",
          error: err.message, // Retornar a mensagem do erro para depuração
        });
      }

      // Atualiza o total de gastos após adicionar o gasto
      updateTotalGastos(req.user.id, res);

      return res.status(201).json({
        message: "Gasto adicionado com sucesso.",
        id: result.rows[0].id, // Retorna o id do gasto adicionado
      });
    }
  );
};

export const updateGasto = (req, res) => {
  const { categoria, descricao, valor } = req.body;

  const validation = validateGasto(req.body);
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  const checkQuery = "SELECT * FROM gastos WHERE id = $1 AND usuarioId = $2";
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

      updateTotalGastos(req.user.id, res); // Atualizar total de gastos após editar
      return res.status(200).json({ message: "Gasto atualizado com sucesso." });
    });
  });
};

export const deleteGasto = (req, res) => {
  const q = "DELETE FROM gastos WHERE id = $1 AND usuarioId = $2";
  db.query(q, [req.params.id, req.user.id], (err) => {
    if (err) {
      console.error("Erro ao deletar o gasto:", err);
      return res
        .status(500)
        .json({ message: "Ocorreu um erro ao deletar o gasto." });
    }

    updateTotalGastos(req.user.id, res); // Atualizar total de gastos após excluir
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

  const mes = req.query.mes || new Date().toISOString().slice(0, 7); // Obtém o mês no formato YYYY-MM

  const q =
    "SELECT SUM(CAST(valor AS DECIMAL)) AS totalgastos FROM gastos WHERE usuarioId = $1 AND TO_CHAR(data_gasto, 'YYYY-MM') = $2";

  db.query(q, [req.user.id, mes], (err, result) => {
    if (err) {
      console.error("Erro ao acessar o banco de dados:", err.message);
      return res
        .status(500)
        .json({ message: "Erro ao acessar o banco de dados." });
    }

    // Se não houver gastos, o total será 0
    const totalGastos = result.rows[0]?.totalgastos
      ? parseFloat(result.rows[0].totalgastos)
      : 0;

    console.log("Total de gastos para o mês", mes, ":", totalGastos);

    return res.status(200).json({ totalGastos });
  });
};
