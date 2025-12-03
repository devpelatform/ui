/**
 * Toast notification hook and manager for React components
 * Provides a simple API to trigger and manage toast messages across the app
 */

"use client";

import { Toast } from "@base-ui-components/react/toast";

/**
 * Global toast manager instance
 *
 * Use this manager to imperatively show toasts from anywhere (including non-React code).
 *
 * @example
 * ```tsx
 * // Show a basic toast
 * toastManager.show({ content: 'Saved successfully' });
 *
 * // With additional options (duration, type, etc., depending on the underlying library)
 * toastManager.show({ content: 'Profile updated', duration: 3000 });
 * ```
 */
export const toastManager = Toast.createToastManager();

/**
 * React hook to access the toast manager within components
 *
 * Returns the current toast manager methods bound to React lifecycle.
 * Prefer this inside React components for idiomatic usage, and use `toastManager`
 * for usage outside the React tree.
 *
 * @example
 * ```tsx
 * export function SaveButton() {
 *   const toast = useToast();
 *   const onClick = () => toast.show({ content: 'Saved!' });
 *   return <button onClick={onClick}>Save</button>;
 * }
 * ```
 */
export const useToast = Toast.useToastManager;
