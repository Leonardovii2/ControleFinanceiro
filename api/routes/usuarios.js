import express from "express";
import registrarUsuarios from "../controllers/usuario.js";
import loginUsuario from "../controllers/login.js"

const router = express.Router();

// Rota para registrar usuário
router.post("/register", registrarUsuarios);

router.post("/login", loginUsuario);

export default router;
