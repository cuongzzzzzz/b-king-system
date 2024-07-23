import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { persistor, store } from "./redux/storage.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import { SocketProvider } from "./context/SocketContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>

    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SocketProvider>
          <QueryClientProvider client={queryClient}>

            <BrowserRouter>
              <ToastContainer />
              <App />
            </BrowserRouter>

          </QueryClientProvider>
        </SocketProvider>

      </PersistGate>
    </Provider>
  </React.StrictMode>
);
