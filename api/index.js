import express from "express";
import cors from "cors";
import gastosRouter from "./routes/gastos.js";

const app = express();

app.use(express.json());
app.use(cors()); //evitar conflito rodando localmente

app.use("/", gastosRouter);

app.listen(8800);
