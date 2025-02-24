import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

export const db = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "bancoleo12",
  database: process.env.DB_NAME || "crud",
});

// Testando conexão apenas uma vez
db.query("SELECT NOW()")
  .then((res) =>
    console.log(`✅ Conectado ao banco de dados! Timestamp: ${res.rows[0].now}`)
  )
  .catch((err) => console.error("❌ Erro ao conectar ao banco de dados:", err));
