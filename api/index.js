import express from "express";
import cors from "cors";
import gastosRouter from "./routes/gastos.js";
import usuariosRouter from "./routes/usuarios.js";
import loginRouter from "./routes/logins.js";
import registerRouter from "./routes/registers.js";
import requestPasswordRouter from "./routes/requestPassword.js";
import resetPasswordRouter from "./routes/resetPassword.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

const corsOptions = {
  origin: [
    "https://controle-financeiro-ashen.vercel.app",
    "https://controlefinanceiro-1.onrender.com",
    "https://controlefinanceiro-dktx.onrender.com",
    "http://localhost:5173",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

// Definindo as rotas
app.use("/gastos", gastosRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/usuarios", usuariosRouter);
app.use("/requestPassword", requestPasswordRouter);
app.use("/resetPassword", resetPasswordRouter);

// Iniciando o servidor
const PORT = process.env.PORT || 10000;
const HOST = "0.0.0.0"; // Garante que escute em todas as interfaces

app.listen(PORT, HOST, () => {
  console.log(`✅ Servidor rodando em http://${HOST}:${PORT}`);
});
