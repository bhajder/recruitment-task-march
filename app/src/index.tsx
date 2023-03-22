import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline } from "@mui/material";
import "./index.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";
import reportWebVitals from "./reportWebVitals";
import { AppRouter } from "./Router";
import { DatabaseContextProvider } from "./shared/DatabaseContext";
import { AuthContextProvider } from "./shared/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <DatabaseContextProvider>
      <AuthContextProvider>
        <AppRouter />
      </AuthContextProvider>
    </DatabaseContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
