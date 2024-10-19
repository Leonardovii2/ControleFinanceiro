import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  port: 3312,
  user: "root",
  password: "",
  database: "crud",
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conectado ao banco de dados!");
});
