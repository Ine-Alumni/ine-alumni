import { useQuery } from "@tanstack/react-query";
import { companiesService } from "@/services/companiesService";
import { queryKeys } from "@/lib/react-query/queryKeys";

/**
 * Hook for fetching list of companies with optional filters
 *
 * Features:
 * - Automatically caches and deduplicates requests
 * - Background refetching
 * - Stale-while-revalidate pattern
 *
 * @param {Object} options - Optional filter, sort, and pagination options
 * @param {number} options.page - Page number (default: 0)
 * @param {number} options.size - Page size (default: 12)
 * @param {string} options.sortBy - Sort field (default: "name")
 * @param {string} options.sortDir - Sort direction (default: "asc")
 *
 * @example
 * const { data, isLoading, error } = useCompanies({ page: 0, size: 12 });
 */
export function useCompanies(options) {
  return useQuery({
    queryKey: queryKeys.companies.list(options),
    queryFn: () => companiesService.getAllCompanies(options),
  });
}

/**
 * Hook for searching companies
 *
 * @param {string} searchTerm - Search term
 * @param {Object} options - Optional pagination options
 * @param {number} options.page - Page number (default: 0)
 * @param {number} options.size - Page size (default: 12)
 *
 * @example
 * const { data, isLoading } = useCompanySearch("tech", { page: 0, size: 12 });
 */
export function useCompanySearch(searchTerm, options) {
  return useQuery({
    queryKey: queryKeys.companies.search(searchTerm, options),
    queryFn: () => companiesService.searchCompanies(searchTerm, options),
    enabled: !!searchTerm && searchTerm.trim().length > 0,
  });
}

/**
 * Hook for fetching a single company by ID
 *
 * @param {string|number} id - The company ID to fetch
 *
 * @example
 * const { data, isLoading, error } = useCompany('company-123');
 */
export function useCompany(id) {
  return useQuery({
    queryKey: queryKeys.companies.detail(id),
    queryFn: () => companiesService.getCompanyById(id),
    enabled: !!id,
  });
}

/**
 * Hook for fetching company alumni
 *
 * @param {string|number} id - The company ID
 * @param {Object} options - Optional pagination options
 * @param {number} options.page - Page number (default: 0)
 * @param {number} options.size - Page size (default: 12)
 *
 * @example
 * const { data, isLoading } = useCompanyAlumni('company-123', { page: 0, size: 12 });
 */
export function useCompanyAlumni(id, options) {
  return useQuery({
    queryKey: queryKeys.companies.alumni(id, options),
    queryFn: () => companiesService.getCompanyAlumni(id, options),
    enabled: !!id,
  });
}

/**
 * Hook for fetching company reviews
 *
 * @param {string|number} id - The company ID
 * @param {Object} options - Optional pagination options
 * @param {number} options.page - Page number (default: 0)
 * @param {number} options.size - Page size (default: 10)
 *
 * @example
 * const { data, isLoading } = useCompanyReviews('company-123', { page: 0, size: 10 });
 */
export function useCompanyReviews(id, options) {
  return useQuery({
    queryKey: queryKeys.companies.reviews(id, options),
    queryFn: () => companiesService.getCompanyReviews(id, options),
    enabled: !!id,
  });
}
