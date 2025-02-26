import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import FinancialDashboardHeader from "../../components/FinancialDashboardHeader";

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <FinancialDashboardHeader />
      <Outlet />
    </>
  );
}
