import express from "express";
import {
  getGastos,
  addGasto,
  updateGasto,
  deleteGasto,
} from "../controllers/gasto.js";
import { authenticateToken } from "../middlewares/authMiddleware.js"; // Importe o middleware

const router = express.Router();

// Aplique o middleware de autenticação nas rotas
router.get("/", authenticateToken, getGastos);
router.post("/", authenticateToken, addGasto);
router.put("/:id", authenticateToken, updateGasto);
router.delete("/:id", authenticateToken, deleteGasto);

export default router;
