import styles from "./styles.module.css";
import { FaHome, FaCog, FaWallet, FaUser } from "react-icons/fa";
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
              color={location.pathname === "/home" ? "#A2B29B" : "white"}
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
              color={location.pathname === "/carteira" ? "#A2B29B" : "white"}
              size={30}
            />
          </button>
        </li>
        <li>
          <button
            className={styles.button}
            onClick={() => navigate("/settings")}
          >
            <FaCog
              color={location.pathname === "/settings" ? "#A2B29B" : "white"}
              size={30}
            />
          </button>
        </li>
        <li>
          <button className={styles.button} onClick={() => navigate("/user")}>
            <FaUser
              color={location.pathname === "/user" ? "#A2B29B" : "white"}
              size={30}
            />
          </button>
        </li>
      </ul>
    </nav>
  );
}
