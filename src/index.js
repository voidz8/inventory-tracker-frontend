import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext";
import SneakerContextProvider from "./contexts/SneakerContext";
import ItemContextProvider from "./contexts/ItemContext";
import BotContextProvider from "./contexts/BotContext";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <BotContextProvider>
        <ItemContextProvider>
          <SneakerContextProvider>
            <AuthContextProvider>
              <App />
            </AuthContextProvider>
          </SneakerContextProvider>
        </ItemContextProvider>
      </BotContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
