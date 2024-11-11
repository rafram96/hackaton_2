import { RouteProps } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Dashboard from "../components/dashboard";

const routes: RouteProps[] = [
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard", 
    element: <Dashboard />,
  }
];

export default routes;