/**
 * Hydration state hook for React components
 * Returns a boolean indicating whether the component is running on the client
 * with SSR-safe behavior to prevent hydration mismatches.
 *
 * This hook leverages `useSyncExternalStore` to provide a stable value between
 * server and client renders: `false` during SSR, `true` after client hydration.
 * The external store does not emit updates because the hydration state is static
 * for the lifetime of the component.
 */
"use client";

import { useSyncExternalStore } from "react";

/**
 * Hook that indicates whether code is executing on the client after hydration
 *
 * Features:
 * - SSR-safe: returns `false` on the server to avoid hydration mismatches
 * - Client-stable: returns `true` after hydration and remains stable
 * - Minimal overhead: uses a no-op external store subscription
 *
 * @returns Boolean indicating hydration state (`true` on client, `false` on server)
 *
 * @example
 * ```tsx
 * // Conditionally render client-only components safely
 * function ClientOnly() {
 *   const hydrated = useHydrated();
 *   if (!hydrated) return null;
 *   return <InteractiveChart />;
 * }
 * ```
 *
 * @since 1.0.0
 */
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

/**
 * External store subscription used by `useHydrated`
 * No updates are dispatched because hydration state is static.
 * Returns an unsubscribe function for API conformity.
 */
function subscribe() {
  return () => {};
}
