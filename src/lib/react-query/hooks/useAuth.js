import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/authService.js";
import { queryKeys } from "@/lib/react-query/queryKeys";

/**
 * Hook for validating authentication state
 *
 * Features:
 * - Automatically caches and deduplicates requests
 * - Background refetching
 *
 * @example
 * const { data, isLoading, error } = useAuthValidation();
 */
export function useAuthValidation() {
  return useQuery({
    queryKey: queryKeys.auth.validation(),
    queryFn: () => authService.getAuthenticationState(),
    retry: false, // Don't retry auth validation failures
    staleTime: 5 * 60 * 1000, // 5 minutes - auth state doesn't change often
  });
}
