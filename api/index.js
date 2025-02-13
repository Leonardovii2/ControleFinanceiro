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

// Configuração do CORS para aceitar requisições de múltiplos domínios
const corsOptions = {
  origin: [
    "https://controle-financeiro-ashen.vercel.app", // Frontend no Vercel
    "https://controlefinanceiro-1.onrender.com", // Frontend no Render
    "https://controlefinanceiro-dktx.onrender.com", // Outro domínio no Render
    "http://localhost:5173", // Frontend local durante o desenvolvimento
  ],
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
const PORT = process.env.PORT || 8801; // Usa a variável de ambiente PORT ou o valor padrão 8801
const host = process.env.HOST || "localhost"; // Definindo a URL com base no ambiente
console.log(`Servidor rodando em http://${host}:${PORT}`);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

export default app;
