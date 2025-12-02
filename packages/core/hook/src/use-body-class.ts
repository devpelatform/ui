/**
 * Body class management hook for React components
 * Dynamically adds and removes CSS classes from the document body element
 * Useful for global styling based on component state or route changes
 */

"use client";

import { useEffect } from "react";

/**
 * Hook to dynamically add and remove CSS classes from the document body
 *
 * This hook automatically manages the lifecycle of body classes:
 * - Adds classes when the component mounts
 * - Removes classes when the component unmounts
 * - Updates classes when the className prop changes
 *
 * @param className - Space-separated string of CSS class names to apply to body
 *
 * @example
 * ```tsx
 * // Single class
 * useBodyClasses('dark-theme');
 *
 * // Multiple classes
 * useBodyClasses('modal-open overflow-hidden');
 *
 * // Conditional classes
 * useBodyClasses(isModalOpen ? 'modal-open' : '');
 * ```
 */
export const useBodyClasses = (className: string) => {
  useEffect(() => {
    // Early return if no className provided
    if (!className.trim()) return;

    // Split classNames by spaces, including multi-line support
    const classList = className.split(/\s+/).filter(Boolean);

    // Add each class to the body element when the component mounts
    classList.forEach((cls) => {
      document.body.classList.add(cls);
    });

    // Cleanup function to remove classes when the component unmounts
    return () => {
      classList.forEach((cls) => {
        document.body.classList.remove(cls);
      });
    };
  }, [className]); // Re-run the effect if className changes
};
