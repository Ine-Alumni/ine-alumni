import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileService } from "@/services/profileService";
import { queryKeys } from "@/lib/react-query/queryKeys";

/**
 * Hook for updating user profile
 *
 * Features:
 * - Automatically invalidates profile queries on success
 * - Provides loading, error, and success states
 * - Allows custom onSuccess/onError callbacks
 *
 * @param {Object} options - Optional callbacks and configuration
 *
 * @example
 * const { mutateAsync, isPending } = useUpdateProfile({
 *   onSuccess: (data) => console.log('Profile updated:', data),
 * });
 *
 * await mutateAsync({ name: 'John Doe', title: 'Software Engineer' });
 */
export function useUpdateProfile(options) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileData) => profileService.updateProfile(profileData),
    onSuccess: (data, variables, context) => {
      // Always invalidate profile queries to trigger refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.profile.all });

      // Call user-provided onSuccess if any
      options?.onSuccess?.(data, variables, context);
    },
    onError: options?.onError,
  });
}

/**
 * Hook for uploading avatar
 *
 * @param {Object} options - Optional callbacks and configuration
 *
 * @example
 * const { mutateAsync, isPending } = useUploadAvatar();
 * await mutateAsync({ avatar: base64ImageData });
 */
export function useUploadAvatar(options) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ avatar }) => profileService.uploadAvatar({ avatar }),
    onSuccess: (data, variables, context) => {
      // Invalidate profile to refresh avatar
      queryClient.invalidateQueries({ queryKey: queryKeys.profile.all });
      options?.onSuccess?.(data, variables, context);
    },
    onError: options?.onError,
  });
}
