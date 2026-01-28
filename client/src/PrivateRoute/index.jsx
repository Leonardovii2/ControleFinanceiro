import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext/index";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";
import styles from "./styles.module.css";

export default function PrivateRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
