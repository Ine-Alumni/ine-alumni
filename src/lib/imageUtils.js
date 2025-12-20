import { FILE_BASE_URL } from "./api";

/**
 * Constructs a full URL for an image path
 *
 * Handles:
 * - Relative paths starting with "/uploads" or "/uploads/"
 * - Absolute URLs (returns as-is)
 * - Empty/null values (returns null)
 *
 * @param {string|null|undefined} imagePath - The image path from the API
 * @returns {string|null} - The full URL or null if no path provided
 *
 * @example
 * getImageUrl("/uploads/event-123.jpg") // "http://localhost:8080/uploads/event-123.jpg"
 * getImageUrl("https://example.com/image.jpg") // "https://example.com/image.jpg"
 * getImageUrl(null) // null
 */
export function getImageUrl(imagePath) {
  if (!imagePath) return null;

  // If it's already a full URL, return as-is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // Handle relative paths
  const normalizedPath = imagePath.startsWith("/")
    ? imagePath
    : `/${imagePath}`;
  return `${FILE_BASE_URL}${normalizedPath}`;
}

/**
 * Constructs a full URL for an image path with fallback
 *
 * @param {string|null|undefined} imagePath - The image path from the API
 * @param {string} fallback - Fallback image path (default: "/default-banner.jpg")
 * @returns {string} - The full URL or fallback
 *
 * @example
 * getImageUrlWithFallback("/uploads/event-123.jpg", "/default.jpg")
 * getImageUrlWithFallback(null, "/default.jpg") // "/default.jpg"
 */
export function getImageUrlWithFallback(
  imagePath,
  fallback = "/default-banner.jpg",
) {
  const url = getImageUrl(imagePath);
  return url || fallback;
}
