import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

// HashRouter: все маршруты работают при прямом открытии и обновлении на GitHub Pages (адрес вида /english-lessons/#/lesson/…).
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
