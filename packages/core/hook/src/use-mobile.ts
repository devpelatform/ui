/**
 * Mobile device detection hook for React components
 * Provides real-time mobile/desktop state based on configurable viewport width breakpoint
 * Uses customizable mobile breakpoint with proper SSR handling and hydration safety
 */

"use client";

import * as React from "react";

/**
 * Default mobile breakpoint in pixels
 * Devices with width less than this value are considered mobile
 * Standard breakpoint that aligns with common CSS frameworks
 */
const DEFAULT_MOBILE_BREAKPOINT = 1024;

/**
 * Hook to detect if the current viewport is mobile-sized based on configurable breakpoint
 *
 * This hook provides real-time detection of mobile vs desktop viewports with a customizable
 * breakpoint threshold. It handles SSR properly by starting with undefined state and updating
 * on client-side hydration to prevent hydration mismatches.
 *
 * The hook uses both `matchMedia` API for efficient media query listening and `window.innerWidth`
 * for consistent viewport width detection across different browsers and devices.
 *
 * Features:
 * - Real-time viewport size tracking with media query listeners
 * - SSR-safe implementation preventing hydration mismatches
 * - Automatic event listener cleanup on unmount
 * - Configurable mobile breakpoint with sensible default (1024px)
 * - Performance optimized with proper dependency management
 * - TypeScript support with proper type definitions
 *
 * @param breakpoint - Custom breakpoint in pixels. Viewports smaller than this value are considered mobile. Defaults to 1024px if not provided.
 * @returns Boolean indicating if current viewport width is smaller than the specified breakpoint (mobile-sized)
 *
 * @example
 * ```tsx
 * // Basic usage with default breakpoint (1024px)
 * function ResponsiveComponent() {
 *   const isMobile = useIsMobile();
 *
 *   return (
 *     <div>
 *       {isMobile ? (
 *         <MobileNavigation />
 *       ) : (
 *         <DesktopNavigation />
 *       )}
 *     </div>
 *   );
 * }
 *
 * // Custom breakpoint for tablet detection
 * function TabletResponsiveComponent() {
 *   const isMobile = useIsMobile(768); // Use 768px breakpoint
 *   const isTablet = useIsMobile(1024); // Use 1024px for tablet detection
 *
 *   return (
 *     <div className={isMobile ? 'mobile-layout' : isTablet ? 'tablet-layout' : 'desktop-layout'}>
 *       <Content />
 *     </div>
 *   );
 * }
 *
 * // Conditional rendering with custom breakpoint
 * function AdaptiveLayout() {
 *   const isSmallScreen = useIsMobile(640); // Custom small screen breakpoint
 *
 *   return (
 *     <div className="container">
 *       {isSmallScreen ? (
 *         <div className="flex flex-col space-y-4">
 *           <MobileHeader />
 *           <MobileContent />
 *         </div>
 *       ) : (
 *         <div className="grid grid-cols-12 gap-6">
 *           <aside className="col-span-3">
 *             <Sidebar />
 *           </aside>
 *           <main className="col-span-9">
 *             <DesktopContent />
 *           </main>
 *         </div>
 *       )}
 *     </div>
 *   );
 * }
 *
 * // Multiple breakpoints for different layouts
 * function MultiBreakpointLayout() {
 *   const isMobile = useIsMobile(640);   // Mobile: < 640px
 *   const isTablet = useIsMobile(1024);  // Tablet: < 1024px
 *   const isDesktop = !isTablet;         // Desktop: >= 1024px
 *
 *   if (isMobile) {
 *     return <MobileLayout />;
 *   }
 *
 *   if (isTablet) {
 *     return <TabletLayout />;
 *   }
 *
 *   return <DesktopLayout />;
 * }
 * ```
 *
 * @since 1.0.0
 */
export function useIsMobile(breakpoint: number = DEFAULT_MOBILE_BREAKPOINT) {
  /**
   * State to track mobile status
   * Starts as undefined to handle SSR properly and prevent hydration mismatches
   * Will be updated to actual boolean value after client-side mount
   */
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    /**
     * Create media query list for the specified breakpoint
     * Uses max-width approach: viewport <= (breakpoint - 1)px is considered mobile
     * The -1 ensures clean breakpoint boundaries (e.g., 991px and below for 1024px breakpoint)
     */
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

    /**
     * Handler function to update mobile state when viewport changes
     * Uses window.innerWidth for consistent and reliable viewport width detection
     * This approach works consistently across different browsers and devices
     */
    const onChange = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Add event listener for viewport size changes
    mql.addEventListener("change", onChange);

    // Set initial state immediately on mount to prevent flash
    setIsMobile(window.innerWidth < breakpoint);

    // Cleanup function to remove event listener and prevent memory leaks
    return () => mql.removeEventListener("change", onChange);
  }, [breakpoint]); // Re-run effect when breakpoint changes

  /**
   * Return boolean value, converting undefined to false for SSR safety
   * During SSR and initial client render: undefined -> false
   * After client-side hydration: actual boolean value based on viewport width
   * This approach prevents hydration mismatches while providing accurate mobile detection
   */
  return !!isMobile;
}
