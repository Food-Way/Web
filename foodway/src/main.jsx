import React from "react";
import ReactDOM from "react-dom/client";

import "./assets/css/reset.css";
import "./assets/css/style.css";

import App from "./app";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App className="app" />
  </React.StrictMode>
);
