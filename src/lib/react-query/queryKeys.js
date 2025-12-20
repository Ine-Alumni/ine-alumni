/**
 * Query Keys Factory
 *
 * Centralized query key management following React Query best practices.
 * Keys are structured hierarchically for efficient cache invalidation.
 *
 * Structure:
 * - ['companies'] - All company queries
 * - ['companies', 'list'] - List of companies
 * - ['companies', 'list', { filters }] - Filtered list
 * - ['companies', 'detail', id] - Single company
 *
 * Benefits:
 * - Type-safe key generation
 * - Easy to invalidate related queries
 * - Consistent key structure across the app
 */

export const queryKeys = {
  companies: {
    // Base key for all company-related queries
    all: ["companies"],

    // List queries
    lists: () => [...queryKeys.companies.all, "list"],
    list: (params) => [...queryKeys.companies.lists(), params],

    // Search queries
    search: (searchTerm, params) => [
      ...queryKeys.companies.all,
      "search",
      searchTerm,
      params,
    ],

    // Detail queries
    details: () => [...queryKeys.companies.all, "detail"],
    detail: (id) => [...queryKeys.companies.details(), id],

    // Related data queries
    alumni: (id, params) => [
      ...queryKeys.companies.detail(id),
      "alumni",
      params,
    ],
    reviews: (id, params) => [
      ...queryKeys.companies.detail(id),
      "reviews",
      params,
    ],
  },

  laureates: {
    // Base key for all laureate-related queries
    all: ["laureates"],

    // List queries
    lists: () => [...queryKeys.laureates.all, "list"],
    list: (params) => [...queryKeys.laureates.lists(), params],

    // Search queries
    search: (searchTerm, params) => [
      ...queryKeys.laureates.all,
      "search",
      searchTerm,
      params,
    ],

    // Filter queries
    filters: (filterData, params) => [
      ...queryKeys.laureates.all,
      "filter",
      filterData,
      params,
    ],

    // Detail queries
    details: () => [...queryKeys.laureates.all, "detail"],
    detail: (id) => [...queryKeys.laureates.details(), id],
  },

  offers: {
    // Base key for all offer-related queries
    all: ["offers"],

    // List queries
    lists: () => [...queryKeys.offers.all, "list"],
    list: (params) => [...queryKeys.offers.lists(), params],

    // Detail queries
    details: () => [...queryKeys.offers.all, "detail"],
    detail: (id) => [...queryKeys.offers.details(), id],
  },

  events: {
    // Base key for all event-related queries
    all: ["events"],

    // Public events
    public: () => [...queryKeys.events.all, "public"],

    // Detail queries
    details: () => [...queryKeys.events.all, "detail"],
    detail: (id) => [...queryKeys.events.details(), id],
  },

  profile: {
    // Base key for all profile-related queries
    all: ["profile"],

    // Current user profile
    current: () => [...queryKeys.profile.all, "current"],

    // User info
    userInfo: () => [...queryKeys.profile.all, "userInfo"],
  },

  auth: {
    // Base key for all auth-related queries
    all: ["auth"],

    // Auth validation
    validation: () => [...queryKeys.auth.all, "validation"],
  },
};

/**
 * Examples of usage:
 *
 * 1. Get all companies:
 *    useQuery({ queryKey: queryKeys.companies.lists(), ... })
 *
 * 2. Get filtered companies:
 *    useQuery({ queryKey: queryKeys.companies.list({ page: 0, size: 12 }), ... })
 *
 * 3. Get single company:
 *    useQuery({ queryKey: queryKeys.companies.detail(id), ... })
 *
 * 4. Invalidate all company queries:
 *    queryClient.invalidateQueries({ queryKey: queryKeys.companies.all })
 *
 * 5. Invalidate only list queries:
 *    queryClient.invalidateQueries({ queryKey: queryKeys.companies.lists() })
 */
