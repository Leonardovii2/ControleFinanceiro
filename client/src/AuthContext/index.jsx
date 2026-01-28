import { createContext, useState, useContext, useEffect } from "react";

export const authContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const nome = localStorage.getItem("nomeUsuario");

    if (token && nome) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const exp = payload.exp * 1000;

        if (Date.now() >= exp) {
          // Token expirado
          localStorage.removeItem("token");
          localStorage.removeItem("nomeUsuario");
          setUser(null);
        } else {
          setUser({ nome, token });
        }
      } catch (err) {
        console.error("Erro ao decodificar token", err);
        localStorage.removeItem("token");
        localStorage.removeItem("nomeUsuario");
        setUser(null);
      }
    }

    setLoading(false); // termina o carregamento
  }, []);

  const login = (userData) => setUser(userData);
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("nomeUsuario");
  };

  return (
    <authContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}
