import express from "express";
import cors from "cors";
import gastosRouter from "./routes/gastos.js";
import usuariosRouter from "./routes/usuarios.js";
import requestPasswordRouter from "./routes/requestPassword.js";
import resetPasswordRouter from "./routes/resetPassword.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Configuração do CORS
const corsOptions = {
  origin: ["http://localhost:5173", "https://controle-financeiro-hazel-kappa.vercel.app/"],
  credentials: true, // Se você estiver usando cookies
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/gastos", gastosRouter);
app.use("/api/usuarios", usuariosRouter);
app.use("/api/requestPassword", requestPasswordRouter);
app.use("/api/resetPassword", resetPasswordRouter);

export default app;