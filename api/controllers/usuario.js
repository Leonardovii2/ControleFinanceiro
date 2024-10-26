import { db } from "../db.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

const registrarUsuarios = (req, res) => {
  const { nome, email, senha } = req.body;

  // Hash da senha
  bcrypt.hash(senha, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao hash da senha" });
    }

    // A consulta precisa usar placeholders (?) para cada valor
    const q = "INSERT INTO usuarios(nome, email, senha) VALUES($1, $2, $3)";
    const values = [nome, email, hash]; // Array simples com os valores

    db.query(q, values, (err) => { // Passe o array values diretamente
      if (err) {
        console.error("Erro ao registrar usuário:", err); // Log do erro para debugging
        return res.status(500).json(err); // Retorne um erro mais específico, se possível
      }

      return res.status(201).json("Usuário adicionado com sucesso."); // 201 para criação
    });
  });
};

export default registrarUsuarios;
