import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { db } from "../db.js";

dotenv.config();
const router = express.Router();

// Rota para redefinir a senha
router.post("/", async (req, res) => {
  const { token, password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await db.query("SELECT * FROM usuarios WHERE id = $1", [userId]);
    if (user.rowCount === 0) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query("UPDATE usuarios SET senha = $1 WHERE id = $2", [hashedPassword, userId]);

    res.status(200).json({ message: "Senha alterada com sucesso!" });
  } catch (error) {
    console.error("Erro ao redefinir a senha:", error);
    res.status(500).json({ message: "Erro ao redefinir a senha." });
  }
});

export default router;
