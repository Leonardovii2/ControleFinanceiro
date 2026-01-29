import { React, useState } from "react";
import styles from "./styles.module.css";
import {
  FaHome,
  FaCog,
  FaFileAlt,
  FaSun,
  FaMoon,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { use } from "react";

const navItems = [
  { path: "/home", icon: <FaHome size={20} />, label: "Dashboard" },
  { path: "/report", icon: <FaFileAlt size={20} />, label: "Relatórios" },
  { path: "/settings", icon: <FaCog size={20} />, label: "Minha conta" },
];

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className={styles.container}>
      <h1 className={styles.title}>YourOrça</h1>
      <hr />
      <ul className={styles.icons}>
        {navItems.map((item) => (
          <li key={item.path} className={styles.item}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
            >
              {item.icon}
              <span className={styles.label}>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <div className={styles.bottomSection}>
        <hr />
        <ul>
          <li
            className={styles.bottomItem}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <FaMoon size={20} /> : <FaSun size={20} />}
            <span>{darkMode ? "Modo escuro" : "Modo claro"}</span>
          </li>

          <li className={styles.bottomItem} onClick={handleLogout}>
            <FaSignOutAlt size={20} color="#ff6262" />
            <span className={styles.sair}>Sair</span>
          </li>
        </ul>
      </div>
    </nav>
  );
}
