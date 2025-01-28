import express from "express";
import {
  atualizarNomeUsuario,
  atualizarSalario,
  pegarSalario,
} from "../controllers/usuario.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.put("/update-name", authenticateToken, atualizarNomeUsuario);
router.put("/salario", authenticateToken, atualizarSalario);
router.put("/salario", authenticateToken, atualizarSalario);
router.get("/salario", authenticateToken, pegarSalario);

export default router;
