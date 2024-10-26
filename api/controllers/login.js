import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  console.error("JWT_SECRET não está definido!");
}

const loginUsuario = (req, res) => {
  console.log("Requisição de login recebida:", req.body); // Log da requisição
  const q = "SELECT * FROM usuarios WHERE email = $1";

  db.query(q, [req.body.email], (err, result) => {
    if (err) {
      console.error("Erro ao acessar o banco de dados:", err); // Log do erro
      return res.status(500).json("Erro interno do servidor");
    }
    
    if (result.rows.length === 0) { // Use result.rows
      console.log("Usuário não encontrado:", req.body.email); // Log se o usuário não for encontrado
      return res.status(404).json("Usuário não encontrado!");
    }

    const usuario = result.rows[0]; // Use result.rows

    bcrypt.compare(req.body.senha, usuario.senha, (err, isMatch) => {
      if (err) {
        console.error("Erro ao comparar senhas:", err); // Log do erro
        return res.status(500).json("Erro interno ao comparar senhas");
      }
      if (!isMatch) {
        console.log("Senha incorreta para o usuário:", usuario.email); // Log se a senha estiver incorreta
        return res.status(400).json("Senha incorreta!");
      }

      const token = jwt.sign(
        { id: usuario.id, nome: usuario.nome },
        jwtSecret,
        { expiresIn: "1h" }
      );
      console.log("Token gerado:", token); // Log do token gerado

      return res.status(200).json({ token, nome: usuario.nome });
    });
  });
};

export default loginUsuario;
