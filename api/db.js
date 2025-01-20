import pg from "pg";

const { Pool } = pg;

export const db = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "bancoleo12",
  database: "crud",
});

async function connectToDatabase() {
  try {
    await db.connect();
    console.log("Conectado ao banco de dados!");
  } catch (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  }
}

connectToDatabase();
