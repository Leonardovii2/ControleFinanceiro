import React from "react";
import getInitials from "../../utils/getInitials";


export default function UserAvatar({ nome }) {
  const initials = getInitials(nome);
  return (
    <div
      style={{
        backgroundColor: "#6366f1", // azul indigo
        color: "#fff",
        width: 40,
        height: 40,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: 16,
        userSelect: "none",
      }}
    >
      {initials}
    </div>
  );
}
