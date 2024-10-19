import { db } from "../db.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

const registrarUsuarios = (req, res) => {
  const { nome, email, senha } = req.body;

  // Hash da senha
  bcrypt.hash(req.body.senha, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao hash da senha" });
    }

    const q = "INSERT INTO usuarios(`nome`, `email`, `senha`) VALUES(?)";
    const values = [req.body.nome, req.body.email, hash]; // Use o hash da senha aqui

    db.query(q, [values], (err) => {
      if (err) {
        return res.status(500).json(err); // Retorne um erro mais específico, se possível
      }

      return res.status(201).json("Usuário adicionado com sucesso."); // 201 para criação
    });
  });
};

export default registrarUsuarios;
