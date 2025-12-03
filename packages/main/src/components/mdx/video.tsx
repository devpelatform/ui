/**
 * Video Component
 * Provides a styled video player for MDX content with consistent styling
 * Features responsive design and automatic controls
 */

"use client";

import type { ComponentProps } from "react";

import { cn } from "@pelatform/ui.general";

/**
 * Video Component
 *
 * A styled video component that extends the native HTML video element
 * with consistent styling, responsive design, and automatic controls.
 * Perfect for embedding videos in MDX documentation or content.
 *
 * @param props - Standard HTML video element props
 * @param props.className - Additional CSS classes to merge
 * @returns JSX video element with enhanced styling
 *
 * @example
 * ```tsx
 * // Basic video with source
 * <Video src="/videos/demo.mp4" />
 *
 * // Video with multiple sources
 * <Video>
 *   <source src="/videos/demo.webm" type="video/webm" />
 *   <source src="/videos/demo.mp4" type="video/mp4" />
 *   Your browser does not support the video tag.
 * </Video>
 *
 * // Custom styling
 * <Video
 *   src="/videos/tutorial.mp4"
 *   className="max-w-md mx-auto"
 * />
 *
 * // With additional attributes
 * <Video
 *   src="/videos/background.mp4"
 *   autoPlay
 *   muted
 *   playsInline
 *   className="w-full h-64 object-cover"
 * />
 *
 * // In MDX content
 * Here's a demonstration of the feature:
 *
 * <Video src="/demos/feature-walkthrough.mp4" />
 * ```
 */
export function Video({ className, ...props }: ComponentProps<"video">) {
  return <video className={cn("w-full rounded-lg border", className)} controls loop {...props} />;
}
