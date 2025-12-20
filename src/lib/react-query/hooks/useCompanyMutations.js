import { useMutation, useQueryClient } from "@tanstack/react-query";
import { companiesService } from "@/services/companiesService";
import { queryKeys } from "@/lib/react-query/queryKeys";

/**
 * Hook for creating a company review
 *
 * Features:
 * - Automatically invalidates company reviews queries on success
 * - Provides loading, error, and success states
 *
 * @param {string|number} companyId - The company ID
 * @param {Object} options - Optional callbacks and configuration
 *
 * @example
 * const { mutateAsync, isPending } = useCreateReview(companyId, {
 *   onSuccess: (data) => console.log('Review created:', data.id),
 * });
 *
 * await mutateAsync({
 *   rating: 5,
 *   comment: 'Great company!',
 * });
 */
export function useCreateReview(companyId, options) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewData) =>
      companiesService.createReview(companyId, reviewData),
    onSuccess: (data, variables, context) => {
      // Invalidate company reviews to trigger refetch
      queryClient.invalidateQueries({
        queryKey: queryKeys.companies.reviews(companyId),
      });
      // Also invalidate company detail to refresh review count
      queryClient.invalidateQueries({
        queryKey: queryKeys.companies.detail(companyId),
      });

      // Call user-provided onSuccess if any
      options?.onSuccess?.(data, variables, context);
    },
    onError: options?.onError,
  });
}
