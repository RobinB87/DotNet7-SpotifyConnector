import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import { router } from "./app/router/Routes";
import NavBar from "./app/components/navbar/NavBar";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const theme = createTheme({
  palette: {
    background: {
      default: "#282828",
      paper: "#b4d9c3",
    },
    primary: {
      light: "#66ffa6",
      main: "#00e676",
      dark: "#098039",
      contrastText: "#000",
    },
    secondary: {
      light: "#ff79b0",
      main: "#ff4081",
      dark: "#e60063",
      contrastText: "#000",
    },
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <NavBar />
        <RouterProvider router={router} />
      </CssBaseline>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
