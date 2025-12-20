import { useQuery } from "@tanstack/react-query";
import { profileService } from "@/services/profileService";
import userService from "@/services/userService.js";
import { queryKeys } from "@/lib/react-query/queryKeys";

/**
 * Hook for fetching current user profile
 *
 * Features:
 * - Automatically caches and deduplicates requests
 * - Background refetching
 * - Stale-while-revalidate pattern
 *
 * @example
 * const { data, isLoading, error } = useProfile();
 */
export function useProfile() {
  return useQuery({
    queryKey: queryKeys.profile.current(),
    queryFn: () => profileService.getProfile(),
  });
}

/**
 * Hook for fetching user info
 *
 * @example
 * const { data, isLoading, error } = useUserInfo();
 */
export function useUserInfo() {
  return useQuery({
    queryKey: queryKeys.profile.userInfo(),
    queryFn: async () => {
      const response = await userService.getUserInfo();
      return response.data;
    },
  });
}
