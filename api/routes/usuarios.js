import express from "express";
import { atualizarNomeUsuario } from "../controllers/usuario.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.put("/update-name", authenticateToken, atualizarNomeUsuario);

export default router;
