import pkg from "pg";

const { Pool } = pkg;

export const db = new Pool({
  /* host: "localhost",
  port: 5432,
  user: "postgres",
  password: "bancoleo12",
  database: "crud", */

  host: "dpg-culo7hin91rc73eg1dmg-a.oregon-postgres.render.com",
  port: 5432,
  user: "crud_8j2e_user",
  password: "D1am4bGwisgQUvcLWVfpFB0Y3jflyT3P",
  database: "crud_8j2e",
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
