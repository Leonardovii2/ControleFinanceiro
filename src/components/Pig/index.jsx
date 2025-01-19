import styles from "./styles.module.css";
import pigImg from "../../assets/pig-bank.svg"

export default function SecondOfcSection() {
    return (
        <>
            <section className={styles.container}>
                <div className={styles.contant}>
                    <h2>Boa tarde</h2>
                    <img className={styles.img} src={pigImg} alt="" />
                </div>
            </section>
        </>
    )
}