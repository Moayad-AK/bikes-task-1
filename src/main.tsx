import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.css";
import App from "./App.tsx";
import { Provider } from "@/components/ui/provider";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <App />
      </Provider>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  </StrictMode>
);
