import { createBrowserRouter, RouteObject } from "react-router-dom";

import App from "../../App";
import Login from "../features/auth/Login";
import PlaylistDashboard from "../features/playlistDashboard/PlaylistDashboard";
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
        element: <PlaylistDashboard />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
