import { useQuery } from "@tanstack/react-query";
import { eventsService } from "@/services/eventsService";
import { queryKeys } from "@/lib/react-query/queryKeys";

/**
 * Hook for fetching public events
 *
 * Features:
 * - Automatically caches and deduplicates requests
 * - Background refetching
 * - Stale-while-revalidate pattern
 *
 * @example
 * const { data, isLoading, error } = useEvents();
 */
export function useEvents() {
  return useQuery({
    queryKey: queryKeys.events.public(),
    queryFn: () => eventsService.getAllEvents(),
  });
}

/**
 * Hook for fetching a single event by ID
 *
 * @param {string|number} id - The event ID to fetch
 *
 * @example
 * const { data, isLoading, error } = useEvent('event-123');
 */
export function useEvent(id) {
  return useQuery({
    queryKey: queryKeys.events.detail(id),
    queryFn: () => eventsService.getEventById(id),
    enabled: !!id,
  });
}
