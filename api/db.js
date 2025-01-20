import pg from "pg";

const { Pool } = pg;

/* export const db = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "bancoleo12",
  database: "crud",
}); */

const db = new Pool({
  connectionString: process.env.DATABASE_URL,  // Usando a variável de ambiente do Render
  ssl: {
    rejectUnauthorized: false,  // Requisito do Render para SSL
  },
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
