import { useMutation, useQueryClient } from "@tanstack/react-query";
import { eventsService } from "@/services/eventsService";
import { queryKeys } from "@/lib/react-query/queryKeys";

/**
 * Hook for creating a new event
 *
 * Features:
 * - Automatically invalidates events list queries on success
 * - Provides loading, error, and success states
 *
 * @param {Object} options - Optional callbacks and configuration
 *
 * @example
 * const { mutateAsync, isPending } = useCreateEvent({
 *   onSuccess: (data) => console.log('Event created:', data.id),
 * });
 *
 * await mutateAsync({
 *   title: 'Tech Meetup',
 *   description: '...',
 *   date: '2025-02-01T10:00:00',
 *   location: 'Paris',
 *   club: 'Entrepreneurship',
 * });
 */
export function useCreateEvent(options) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventData) => eventsService.createEvent(eventData),
    onSuccess: (data, variables, context) => {
      // Always invalidate events list to trigger refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.events.public() });

      // Call user-provided onSuccess if any
      options?.onSuccess?.(data, variables, context);
    },
    onError: options?.onError,
  });
}

/**
 * Hook for uploading event image
 *
 * @param {Object} options - Optional callbacks and configuration
 *
 * @example
 * const { mutateAsync, isPending } = useUploadEventImage();
 * const formData = new FormData();
 * formData.append('file', file);
 * await mutateAsync(formData);
 */
export function useUploadEventImage(options) {
  return useMutation({
    mutationFn: (formData) => eventsService.uploadEventImage(formData),
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
    },
    onError: options?.onError,
  });
}
