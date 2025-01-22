import { db } from "../db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const saltRounds = 10; // Define o número de rounds para o bcrypt

const registrarUsuarios = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ message: "Nome, e-mail e senha são obrigatórios." });
  }

  try {
    // Hash da senha antes de salvar no banco
    const hash = await bcrypt.hash(senha, saltRounds);

    // Inserir usuário no banco
    const q = "INSERT INTO usuarios(nome, email, senha) VALUES($1, $2, $3)";
    const values = [nome, email, hash];

    await db.query(q, values);

    return res.status(201).json({ message: "Usuário registrado com sucesso." });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export default registrarUsuarios;
