import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  console.error("JWT_SECRET não está definido!");
  process.exit(1);
}

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res
      .status(400)
      .json({ message: "E-mail e senha são obrigatórios." });
  }

  try {
    // Buscar usuário no banco de dados (e-mail case insensitive)
    const q = "SELECT * FROM usuarios WHERE LOWER(email) = LOWER($1)";
    const { rows } = await db.query(q, [email]);

    // Se o usuário não existir, envie um erro genérico (evita enumeração de e-mails)
    if (rows.length === 0) {
      return res.status(401).json({ message: "E-mail ou senha incorretos!" });
    }

    const usuario = rows[0];
    // Comparar senha informada com a senha armazenada no banco
    const isMatch = await bcrypt.compare(senha, usuario.senha);

    if (!isMatch) {
      return res.status(401).json({ message: "E-mail ou senha incorretos!" });
    }

    // Gerar token JWT com expiração de 1 hora
    const token = jwt.sign({ id: usuario.id }, jwtSecret, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token, nome: usuario.nome });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

export default loginUsuario;
