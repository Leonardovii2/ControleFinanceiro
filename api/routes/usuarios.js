import express from "express";
import {
  atualizarNomeUsuario,
  atualizarSalario,
  pegarSalario,
  getUsuarioLogado,
  atualizarApelidoUsuario,
} from "../controllers/usuario.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.put("/update-name", authenticateToken, atualizarNomeUsuario);
router.put("/add-apelido", authenticateToken, atualizarApelidoUsuario);
router.put("/salario", authenticateToken, atualizarSalario);
router.get("/me", authenticateToken, getUsuarioLogado);
router.get("/salario", authenticateToken, pegarSalario);

export default router;
