import { useMutation } from "@tanstack/react-query";
import { contactService } from "@/services/contactService";

/**
 * Hook for submitting contact form
 *
 * Features:
 * - Provides loading, error, and success states
 *
 * @param {Object} options - Optional callbacks and configuration
 *
 * @example
 * const { mutateAsync, isPending } = useContactForm({
 *   onSuccess: () => console.log('Message sent!'),
 * });
 *
 * await mutateAsync({
 *   nom: 'John',
 *   prenom: 'Doe',
 *   email: 'john@example.com',
 *   objet: 'Question',
 *   message: 'Hello...',
 * });
 */
export function useContactForm(options) {
  return useMutation({
    mutationFn: (formData) => contactService.submitContactForm(formData),
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
    },
    onError: options?.onError,
  });
}
