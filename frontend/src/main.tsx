import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toaster.tsx";
import { UserProvider } from "./util/UserContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const que = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={que}>
      <UserProvider>
        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>
);
