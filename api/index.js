import express from "express";
import cors from "cors";
import gastosRouter from "./routes/gastos.js";
import usuariosRouter from "./routes/usuarios.js";

const app = express();

// Configuração do CORS
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // Se você estiver usando cookies
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/gastos", gastosRouter);
app.use("/usuarios", usuariosRouter);

app.listen(8800, () => {
  console.log("Servidor rodando na porta 8800");
});
