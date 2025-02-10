import styles from "./styles.module.css";
import useGetInitials from "../../assets/Hooks/useGetInitialsd"; // Nome corrigido

export default function GetInitialsContainer() {
  const { nomeUsuario, getInitials } = useGetInitials({ atualizar: true }); // Você pode passar a prop 'atualizar' se necessário

  return <div className={styles.avatar}>{getInitials(nomeUsuario)}</div>;
}
