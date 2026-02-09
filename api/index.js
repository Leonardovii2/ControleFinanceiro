import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import gastosRouter from "./routes/gastos.js";
import usuariosRouter from "./routes/usuarios.js";
import loginRouter from "./routes/logins.js";
import registerRouter from "./routes/registers.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/gastos", gastosRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/usuarios", usuariosRouter);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 8801;
const HOST = process.env.HOST || "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`✅ Servidor rodando em http://${HOST}:${PORT}`);
  console.log("A API está pronta para receber requisições.");
});
