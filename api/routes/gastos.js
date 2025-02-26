import express from "express";
import {
  getGastos,
  addGasto,
  updateGasto,
  deleteGasto,
  getTotalGastos,
} from "../controllers/gasto.js";
import { authenticateToken } from "../middlewares/authMiddleware.js"; // Importe o middleware

const router = express.Router();

// Aplique o middleware de autenticação nas rotas
router.get("/", authenticateToken, getGastos);
router.post("/", authenticateToken, addGasto);
router.put("/:id", authenticateToken, updateGasto);
router.delete("/:id", authenticateToken, deleteGasto);

// Rota para obter o total de gastos
router.get("/total", authenticateToken, getTotalGastos); // Ajustei para a rota /total, que é chamada no frontend

export default router;
