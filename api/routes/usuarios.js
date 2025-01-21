import express from "express";
import registrarUsuarios, {
  atualizarNomeUsuario,
} from "../controllers/usuario.js";
import loginUsuario from "../controllers/login.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rota para registrar usuário
router.post("/register", registrarUsuarios);

router.post("/login", loginUsuario);

router.put("/update-name",authenticateToken, atualizarNomeUsuario);

export default router;
