import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createQueryClient } from "@/lib/react-query/queryClient";

/**
 * QueryProvider Component
 *
 * Wraps the application with React Query's QueryClientProvider.
 * Creates a new QueryClient instance that persists for the lifetime of the page.
 *
 * Usage:
 * Add this provider to your root main.jsx to enable React Query throughout the app.
 */
export function QueryProvider({ children }) {
  // Create a client that will persist for the lifetime of the page
  // Using useState ensures we only create it once per page load
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* DevTools only show in development */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
