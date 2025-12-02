/**
 * DOM Mutation Observer hook for React components
 * Provides a React-friendly interface for observing DOM changes
 * with automatic cleanup and ref integration
 */

"use client";

import * as React from "react";

/**
 * Default options for MutationObserver
 * Observes all types of mutations by default
 */
const DEFAULT_OPTIONS: MutationObserverInit = {
  /** Watch for attribute changes */
  attributes: true,
  /** Watch for text content changes */
  characterData: true,
  /** Watch for child element additions/removals */
  childList: true,
  /** Watch for changes in descendant elements */
  subtree: true,
};

/**
 * Hook to observe DOM mutations on a referenced element
 *
 * This hook provides a React-friendly way to use the MutationObserver API.
 * It automatically handles observer creation, cleanup, and ref management.
 * Useful for detecting DOM changes that occur outside of React's control.
 *
 * Features:
 * - Automatic observer lifecycle management
 * - Configurable observation options
 * - Ref-based element targeting
 * - Automatic cleanup on unmount
 *
 * @param ref - React ref pointing to the element to observe
 * @param callback - Function called when mutations are detected
 * @param options - MutationObserver configuration options
 *
 * @example
 * ```tsx
 * function DynamicContent() {
 *   const contentRef = useRef<HTMLDivElement>(null);
 *
 *   // Watch for any changes to the content div
 *   useMutationObserver(
 *     contentRef,
 *     (mutations) => {
 *       mutations.forEach((mutation) => {
 *         console.log('DOM changed:', mutation.type);
 *       });
 *     }
 *   );
 *
 *   return <div ref={contentRef}>Dynamic content here</div>;
 * }
 *
 * // Watch only for attribute changes
 * function AttributeWatcher() {
 *   const elementRef = useRef<HTMLElement>(null);
 *
 *   useMutationObserver(
 *     elementRef,
 *     (mutations) => {
 *       mutations.forEach((mutation) => {
 *         if (mutation.type === 'attributes') {
 *           console.log('Attribute changed:', mutation.attributeName);
 *         }
 *       });
 *     },
 *     { attributes: true, childList: false, subtree: false }
 *   );
 *
 *   return <div ref={elementRef}>Watched element</div>;
 * }
 * ```
 */
export const useMutationObserver = (
  ref: React.RefObject<HTMLElement | null>,
  callback: MutationCallback,
  options: MutationObserverInit = DEFAULT_OPTIONS,
) => {
  React.useEffect(() => {
    // Only proceed if ref has a current element
    if (ref.current) {
      // Create new MutationObserver instance
      const observer = new MutationObserver(callback);

      // Start observing the target element
      observer.observe(ref.current, options);

      // Cleanup function to disconnect observer
      return () => {
        observer.disconnect();
      };
    }
  }, [ref, callback, options]); // Re-run effect when dependencies change
};
