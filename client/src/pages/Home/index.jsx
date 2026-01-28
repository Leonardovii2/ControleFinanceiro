import { useHome } from "./useHome";
import HomeView from "./Home.view";

const Home = () => {
  const home = useHome();
  return <HomeView {...home} />;
};

export default Home;
