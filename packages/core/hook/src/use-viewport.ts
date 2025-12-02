/**
 * Viewport dimensions tracking hook for React components
 * Provides real-time viewport width and height with automatic updates
 * on window resize events with SSR-safe implementation
 */

"use client";

import { useEffect, useState } from "react";

/**
 * Type definition for viewport dimensions
 * Returns tuple of [height, width] in pixels
 */
type ViewportDimensions = [number, number];

/**
 * Hook to track viewport dimensions with real-time updates
 *
 * This hook provides the current viewport dimensions and automatically
 * updates when the window is resized. It's useful for responsive layouts,
 * conditional rendering based on screen size, and dynamic calculations.
 *
 * Features:
 * - Real-time viewport dimension tracking
 * - Automatic updates on window resize
 * - Performance optimized with passive event listeners
 * - SSR-safe implementation
 * - Returns both height and width
 *
 * @returns Tuple containing [height, width] in pixels
 *
 * @example
 * ```tsx
 * // Basic usage
 * function ResponsiveComponent() {
 *   const [height, width] = useViewport();
 *
 *   return (
 *     <div>
 *       <p>Viewport: {width}x{height}</p>
 *       {width > 768 ? <DesktopLayout /> : <MobileLayout />}
 *     </div>
 *   );
 * }
 *
 * // Destructured usage
 * function ViewportInfo() {
 *   const [height, width] = useViewport();
 *   const aspectRatio = (width / height).toFixed(2);
 *
 *   return (
 *     <div className="viewport-info">
 *       <p>Width: {width}px</p>
 *       <p>Height: {height}px</p>
 *       <p>Aspect Ratio: {aspectRatio}</p>
 *     </div>
 *   );
 * }
 *
 * // Conditional rendering based on viewport
 * function AdaptiveGrid() {
 *   const [, width] = useViewport();
 *   const columns = width > 1200 ? 4 : width > 768 ? 3 : width > 480 ? 2 : 1;
 *
 *   return (
 *     <div className={`grid grid-cols-${columns} gap-4`}>
 *       {items.map(item => <GridItem key={item.id} {...item} />)}
 *     </div>
 *   );
 * }
 * ```
 */
const useViewport = (): ViewportDimensions => {
  /**
   * State to track viewport dimensions
   * Initialized with current window dimensions or fallback for SSR
   */
  const [dimensions, setDimensions] = useState<ViewportDimensions>(() => {
    // SSR-safe initialization
    if (typeof window !== "undefined") {
      return [window.innerHeight, window.innerWidth];
    }
    // Fallback dimensions for SSR
    return [0, 0];
  });

  useEffect(() => {
    /**
     * Handle window resize events
     * Updates dimensions state with current viewport size
     */
    const handleResize = (): void => {
      setDimensions([window.innerHeight, window.innerWidth]);
    };

    // Set initial dimensions on mount (for SSR hydration)
    handleResize();

    // Add resize event listener with passive option for better performance
    window.addEventListener("resize", handleResize, { passive: true });

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array - effect runs once on mount

  return dimensions;
};

export { useViewport };
