import { db } from "../db.js";
import bcrypt from "bcrypt";

const loginUsuario = (req, res) => {
  const q = "SELECT * FROM usuarios WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json("Usuário não encontrado!");

    const usuario = data[0];

    // Comparar a senha fornecida com a armazenada (hash)
    bcrypt.compare(req.body.senha, usuario.senha, (err, isMatch) => {
      if (err) return res.status(500).json(err);
      if (!isMatch) return res.status(400).json("Senha incorreta!");

      return res.status(200).json("Login bem-sucedido!");
    });
  });
};

export default loginUsuario;
