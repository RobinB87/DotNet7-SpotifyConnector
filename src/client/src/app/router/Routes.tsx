import { createBrowserRouter, RouteObject } from "react-router-dom";

import App from "../../App";
import Login from "../features/auth/Login";
import Tracks from "../features/tracks/Tracks";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "tracks",
        element: <Tracks />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
