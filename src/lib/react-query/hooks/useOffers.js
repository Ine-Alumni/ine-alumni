import { useQuery } from "@tanstack/react-query";
import { offersService } from "@/services/offersService";
import { queryKeys } from "@/lib/react-query/queryKeys";

/**
 * Hook for fetching list of job offers
 *
 * Features:
 * - Automatically caches and deduplicates requests
 * - Background refetching
 * - Stale-while-revalidate pattern
 *
 * @example
 * const { data, isLoading, error } = useOffers();
 */
export function useOffers() {
  return useQuery({
    queryKey: queryKeys.offers.lists(),
    queryFn: () => offersService.getAllOffers(),
  });
}

/**
 * Hook for fetching a single offer by ID
 *
 * @param {string|number} id - The offer ID to fetch
 *
 * @example
 * const { data, isLoading, error } = useOffer('offer-123');
 */
export function useOffer(id) {
  return useQuery({
    queryKey: queryKeys.offers.detail(id),
    queryFn: () => offersService.getOfferById(id),
    enabled: !!id,
  });
}
