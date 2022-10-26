import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { DarkModeProvider } from "./hooks/useDarkMode";
import { NotificationsProvider } from "./hooks/useNotify";
import { AuthProvider } from "./hooks/useAuth";
import { PopupProvider } from "./hooks/usePopup";
import App from "./App";
import "./i18n";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DarkModeProvider>
        <NotificationsProvider>
          <AuthProvider>
            <PopupProvider>
              <App />
            </PopupProvider>
          </AuthProvider>
        </NotificationsProvider>
      </DarkModeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
