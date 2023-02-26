import { createBrowserRouter, RouteObject } from "react-router-dom";

import App from "../../App";
import LoginForm from "../features/auth/Login";
// import { Redirect } from "../features/auth/Redirect";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <LoginForm />,
      },
      // {
      //   path: "/redirect",
      //   element: <Redirect />,
      // },
    ],
  },
];

export const router = createBrowserRouter(routes);
