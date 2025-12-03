/**
 * Wrapper Component
 * Provides a styled container with gradient background and border for MDX content
 * Perfect for highlighting special content sections or callouts
 */

"use client";

import type { BaseComponentProps } from "@pelatform/ui.general";
import { cn } from "@pelatform/ui.general";

/**
 * Wrapper Component
 *
 * A decorative container component with gradient background and border styling.
 * Features a radial gradient from blue with transparency and responsive design.
 * Ideal for highlighting important content, callouts, or special sections in MDX.
 *
 * @param props - Component props
 * @param props.children - Content to render inside the wrapper
 * @param props.className - Additional CSS classes to merge
 * @returns JSX element with styled wrapper container
 *
 * @example
 * ```tsx
 * // Basic content wrapper
 * <Wrapper>
 *   <h3>Important Notice</h3>
 *   <p>This is highlighted content that stands out from the rest.</p>
 * </Wrapper>
 *
 * // Custom styling
 * <Wrapper className="my-8 text-center">
 *   <blockquote>
 *     "This is a featured quote or testimonial."
 *   </blockquote>
 * </Wrapper>
 *
 * // Code example highlight
 * <Wrapper>
 *   <h4>Pro Tip</h4>
 *   <p>Use this pattern for better performance:</p>
 *   <code>const memoizedValue = useMemo(() => expensiveCalculation(), [deps]);</code>
 * </Wrapper>
 *
 * // In MDX content for callouts
 * <Wrapper>
 *   **Warning:** This feature is experimental and may change in future versions.
 * </Wrapper>
 *
 * // Multiple wrappers for different content types
 * <div className="space-y-6">
 *   <Wrapper>
 *     <h3>Feature Highlight</h3>
 *     <p>New functionality description</p>
 *   </Wrapper>
 *   <Wrapper className="border-green-200 bg-green-50">
 *     <h3>Success Story</h3>
 *     <p>Customer testimonial</p>
 *   </Wrapper>
 * </div>
 * ```
 */
export function Wrapper({ children, className }: BaseComponentProps) {
  return (
    <div
      className={cn(
        "prose-no-margin rounded-lg border border-fd-primary/10 bg-radial-[at_bottom] from-blue-500/20 bg-origin-border p-4 dark:bg-black/20",
        className,
      )}
    >
      {children}
    </div>
  );
}
