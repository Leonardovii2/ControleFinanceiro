import React, { useState } from "react";
import styles from "./styles.module.css";
import Navbar from "../../components/Navbar";
import FirstSection from "../../components/FirstSection"

export default function Perfil() {
    return (
        <div className={styles.container}>
            <Navbar />
            <FirstSection />
        </div>
    );
}