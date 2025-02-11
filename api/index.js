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

// Configuração do CORS para aceitar requisições apenas do localhost
const corsOptions = {
  origin: [
    "https://controle-financeiro-ashen.vercel.app",
    "https://controlefinanceiro-1.onrender.com",
    "https://controlefinanceiro-dktx.onrender.com",
    "http://localhost:5173",
  ], // URL do frontend local (Vite)
  credentials: true, // Se você estiver usando cookies
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

// Definindo a porta do servidor
/* const PORT = process.env.PORT || 8801;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
}); */

const host = process.env.HOST || "localhost"; // Definindo a URL com base no ambiente
console.log(`Servidor rodando em http://${host}:${PORT}`);

export default app;
