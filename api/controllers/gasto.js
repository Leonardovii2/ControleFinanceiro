import { db } from "../db.js";

// Validação dos dados
const validateGasto = (gasto) => {
  const { descricao, categoria, valor, metodo, parcelas } = gasto;

  // Campos obrigatórios gerais
  if (!descricao || !categoria || valor === undefined) {
    return { valid: false, message: "Todos os campos são obrigatórios." };
  }
  if (typeof valor !== "number" || valor <= 0) {
    return { valid: false, message: "O valor deve ser um número positivo." };
  }

  // Agora só validamos parcelas se for cartão de crédito
  if (metodo === "credito" && (!parcelas || parcelas < 1)) {
    return { valid: false, message: "Parcelas deve ser no mínimo 1." };
  }

  return { valid: true };
};

// Atualizar total de gastos
const updateTotalGastos = async (usuarioId) => {
  const q = `
    SELECT SUM(CAST(valor AS DECIMAL)) AS totalgastos 
    FROM gastos 
    WHERE usuarioId = $1
  `;
  try {
    const result = await db.query(q, [usuarioId]);
    const totalGastos = result.rows[0]?.totalgastos
      ? parseFloat(result.rows[0].totalgastos)
      : 0;
    console.log("Total de gastos atualizado:", totalGastos);
    return totalGastos;
  } catch (err) {
    console.error("Erro ao calcular total de gastos:", err);
    throw err;
  }
};

// Buscar gastos do mês (considera parcelados)
export const getGastos = async (req, res) => {
  const mes = req.query.mes || new Date().toISOString().slice(0, 7);
  const usuarioId = req.user.id;

  const q = `
    SELECT *
    FROM gastos
    WHERE usuarioId = $1
      AND (
        TO_CHAR(data_gasto, 'YYYY-MM') = $2
        OR (
          parcelas > 1 AND
          data_gasto <= ($2 || '-01')::date
          AND (data_gasto + interval '1 month' * (parcelas - 1)) >= ($2 || '-01')::date
        )
      )
    ORDER BY data_gasto DESC
  `;

  try {
    const result = await db.query(q, [usuarioId, mes]);
    const gastos = result.rows;

    const [anoConsulta, mesConsulta] = mes.split("-").map(Number);
    const gastosExpandido = [];

    gastos.forEach((gasto) => {
      if (gasto.parcelas && gasto.parcelas > 1) {
        const dataCompra = new Date(gasto.data_gasto);
        const anoCompra = dataCompra.getFullYear();
        const mesCompra = dataCompra.getMonth() + 1;

        const diffMeses =
          (anoConsulta - anoCompra) * 12 + (mesConsulta - mesCompra);

        if (diffMeses >= 0 && diffMeses < gasto.parcelas) {
          const valorParcela = gasto.valor / gasto.parcelas;
          const parcelaAtual = diffMeses + 1;

          gastosExpandido.push({
            ...gasto,
            valor: parseFloat(valorParcela.toFixed(2)),
            parcelaAtual,
            totalParcelas: gasto.parcelas,
            data_gasto: new Date(
              anoConsulta,
              mesConsulta - 1,
              dataCompra.getDate()
            ),
          });
        }
      } else {
        gastosExpandido.push(gasto);
      }
    });

    return res.status(200).json(gastosExpandido);
  } catch (err) {
    console.error("Erro ao buscar os gastos:", err);
    return res.status(500).json({ message: "Erro ao buscar os gastos." });
  }
};

// Adicionar gasto
export const addGasto = async (req, res) => {
  const {
    descricao,
    categoria,
    valor,
    metodo,
    parcelas = 1,
    fixo = false,
  } = req.body;

  const validation = validateGasto(req.body);
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  const mes = new Date().toISOString().slice(0, 7);

  const q = `
    INSERT INTO gastos 
      (descricao, categoria, valor, usuarioId, data_gasto, mes, metodo, parcelas, fixo) 
    VALUES ($1, $2, $3, $4, DEFAULT, $5, $6, $7, $8) RETURNING id
  `;

  try {
    const result = await db.query(q, [
      descricao,
      categoria,
      valor,
      req.user.id,
      mes,
      metodo,
      parcelas,
      fixo,
    ]);
    await updateTotalGastos(req.user.id);

    return res.status(201).json({
      message: "Gasto adicionado com sucesso.",
      id: result.rows[0].id,
    });
  } catch (err) {
    console.error("Erro ao adicionar o gasto:", err);
    return res.status(500).json({ message: "Erro ao adicionar o gasto." });
  }
};

