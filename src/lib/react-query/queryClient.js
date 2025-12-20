import { QueryClient } from "@tanstack/react-query";

/**
 * Creates a new QueryClient instance with default configuration
 *
 * Configuration:
 * - staleTime: 1 minute - Data is considered fresh for 1 minute
 * - gcTime: 5 minutes - Unused data stays in cache for 5 minutes
 * - retry: 1 - Failed queries retry once before showing error
 * - refetchOnWindowFocus: false - Don't refetch on tab switch (can enable per-query)
 */
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Data is considered stale after 1 minute
        staleTime: 60 * 1000,
        // Inactive queries are garbage collected after 5 minutes
        gcTime: 5 * 60 * 1000,
        // Retry failed requests once
        retry: 1,
        // Don't refetch on window focus by default
        refetchOnWindowFocus: false,
      },
      mutations: {
        // Retry failed mutations once
        retry: 1,
      },
    },
  });
}
