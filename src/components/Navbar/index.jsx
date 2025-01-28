import styles from "./styles.module.css";
import { FaHome, FaCog, FaWallet, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // Obtém a localização atual

  return (
    <nav className={styles.container}>
      <ul className={styles.icons}>
        <li>
          <button className={styles.button} onClick={() => navigate("/home")}>
            <FaHome
              color={location.pathname === "/home" ? "#e0af0e" : "white"}
              size={30}
            />
          </button>
        </li>
        <li>
          <button
            className={styles.button}
            onClick={() => navigate("/carteira")}
          >
            <FaWallet
              color={location.pathname === "/carteira" ? "#e0af0e" : "white"}
              size={30}
            />
          </button>
        </li>
        <li>
          <button
            className={styles.button}
            onClick={() => navigate("/configuracao")}
          >
            <FaCog
              color={
                location.pathname === "/configuracao" ? "#e0af0e" : "white"
              }
              size={30}
            />
          </button>
        </li>

        {/* <li>
          <button className={styles.button} onClick={() => navigate("/perfil")}>
            <FaUser
              color={location.pathname === "/perfil" ? "#e0af0e" : "white"}
              size={30}
            />
          </button>
        </li> */}
      </ul>
    </nav>
  );
}
