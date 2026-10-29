import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ConfigGate from "./ConfigGate";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Render the app only once the config has loaded (retries until then)
root.render(
  <React.StrictMode>
    <ConfigGate>
      <App />
    </ConfigGate>
  </React.StrictMode>
);