// Atualizar gasto
export const updateGasto = async (req, res) => {
  const {
    descricao,
    categoria,
    valor,
    metodo,
    parcelas = 1,
    fixo = false,
  } = req.body;

  const validation = validateGasto(req.body);
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  try {
    const checkQuery = "SELECT * FROM gastos WHERE id = $1 AND usuarioId = $2";
    const results = await db.query(checkQuery, [req.params.id, req.user.id]);

    if (results.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Gasto não encontrado ou não pertence ao usuário." });
    }

    const q = `
      UPDATE gastos 
      SET descricao = $1, categoria = $2, valor = $3, metodo = $4, parcelas = $5, fixo = $6 
      WHERE id = $7 AND usuarioId = $8
    `;

    await db.query(q, [
      descricao,
      categoria,
      valor,
      metodo,
      parcelas,
      fixo,
      req.params.id,
      req.user.id,
    ]);

    await updateTotalGastos(req.user.id);
    return res.status(200).json({ message: "Gasto atualizado com sucesso." });
  } catch (err) {
    console.error("Erro ao atualizar o gasto:", err);
    return res.status(500).json({ message: "Erro ao atualizar o gasto." });
  }
};

// Deletar gasto
export const deleteGasto = async (req, res) => {
  const q = "DELETE FROM gastos WHERE id = $1 AND usuarioId = $2";

  try {
    await db.query(q, [req.params.id, req.user.id]);
    await updateTotalGastos(req.user.id);

    return res.status(200).json({
      message: "Gasto deletado com sucesso.",
      id: req.params.id,
    });
  } catch (err) {
    console.error("Erro ao deletar o gasto:", err);
    return res.status(500).json({ message: "Erro ao deletar o gasto." });
  }
};

// Obter total de gastos no mês
export const getTotalGastos = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Usuário não autenticado." });
  }

  const mes = req.query.mes || new Date().toISOString().slice(0, 7);

  const q = `
    SELECT SUM(CAST(valor AS DECIMAL)) AS totalgastos 
    FROM gastos 
    WHERE usuarioId = $1 
      AND DATE_TRUNC('month', data_gasto) = DATE_TRUNC('month', $2::DATE);
  `;

  try {
    const result = await db.query(q, [req.user.id, `${mes}-01`]);
    const totalGastos = result.rows[0]?.totalgastos
      ? parseFloat(result.rows[0].totalgastos)
      : 0;

    return res.status(200).json({ totalGastos });
  } catch (err) {
    console.error("Erro ao calcular total de gastos:", err);
    return res.status(500).json({ message: "Erro no banco de dados." });
  }
};

// Replicar gastos fixos
export const replicarGastosFixos = async (req, res) => {
  const userId = req.user.id;

  const hoje = new Date();
  const mesAtual = hoje.toISOString().slice(0, 7);
  const mesAnteriorDate = new Date(hoje.getFullYear(), hoje.getMonth() - 1, 1);
  const mesAnterior = mesAnteriorDate.toISOString().slice(0, 7);

  try {
    const verificaQuery = `
      SELECT COUNT(*) FROM gastos
      WHERE usuarioId = $1 AND fixo = true AND mes = $2
    `;
    const verificaResult = await db.query(verificaQuery, [userId, mesAtual]);
    const count = parseInt(verificaResult.rows[0].count);

    if (count > 0) {
      return res.status(400).json({
        message: "Gastos fixos já foram replicados para este mês.",
      });
    }

    const buscaFixosQuery = `
      SELECT descricao, categoria, valor, metodo, parcelas, fixo
      FROM gastos
      WHERE usuarioId = $1 AND fixo = true AND mes = $2
    `;

    const result = await db.query(buscaFixosQuery, [userId, mesAnterior]);
    const gastosFixos = result.rows;

    if (gastosFixos.length === 0) {
      return res.status(200).json({
        message: "Nenhum gasto fixo encontrado no mês anterior.",
      });
    }

    const insertQuery = `
      INSERT INTO gastos (descricao, categoria, valor, usuarioId, data_gasto, mes, metodo, parcelas, fixo)
      VALUES ($1, $2, $3, $4, CURRENT_DATE, $5, $6, $7, $8)
    `;

    for (const gasto of gastosFixos) {
      await db.query(insertQuery, [
        gasto.descricao,
        gasto.categoria,
        gasto.valor,
        userId,
        mesAtual,
        gasto.metodo,
        gasto.parcelas,
        gasto.fixo,
      ]);
    }

    return res
      .status(201)
      .json({ message: "Gastos fixos replicados com sucesso." });
  } catch (err) {
    console.error("Erro ao replicar gastos fixos:", err);
    return res
      .status(500)
      .json({ message: "Erro ao replicar os gastos fixos." });
  }
};
