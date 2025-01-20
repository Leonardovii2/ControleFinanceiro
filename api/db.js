import pg from "pg";
import dotenv from "dotenv";

dotenv.config(); // Carrega as variáveis de ambiente do .env

const { Pool } = pg;

// Configuração do banco usando a variável DATABASE_URL do Neon
export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Necessário para conexão com Neon
});

async function connectToDatabase() {
  try {
    await db.connect();
    console.log("🔥 Conectado ao Neon PostgreSQL!");
  } catch (err) {
    console.error("❌ Erro ao conectar ao banco de dados:", err);
  }
}

connectToDatabase();