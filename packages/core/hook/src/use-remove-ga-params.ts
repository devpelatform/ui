/**
 * Google Analytics linker parameter cleanup hook for React
 * Safely removes the GA `_gl` query parameter from the URL after GA initialization.
 */

"use client";

import { useEffect } from "react";

/**
 * Hook to remove the Google Analytics `_gl` query parameter from the current URL.
 *
 * GA's cross-domain linker temporarily appends `_gl` to URLs for attribution.
 * Removing it *too early* can break attribution, so this hook waits briefly
 * (≈2 seconds) to allow GA to read it, then strips the param using
 * `history.replaceState` without causing a page reload or React re-render.
 *
 * Behavior:
 * - Runs once on mount.
 * - If `_gl` is present, schedules its removal after ~2000ms.
 * - Uses `window.history.replaceState` to avoid navigation/re-render.
 *
 * @example
 * ```tsx
 * // app/layout.tsx or a top-level client component
 * import { useRemoveGAParams } from '@/hooks/use-remove-ga-params';
 *
 * export default function RootLayout({ children }: { children: React.ReactNode }) {
 *   useRemoveGAParams();
 *   return <>{children}</>;
 * }
 * ```
 */
export function useRemoveGAParams(): void {
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.has("_gl")) {
      // Wait for GA to process the linker param before removing it
      const timer = setTimeout(() => {
        url.searchParams.delete("_gl");
        // Avoid a re-render: do not use router.replace here
        window.history.replaceState({}, "", url.toString());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);
}
