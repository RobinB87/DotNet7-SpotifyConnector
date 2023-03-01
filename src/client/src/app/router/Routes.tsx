import { createBrowserRouter, RouteObject } from "react-router-dom";

import App from "../../App";
import Login from "../features/auth/Login";
import LibraryDashboard from "../features/library/LibraryDashboard";
import TracksAdd from "../features/tracks/TracksAdd";
import PrivateRoutes from "./PrivateRoutes";

export const homepage = "playlists";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Login />,
      },
    ],
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: homepage,
        element: <LibraryDashboard />,
      },
      {
        path: "/tracks-add/:id",
        element: <TracksAdd />,
      },
      {
        path: "/tracks-add",
        element: <TracksAdd />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
