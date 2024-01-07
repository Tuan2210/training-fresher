import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.scss";
import GlobalStyles from "./components/GlobalStyles/GlobalStyles.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyles>
      <App />
    </GlobalStyles>
  </React.StrictMode>
);
