import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import App from "./App";
import "./index.css";

const convexUrl = import.meta.env.VITE_CONVEX_URL;

if (!convexUrl) {
  console.error("VITE_CONVEX_URL is not defined! Check your Netlify environment variables.");
}

const convex = new ConvexReactClient(convexUrl || "");

createRoot(document.getElementById("root")!).render(
  <ConvexProvider client={convex}>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster />
    </QueryClientProvider>
  </ConvexProvider>
);
