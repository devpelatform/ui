/**
 * Media query hook for responsive React components
 * Provides real-time tracking of CSS media query matches
 * with SSR-safe implementation and automatic cleanup
 */

"use client";

import { useEffect, useState } from "react";

/**
 * Helper function to safely check media query matches
 * Prevents SSR hydration issues by checking for window availability
 *
 * @param query - CSS media query string to evaluate
 * @returns Boolean indicating if the media query matches
 */
const getMatches = (query: string): boolean => {
  // Prevents SSR issues by checking for window availability
  if (typeof window !== "undefined") {
    return window.matchMedia(query).matches;
  }
  // Return false during SSR to prevent hydration mismatches
  return false;
};

/**
 * Hook for tracking CSS media query matches in React components
 *
 * Features:
 * - Real-time updates when media query state changes
 * - SSR-safe implementation
 * - Automatic event listener cleanup
 * - Supports all standard CSS media queries
 *
 * @param query - CSS media query string (e.g., '(min-width: 768px)')
 * @returns Boolean indicating whether the media query currently matches
 *
 * @example
 * ```tsx
 * // Basic responsive behavior
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
 * const isDesktop = useMediaQuery('(min-width: 1025px)');
 *
 * // Dark mode preference
 * const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
 *
 * // Reduced motion preference
 * const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
 *
 * return (
 *   <div>
 *     {isMobile && <MobileLayout />}
 *     {isTablet && <TabletLayout />}
 *     {isDesktop && <DesktopLayout />}
 *   </div>
 * );
 * ```
 */
const useMediaQuery = (query: string): boolean => {
  /** State to track current media query match status */
  const [matches, setMatches] = useState<boolean>(getMatches(query));

  useEffect(() => {
    /**
     * Handler function to update matches state when media query changes
     */
    function handleChange() {
      setMatches(getMatches(query));
    }

    // Create MediaQueryList object for the given query
    const matchMedia = window.matchMedia(query);

    // Set initial state on client-side mount and when query changes
    handleChange();

    // Add event listener for media query changes
    matchMedia.addEventListener("change", handleChange);

    // Cleanup function to remove event listener
    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [query]); // Re-run effect when query changes

  return matches;
};

export { useMediaQuery };
