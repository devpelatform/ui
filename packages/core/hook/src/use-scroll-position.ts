/**
 * Scroll position tracking hook for React components
 * Monitors scroll position of window or specific elements
 * with real-time updates and automatic cleanup
 */

"use client";

import type { RefObject } from "react";
import { useEffect, useState } from "react";

/**
 * Configuration options for the scroll position hook
 */
interface UseScrollPositionProps {
  /** Optional ref to a specific scrollable element (defaults to document) */
  targetRef?: RefObject<HTMLElement | Document | undefined>;
}

/**
 * Hook to track scroll position of window or specific elements
 *
 * This hook provides real-time tracking of scroll position with support
 * for both window scrolling and element-specific scrolling. It automatically
 * handles event listener management and cleanup.
 *
 * Features:
 * - Real-time scroll position tracking
 * - Support for window and element scrolling
 * - Automatic event listener cleanup
 * - SSR-safe implementation
 * - Performance optimized
 *
 * @param options - Configuration options for the hook
 * @returns Current scroll position in pixels
 *
 * @example
 * ```tsx
 * // Track window scroll position
 * function ScrollIndicator() {
 *   const scrollPosition = useScrollPosition();
 *
 *   return (
 *     <div className="scroll-indicator">
 *       Scrolled: {scrollPosition}px
 *     </div>
 *   );
 * }
 *
 * // Track specific element scroll position
 * function ScrollableContent() {
 *   const contentRef = useRef<HTMLDivElement>(null);
 *   const scrollPosition = useScrollPosition({ targetRef: contentRef });
 *
 *   return (
 *     <div
 *       ref={contentRef}
 *       className="h-96 overflow-y-auto"
 *     >
 *       <div className="h-[1000px]">
 *         <p>Scroll position: {scrollPosition}px</p>
 *         <p>Long content here...</p>
 *       </div>
 *     </div>
 *   );
 * }
 *
 * // Show/hide header based on scroll
 * function StickyHeader() {
 *   const scrollPosition = useScrollPosition();
 *   const isVisible = scrollPosition < 100;
 *
 *   return (
 *     <header className={`transition-transform ${
 *       isVisible ? 'translate-y-0' : '-translate-y-full'
 *     }`}>
 *       Header content
 *     </header>
 *   );
 * }
 * ```
 */
const useScrollPosition = ({
  targetRef,
}: UseScrollPositionProps = {}): number => {
  /** State to track current scroll position */
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    // Determine the target element (fallback to document if not provided)
    const target = targetRef?.current || document;

    // Determine the scrollable element (window for document, element for others)
    const scrollable = target === document ? window : target;

    /**
     * Update scroll position state
     * Handles both window and element scrolling
     */
    const updatePosition = () => {
      // Get scroll position based on target type
      const scrollY =
        target === document
          ? window.scrollY || window.pageYOffset // Fallback for older browsers
          : (target as HTMLElement).scrollTop;

      setScrollPosition(scrollY);
    };

    // Add scroll event listener
    scrollable.addEventListener("scroll", updatePosition, { passive: true });

    // Set initial scroll position
    updatePosition();

    // Cleanup function to remove event listener
    return () => {
      scrollable.removeEventListener("scroll", updatePosition);
    };
  }, [targetRef]); // Re-run effect when targetRef changes

  return scrollPosition;
};

export { useScrollPosition };
