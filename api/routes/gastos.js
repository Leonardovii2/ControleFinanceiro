import express from "express";
import {
  getGastos,
  addGasto,
  updateGasto,
  deleteGasto,
} from "../controllers/gasto.js";

const router = express.Router();

router.get("/", getGastos);

router.post("/", addGasto);

router.put("/:id", updateGasto);

router.delete("/:id", deleteGasto);

export default router;
