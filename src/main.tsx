import { Global } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import "./index.css";
import { GlobalStyles } from "./styles/GlobalStyles";

import { Loader } from "./components";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import { Theme } from "./components/Theme/Theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Theme>
        <Global styles={GlobalStyles} />
        <PersistGate loading={<Loader />} persistor={persistor}>
          <BrowserRouter basename="/">
            <App />
          </BrowserRouter>
        </PersistGate>
      </Theme>
    </Provider>
  </React.StrictMode>
);
