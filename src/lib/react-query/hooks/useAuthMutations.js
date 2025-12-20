import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/authService.js";
import { queryKeys } from "@/lib/react-query/queryKeys";

/**
 * Hook for user login
 *
 * Features:
 * - Automatically invalidates auth and profile queries on success
 * - Provides loading, error, and success states
 * - Allows custom onSuccess/onError callbacks
 *
 * @param {Object} options - Optional callbacks and configuration
 * @param {Function} options.onSuccess - Called after successful login and cache invalidation
 * @param {Function} options.onError - Called when login fails
 *
 * @example
 * const { mutateAsync, isPending } = useLogin({
 *   onSuccess: (data) => console.log('Logged in:', data.email),
 *   onError: (error) => console.error('Login failed:', error.message),
 * });
 *
 * await mutateAsync({ email: 'user@example.com', password: 'password' });
 */
export function useLogin(options) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }) => authService.login(email, password),
    onSuccess: (data, variables, context) => {
      // Always invalidate auth and profile queries to trigger refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.profile.all });

      // Call user-provided onSuccess if any
      options?.onSuccess?.(data, variables, context);
    },
    onError: options?.onError,
  });
}

/**
 * Hook for user registration
 *
 * @param {Object} options - Optional callbacks and configuration
 *
 * @example
 * const { mutateAsync, isPending } = useSignup();
 *
 * await mutateAsync({
 *   fullName: 'John Doe',
 *   email: 'john@example.com',
 *   password: 'password',
 *   major: 'CS',
 *   graduationYear: 2020,
 *   phoneNumber: '+1234567890',
 *   gender: 'MALE',
 *   country: 'USA',
 *   city: 'New York',
 * });
 */
export function useSignup(options) {
  return useMutation({
    mutationFn: (data) =>
      authService.register(
        data.fullName,
        data.email,
        data.password,
        data.major,
        data.graduationYear,
        data.phoneNumber,
        data.gender,
        data.country,
        data.city,
      ),
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
    },
    onError: options?.onError,
  });
}

/**
 * Hook for user logout
 *
 * Features:
 * - Clears all cache on logout
 * - Removes auth from localStorage
 *
 * @example
 * const { mutate } = useLogout();
 * mutate();
 */
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      authService.logout();
      return Promise.resolve();
    },
    onSuccess: () => {
      // Clear all cache on logout
      queryClient.clear();
    },
  });
}

/**
 * Hook for email verification
 *
 * @param {Object} options - Optional callbacks and configuration
 *
 * @example
 * const { mutateAsync, isPending } = useEmailVerification();
 * await mutateAsync('123456');
 */
export function useEmailVerification(options) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (otp) => authService.verifyEmail(otp),
    onSuccess: (data, variables, context) => {
      // Invalidate auth and profile to refresh verification status
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.profile.all });
      options?.onSuccess?.(data, variables, context);
    },
    onError: options?.onError,
  });
}

/**
 * Hook for resending verification email
 *
 * @param {Object} options - Optional callbacks and configuration
 *
 * @example
 * const { mutateAsync, isPending } = useResendVerification();
 * await mutateAsync();
 */
export function useResendVerification(options) {
  return useMutation({
    mutationFn: () => authService.resendVerificationEmail(),
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
    },
    onError: options?.onError,
  });
}
