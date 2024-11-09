import { RouteProps } from "react-router-dom";

import LoginPage from "../pages/LoginPage";

const routes: RouteProps[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
];

export default routes;