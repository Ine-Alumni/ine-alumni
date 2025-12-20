import { useQuery } from "@tanstack/react-query";
import { laureatsService } from "@/services/laureatsService";
import { queryKeys } from "@/lib/react-query/queryKeys";

/**
 * Hook for fetching list of laureates with optional filters
 *
 * @param {Object} options - Optional filter, sort, and pagination options
 * @param {number} options.page - Page number (default: 0)
 * @param {number} options.size - Page size (default: 12)
 * @param {string} options.sortBy - Sort field (default: "fullName")
 * @param {string} options.sortDir - Sort direction (default: "asc")
 *
 * @example
 * const { data, isLoading, error } = useLaureates({ page: 0, size: 12 });
 */
export function useLaureates(options) {
  return useQuery({
    queryKey: queryKeys.laureates.list(options),
    queryFn: () => laureatsService.getAllLaureates(options),
  });
}

/**
 * Hook for searching laureates
 *
 * @param {string} searchTerm - Search term
 * @param {Object} options - Optional pagination options
 * @param {number} options.page - Page number (default: 0)
 * @param {number} options.size - Page size (default: 12)
 *
 * @example
 * const { data, isLoading } = useLaureateSearch("John", { page: 0, size: 12 });
 */
export function useLaureateSearch(searchTerm, options) {
  return useQuery({
    queryKey: queryKeys.laureates.search(searchTerm, options),
    queryFn: () => laureatsService.searchLaureates(searchTerm, options),
    enabled: !!searchTerm && searchTerm.trim().length > 0,
  });
}

/**
 * Hook for filtering laureates with advanced criteria
 *
 * @param {Object} filterData - Filter criteria
 * @param {string} filterData.searchTerm - Search term
 * @param {Array<string>} filterData.majors - Filter by majors
 * @param {Array<number>} filterData.graduationYears - Filter by graduation years
 * @param {Array<string>} filterData.positions - Filter by positions
 * @param {Array<string>} filterData.cities - Filter by cities
 * @param {Array<string>} filterData.domains - Filter by domains
 * @param {Object} options - Optional pagination options
 * @param {number} options.page - Page number (default: 0)
 * @param {number} options.size - Page size (default: 12)
 *
 * @example
 * const { data, isLoading } = useLaureateFilters(
 *   { majors: ['CS'], graduationYears: [2020] },
 *   { page: 0, size: 12 }
 * );
 */
export function useLaureateFilters(filterData, options) {
  return useQuery({
    queryKey: queryKeys.laureates.filters(filterData, options),
    queryFn: () => laureatsService.filterLaureates(filterData, options),
    enabled: !!filterData && Object.keys(filterData).length > 0,
  });
}

/**
 * Hook for fetching a single laureate by ID
 *
 * @param {string|number} id - The laureate ID to fetch
 *
 * @example
 * const { data, isLoading, error } = useLaureate('laureate-123');
 */
export function useLaureate(id) {
  return useQuery({
    queryKey: queryKeys.laureates.detail(id),
    queryFn: () => laureatsService.getLaureateById(id),
    enabled: !!id,
  });
}
