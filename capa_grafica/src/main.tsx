import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

window.addEventListener("unhandledrejection", (event) => {
  const msg = event.reason?.message ?? String(event.reason ?? "");
  if (msg.includes("A listener indicated an asynchronous response")) {
    event.preventDefault();
    return;
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);