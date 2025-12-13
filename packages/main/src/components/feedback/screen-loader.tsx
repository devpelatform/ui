/**
 * Screen Loader Component
 * Provides a full-screen loading overlay with spinner and customizable text
 * Perfect for page transitions, data loading, and async operations
 */

"use client";

import { LoaderIcon } from "lucide-react";

import { cn } from "@pelatform/utils";

/**
 * Props interface for the ScreenLoader component
 */
export interface ScreenLoaderProps {
  /** Loading text to display below the spinner */
  loadingText?: string;
  /** Additional CSS classes for the container */
  className?: string;
  /** Additional CSS classes for the spinner icon */
  spinnerClassName?: string;
  /** Additional CSS classes for the loading text */
  textClassName?: string;
  /** Display loader for content */
  contentLoader?: boolean;
}

/**
 * ScreenLoader Component
 *
 * A full-screen loading overlay that covers the entire viewport.
 * Features a spinning icon and customizable loading text with
 * smooth fade transitions. Positioned with high z-index to
 * appear above all other content.
 *
 * @param props - Component props
 * @returns JSX element containing the full-screen loader
 *
 * @example
 * ```tsx
 * // Basic usage
 * function App() {
 *   const [isLoading, setIsLoading] = useState(true);
 *
 *   useEffect(() => {
 *     // Simulate loading
 *     setTimeout(() => setIsLoading(false), 2000);
 *   }, []);
 *
 *   return (
 *     <div>
 *       {isLoading && <ScreenLoader />}
 *       <main>Your app content</main>
 *     </div>
 *   );
 * }
 *
 * // Custom loading text
 * <ScreenLoader loadingText="Preparing your dashboard..." />
 *
 * // Custom styling
 * <ScreenLoader
 *   loadingText="Please wait"
 *   className="bg-black/80 backdrop-blur-sm"
 *   spinnerClassName="size-8 animate-spin text-blue-500"
 *   textClassName="text-white text-lg font-semibold"
 * />
 *
 * // With conditional rendering
 * {isSubmitting && (
 *   <ScreenLoader
 *     loadingText="Submitting form..."
 *     className="bg-white/90"
 *   />
 * )}
 *
 * // Different spinner sizes
 * <ScreenLoader
 *   spinnerClassName="size-12 animate-spin text-purple-600"
 *   textClassName="text-purple-600 font-bold"
 * />
 * ```
 */
export function ScreenLoader({
  loadingText = "Loading...",
  className = "",
  spinnerClassName = "size-6 animate-spin",
  textClassName = "text-muted-foreground font-medium text-sm",
  contentLoader = false,
}: ScreenLoaderProps = {}) {
  if (contentLoader) {
    return (
      <div className={cn("flex w-full grow items-center justify-center", className)}>
        <div className="flex items-center gap-2.5">
          <LoaderIcon className={spinnerClassName} aria-hidden="true" />
          <span className={textClassName}>{loadingText}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-500 flex flex-col items-center justify-center gap-2 bg-background transition-opacity duration-700 ease-in-out",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-label={loadingText}
    >
      <LoaderIcon className={spinnerClassName} aria-hidden="true" />
      <div className={textClassName}>{loadingText}</div>
    </div>
  );
}
