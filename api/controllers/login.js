import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  console.error("JWT_SECRET não está definido!");
  process.exit(1); // Para evitar que o servidor inicie sem a chave JWT
}

const loginUsuario = async (req, res) => {
  console.log("Requisição de login recebida:", req.body);

  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
  }

  try {
    // Buscar usuário no banco de dados
    const q = "SELECT * FROM usuarios WHERE email = $1";
    const { rows } = await db.query(q, [email]); // Executando a consulta de forma assíncrona

    if (rows.length === 0) {
      console.log("Usuário não encontrado:", email);
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    const usuario = rows[0]; // Pegando o primeiro usuário encontrado

    // Comparar a senha informada com a senha armazenada no banco
    const isMatch = await bcrypt.compare(senha, usuario.senha);

    if (!isMatch) {
      console.log("Senha incorreta para o usuário:", email);
      return res.status(401).json({ message: "Senha incorreta!" });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome },
      jwtSecret,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token, nome: usuario.nome });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export default loginUsuario;
