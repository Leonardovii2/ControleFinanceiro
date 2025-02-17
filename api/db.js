import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

export const db = new Pool({
  /* host: "localhost",
  port: 5432,
  user: "postgres",
  password: "bancoleo12",
  database: "crud", */

  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Testando conexão apenas uma vez
db.query("SELECT NOW()")
  .then((res) =>
    console.log(`✅ Conectado ao banco de dados! Timestamp: ${res.rows[0].now}`)
  )
  .catch((err) => console.error("❌ Erro ao conectar ao banco de dados:", err));

/*export { db };*/
