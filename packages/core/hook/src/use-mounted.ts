/**
 * Component mount state hook for React components
 * Provides a reliable way to detect when a component has mounted on the client
 * Essential for SSR applications to prevent hydration mismatches
 */

"use client";

import * as React from "react";

/**
 * Hook to detect when a React component has mounted on the client side
 *
 * This hook is essential for SSR applications where you need to conditionally
 * render content only after the component has mounted on the client. It helps
 * prevent hydration mismatches between server and client rendering.
 *
 * Features:
 * - Starts with false during SSR
 * - Updates to true after client-side mount
 * - Prevents hydration mismatches
 * - Simple boolean state management
 *
 * @returns Boolean indicating whether the component has mounted
 *
 * @example
 * ```tsx
 * function ClientOnlyComponent() {
 *   const mounted = useMounted();
 *
 *   // Prevent rendering until mounted to avoid hydration issues
 *   if (!mounted) {
 *     return <div>Loading...</div>;
 *   }
 *
 *   return (
 *     <div>
 *       <BrowserOnlyFeature />
 *       <LocalStorageComponent />
 *     </div>
 *   );
 * }
 *
 * // Conditional rendering based on mount state
 * function ThemeToggle() {
 *   const mounted = useMounted();
 *   const { theme, setTheme } = useTheme();
 *
 *   // Avoid showing theme toggle until mounted
 *   if (!mounted) return null;
 *
 *   return (
 *     <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
 *       Toggle Theme
 *     </button>
 *   );
 * }
 * ```
 */
export function useMounted() {
  /**
   * State to track mount status
   * Starts as false to match SSR state
   */
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Set mounted to true after component mounts on client
    setMounted(true);
  }, []); // Empty dependency array ensures this runs only once

  return mounted;
}
