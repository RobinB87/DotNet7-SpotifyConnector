import { createBrowserRouter, RouteObject } from "react-router-dom";

import App from "../../App";
import Login from "../features/auth/Login";
import LibraryDashboard from "../features/library/LibraryDashboard";
import Upload from "../features/upload/Upload";
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
        path: "/upload",
        element: <Upload />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
