import { db } from "../db.js";

export const getGastos = (_, res) => {
  const q = "SELECT * FROM gastos";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addGasto = (req, res) => {
  const q = "INSERT INTO gastos(`categoria`, `descricao`, `valor`) VALUES(?)";

  const values = [req.body.categoria, req.body.descricao, req.body.valor];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Gasto adicionado com sucesso.");
  });
};

export const updateGasto = (req, res) => {
  const q =
    "UPDATE gastos SET `categoria` = ?, `descricao` = ?, `valor` = ? WHERE `id` = ?";

  const values = [req.body.categoria, req.body.descricao, req.body.valor];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Gasto atualizado com sucesso.");
  });
};

export const deleteGasto = (req, res) => {
  const q = "DELETE FROM gastos WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Gasto deletado com sucesso.");
  });
};