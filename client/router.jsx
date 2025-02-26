import { createBrowserRouter } from "react-router-dom";
import Home from "./src/pages/Home";
import RootLayout from "./src/pages/RootLayout/RootLayout";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import RequestPassword from "./src/pages/RequestPassword";
import ResetPassword from "./src/pages/ResetPassword";
import Wallet from "./src/pages/Wallet";
import Report from "./src/pages/Report";
import PrivateRoute from "./src/PrivateRoute/PrivateRoute";
import Settings from "./src/pages/Settingss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <RootLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "wallet",
        element: (
          <PrivateRoute>
            <Wallet />
          </PrivateRoute>
        ),
      },
      {
        path: "report",
        element: (
          <PrivateRoute>
            <Report />
          </PrivateRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />, // Página de login
  },
  {
    path: "/register",
    element: <Register />, // Página de registro
  },
  {
    path: "/requestPassword",
    element: <RequestPassword />,
  },
  {
    path: "/resetPassword",
    element: <ResetPassword />,
  },
]);

export default router;
