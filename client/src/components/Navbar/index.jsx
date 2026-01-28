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
import { NavLink } from "react-router-dom";

const navItems = [
  { path: "/home", icon: <FaHome size={26} />, label: "Dashboard" },
  { path: "/report", icon: <FaFileAlt size={26} />, label: "Relatórios" },
  { path: "/settings", icon: <FaCog size={26} />, label: "Minha conta" },
];

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true);

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
            {darkMode ? <FaMoon size={22} /> : <FaSun size={22} />}
            <span>{darkMode ? "Modo escuro" : "Modo claro"}</span>
          </li>

          <li className={styles.bottomItem}>
            <FaSignOutAlt size={26} />
            <span>Sair</span>
          </li>
        </ul>
      </div>
    </nav>
  );
}
