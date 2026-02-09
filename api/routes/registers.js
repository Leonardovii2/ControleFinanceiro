import express from "express";
import registerController from "../controllers/register.js";

const router = express.Router();

const validarRegister = (req, res, next) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ message: "Nome, e-mail e senha são obrigatórios." });
  }
  next();
};

router.post("/", validarRegister, registerController);

export default router;
