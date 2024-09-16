import Card from "./components/Card";
import Navbar from "./components/navbar";
import styles from "./App.module.css";
import Categoria from "./components/Categoria";
import imgControle from "./assets/iconeControle.png";
import imgInvestimentos from "./assets/iconeInvestimento.png";
import imgProjetos from "./assets/iconeProjetos.png";
import imgMetas from "./assets/iconeMetas.png";

function App() {
  return (
    <div className="app">
      <Navbar />
      <section className={styles.sectionContainer}>
        <Card title="Saldo disponível" valor="1.000,00" />
        <Card title="Saldo total" valor="5.000,00" />
      </section>

      <section className={styles.sectionCategorias}>
        <Categoria title="Controle" controleImg={imgControle} />
        <Categoria title="Investimentos" controleImg={imgInvestimentos} />
        <Categoria title="Projetos" controleImg={imgProjetos} />
        <Categoria title="Metas" controleImg={imgMetas} />
      </section>
    </div>
  );
}

export default App;
