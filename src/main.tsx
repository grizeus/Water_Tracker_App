import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "modern-normalize";

import App from "./components/App";
import { persistor, store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { Loader } from "./components/common/Loader/Loader";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <BrowserRouter basename="/">
            <App />
          </BrowserRouter>
        </PersistGate>
    </Provider>
  </React.StrictMode>
);
