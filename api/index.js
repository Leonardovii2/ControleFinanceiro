import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import gastosRouter from "./routes/gastos.js";
import usuariosRouter from "./routes/usuarios.js";
import loginRouter from "./routes/logins.js";
import registerRouter from "./routes/registers.js";
import requestPasswordRouter from "./routes/requestPassword.js";
import resetPasswordRouter from "./routes/resetPassword.js";

// Carrega as variáveis de ambiente
dotenv.config();

const app = express();

// Configuração do CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:5173", // Permite o frontend no localhost por padrão
  credentials: true,
};

app.use(cors(corsOptions)); // Habilita o CORS
app.use(express.json()); // Substitui bodyParser.json()

// Definindo as rotas
app.use("/gastos", gastosRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/usuarios", usuariosRouter); // Rota para /usuarios com update-name já configurada dentro de usuariosRouter
app.use("/requestPassword", requestPasswordRouter);
app.use("/resetPassword", resetPasswordRouter);

// Serve os arquivos do frontend (após build)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "dist")));

// Rota de fallback: Para qualquer URL desconhecida, envia o index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Iniciando o servidor
const PORT = process.env.PORT || 8801;
const HOST = process.env.HOST || "0.0.0.0"; // Garante que escute em todas as interfaces

app.listen(PORT, HOST, () => {
  console.log(`✅ Servidor rodando em http://${HOST}:${PORT}`);
  console.log("A API está pronta para receber requisições.");
});
