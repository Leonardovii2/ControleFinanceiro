import pkg from "pg";

const { Pool } = pkg;

export const db = new Pool({
  /* host: "localhost",
  port: 5432,
  user: "postgres",
  password: "bancoleo12",
  database: "crud", */

  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false, // Defina como `false` para permitir a conexão com a validação SSL desativada (caso contrário, pode gerar erros).
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

/*export { db };*/
