import { db } from "../db.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

const registrarUsuarios = async (req, res) => {
  const { nome, email, senha } = req.body;

  // Hash da senha
  bcrypt.hash(senha, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao hash da senha" });
    }

    // A consulta precisa usar placeholders (?) para cada valor
    const q = "INSERT INTO usuarios(nome, email, senha) VALUES($1, $2, $3)";
    const values = [nome, email, hash]; // Array simples com os valores

    db.query(q, values, (err) => {
      // Passe o array values diretamente
      if (err) {
        console.error("Erro ao registrar usuário:", err); // Log do erro para debugging
        return res.status(500).json(err); // Retorne um erro mais específico, se possível
      }

      return res.status(201).json("Usuário adicionado com sucesso."); // 201 para criação
    });
  });
};

export const atualizarNomeUsuario = async (req, res) => {
  const userId = req.user.id; // O userId vem do middleware de autenticação
  const { nome } = req.body;

  console.log("Nome recebido:", nome); // Verifique se o nome não é nulo ou vazio

  if (!nome || nome.trim() === "") {
    return res.status(400).json({ error: "O nome não pode ser vazio." });
  }

  try {
    const q = "UPDATE usuarios SET nome = $1 WHERE id = $2 RETURNING *";
    const values = [nome, userId];

    const result = await db.query(q, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    return res.json({ success: true, updatedUser: result.rows[0] });
  } catch (err) {
    console.error("Erro ao atualizar nome do usuário:", err);
    return res.status(500).json({ error: "Erro ao atualizar nome." });
  }
};

export const atualizarSalario = async (req, res) => {
  const userId = req.user.id;
  const { salario } = req.body;

  try {
    const q = "UPDATE usuarios SET salario = $1 WHERE id = $2";
    const values = [salario, userId];

    const result = await db.query(q, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    return res.status(200).json({ message: "Salário atualizado com sucesso!" });
  } catch (err) {
    console.error("Erro ao adicionar o salário: ", err);
    return res.status(500).json({ error: "Erro ao adicionar o salário." });
  }
};

export const atualizarApelidoUsuario = async (req, res) => {
  const userId = req.user.id;
  const { apelido } = req.body;

  try {
    const q = "UPDATE usuarios SET apelido = $1 WHERE id = $2 RETURNING *";
    const values = [apelido, userId];

    const result = await db.query(q, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    return res.json({ success: true, updatedUser: result.rows[0] });
  } catch (err) {
    console.error("Erro ao atualizar o apelido do usuário:", err);
    return res.status(500).json({ error: "Erro ao atualizar o apelido." });
  }
};

export const pegarSalario = async (req, res) => {
  const userId = req.user.id;

  try {
    const q = "SELECT salario FROM usuarios WHERE id = $1";
    const values = [userId];

    const result = await db.query(q, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const salario = result.rows[0].salario;
    return res.status(200).json({ salario });
  } catch (err) {
    console.error("Erro ao buscar o salário: ", err);
    return res.status(500).json({ error: "Erro ao buscar o salário." });
  }
};

export const getUsuarioLogado = async (req, res) => {
  try {
    const { id } = req.user;

    const q = "SELECT id, nome, email FROM usuarios WHERE id = $1";
    const { rows } = await db.query(q, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

export default registrarUsuarios;
