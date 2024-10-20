import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
console.log("JWT Secret:", jwtSecret);


const loginUsuario = (req, res) => {
  console.log("Requisição de login recebida:", req.body); // Log da requisição
  const q = "SELECT * FROM usuarios WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) {
      console.error("Erro ao acessar o banco de dados:", err); // Log do erro
      return res.status(500).json("Erro interno do servidor");
    }
    if (data.length === 0) {
      console.log("Usuário não encontrado:", req.body.email); // Log se o usuário não for encontrado
      return res.status(404).json("Usuário não encontrado!");
    }

    const usuario = data[0];

    bcrypt.compare(req.body.senha, usuario.senha, (err, isMatch) => {
      if (err) {
        console.error("Erro ao comparar senhas:", err); // Log do erro
        return res.status(500).json(err);
      }
      if (!isMatch) {
        console.log("Senha incorreta para o usuário:", usuario.email); // Log se a senha estiver incorreta
        return res.status(400).json("Senha incorreta!");
      }

      const token = jwt.sign({ id: usuario.id, nome: usuario.nome }, jwtSecret, { expiresIn: "1h" });
      console.log("Token gerado:", token); // Log do token gerado

      return res.status(200).json({ token, nome: usuario.nome });
    });
  });
};

export default loginUsuario;
