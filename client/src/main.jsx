// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const options = {
  "client-id": import.meta.env.VITE_PAYPAL_APP_CLIENT_ID,
  "enable-funding": "paylater",
  // "disable-funding": "card",
  "data-sdk-integration-source": "integrationbuilder_sc",
  vault: "true",
  intent: "capture", // in live mode change into subscription
  // intent: "subscription",
};

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  // Paypal provider
  <PayPalScriptProvider options={options}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </PayPalScriptProvider>
  // </StrictMode>
);
