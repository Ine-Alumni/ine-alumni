import { useMutation, useQueryClient } from "@tanstack/react-query";
import { offersService } from "@/services/offersService";
import { queryKeys } from "@/lib/react-query/queryKeys";

/**
 * Hook for submitting a job offer
 *
 * Features:
 * - Automatically invalidates offers list queries on success
 * - Provides loading, error, and success states
 *
 * @param {Object} options - Optional callbacks and configuration
 *
 * @example
 * const { mutateAsync, isPending } = useSubmitJob({
 *   onSuccess: (data) => console.log('Job submitted:', data.id),
 * });
 *
 * await mutateAsync({
 *   title: 'Software Engineer',
 *   company: 'TechCorp',
 *   location: 'Paris',
 *   type: 'FULL_TIME',
 * });
 */
export function useSubmitJob(options) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobData) => offersService.createOffer(jobData),
    onSuccess: (data, variables, context) => {
      // Always invalidate offers list to trigger refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.offers.lists() });

      // Call user-provided onSuccess if any
      options?.onSuccess?.(data, variables, context);
    },
    onError: options?.onError,
  });
}

/**
 * Hook for applying to a job
 *
 * @param {Object} options - Optional callbacks and configuration
 *
 * @example
 * const { mutateAsync, isPending } = useApplyToJob();
 * await mutateAsync({
 *   offerId: 123,
 *   message: 'I am interested...',
 *   resumeUrl: 'https://...',
 * });
 */
export function useApplyToJob(options) {
  return useMutation({
    mutationFn: ({ offerId, message, resumeUrl }) => {
      return offersService.applyToOffer(offerId, { message, resumeUrl });
    },
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
    },
    onError: options?.onError,
  });
}
