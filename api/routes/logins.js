import express from "express";
import loginController from "../controllers/login.js";

const router = express.Router();

const validarLogin = (req, res, next) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res
      .status(400)
      .json({ message: "E-mail e senha são obrigatórios." });
  }
  next();
};

router.post("/", validarLogin, loginController);

export default router;
