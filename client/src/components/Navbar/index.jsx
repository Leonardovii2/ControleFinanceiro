import React from "react";
import styles from "./styles.module.css";
import { FaHome, FaCog, FaWallet, FaFileAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { path: "/", icon: <FaHome size={30} />, label: "Home" },
  { path: "/report", icon: <FaFileAlt size={30} />, label: "Report" },
  /* { path: "/carteira", icon: <FaWallet size={30} />, label: "Wallet" }, */
  { path: "/settings", icon: <FaCog size={30} />, label: "Settings" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className={styles.container}>
      <ul className={styles.icons}>
        {navItems.map((item) => (
          <li key={item.path}>
            <button
              className={styles.button}
              onClick={() => navigate(item.path)}
            >
              {React.cloneElement(item.icon, {
                color: location.pathname === item.path ? "#e0af0e" : "white",
              })}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
