import express from "express";
import {
  getGastos,
  addGasto,
  updateGasto,
  deleteGasto,
  getTotalGastos,
  replicarGastosFixos,
} from "../controllers/gasto.js";
import { authenticateToken } from "../middlewares/authMiddleware.js"; // Importe o middleware

const router = express.Router();

// Aplique o middleware de autenticação nas rotas
router.get("/", authenticateToken, getGastos);
router.post("/", authenticateToken, addGasto);
router.put("/:id", authenticateToken, updateGasto);
router.delete("/:id", authenticateToken, deleteGasto);

// Rota para obter o total de gastos
router.get("/totalGastos", authenticateToken, getTotalGastos);
router.post("/replicar-fixos", authenticateToken, replicarGastosFixos);

export default router;
