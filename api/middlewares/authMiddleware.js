import jwt from "jsonwebtoken";

// No seu middleware de autenticação (authMiddleware.js)
export const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token de autenticação ausente." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Token de autenticação inválido." });
    }
    req.user = user;
    next();
  });
};
