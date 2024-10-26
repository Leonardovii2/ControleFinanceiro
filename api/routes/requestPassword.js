import express from "express";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from "../db.js";

dotenv.config();
const router = express.Router();

// Função para criar o transportador com base no provedor
const createTransporter = (service) => {
  const transporters = {
    gmail: {
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    },
    outlook: {
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER_OUTLOOK,
        pass: process.env.EMAIL_PASS_OUTLOOK,
      },
    },
  };

  const transporterConfig = transporters[service];
  if (!transporterConfig) {
    throw new Error("Serviço de e-mail não suportado.");
  }

  return nodemailer.createTransport(transporterConfig);
};

// Função para validar o formato do e-mail
const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// Rota para solicitar a redefinição de senha
router.post("/request", async (req, res) => {
  const { email, service } = req.body;

  // Validação de entrada
  if (!email || !service || !isValidEmail(email)) {
    return res
      .status(400)
      .json({ message: "E-mail válido e serviço são obrigatórios." });
  }

  try {
    const result = await db.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "E-mail não encontrado." });
    }

    const user = result.rows[0];
    const transporter = createTransporter(service);

    await transporter.verify();

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const resetLink = `http://localhost:5173/resetPassword?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Redefinição de Senha",
      html: `<p>Clique no link abaixo para redefinir sua senha:</p>
               <a href="${resetLink}">Redefinir Senha</a>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "E-mail de redefinição enviado." });
  } catch (error) {
    console.error("Erro ao buscar usuário ou enviar e-mail:", error);
    res
      .status(500)
      .json({ message: "Erro ao enviar e-mail. Tente novamente mais tarde." });
  }
});

export default router;
