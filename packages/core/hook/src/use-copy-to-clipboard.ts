/**
 * Clipboard copy functionality hook for React components
 * Provides a simple interface for copying text to clipboard with feedback
 * Includes automatic state management and timeout handling
 */

"use client";

import * as React from "react";

/**
 * Configuration options for the copy to clipboard hook
 */
interface UseCopyToClipboardOptions {
  /** Duration in milliseconds to show the copied state (default: 2000ms) */
  timeout?: number;
  /** Callback function executed after successful copy operation */
  onCopy?: () => void;
}

/**
 * Hook for copying text to clipboard with automatic state management
 *
 * Features:
 * - Automatic copied state management with timeout
 * - Browser compatibility checks
 * - Error handling for failed copy operations
 * - Optional callback for successful copies
 *
 * @param options - Configuration options for the hook
 * @returns Object containing copied state and copy function
 *
 * @example
 * ```tsx
 * const { copied, copy } = useCopyToClipboard({
 *   timeout: 3000,
 *   onCopy: () => toast.success('Copied to clipboard!')
 * });
 *
 * return (
 *   <button onClick={() => copy('Hello World')}>
 *     {copied ? 'Copied!' : 'Copy Text'}
 *   </button>
 * );
 * ```
 */
export function useCopyToClipboard({ timeout = 2000, onCopy }: UseCopyToClipboardOptions = {}) {
  /** State to track whether text was recently copied */
  const [copied, setCopied] = React.useState(false);

  /**
   * Copy text to clipboard
   *
   * @param value - The text string to copy to clipboard
   */
  const copy = React.useCallback(
    (value: string) => {
      // Check for browser support and environment
      if (typeof window === "undefined" || !navigator.clipboard?.writeText) {
        console.warn("Clipboard API not supported in this environment");
        return;
      }

      // Validate input
      if (!value) {
        console.warn("Cannot copy empty value to clipboard");
        return;
      }

      // Perform clipboard write operation
      navigator.clipboard.writeText(value).then(
        () => {
          // Set copied state to true
          setCopied(true);

          // Execute callback if provided
          if (onCopy) {
            onCopy();
          }

          // Reset copied state after timeout
          setTimeout(() => {
            setCopied(false);
          }, timeout);
        },
        (error) => {
          console.error("Failed to copy text to clipboard:", error);
        },
      );
    },
    [timeout, onCopy],
  );

  return {
    /** Whether text was recently copied (true for timeout duration) */
    copied,
    /** Function to copy text to clipboard */
    copy,
  };
}
