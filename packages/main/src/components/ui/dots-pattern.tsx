/**
 * DotsPattern Component
 * Creates a customizable dots pattern background using SVG
 * Perfect for adding subtle texture and visual interest to backgrounds
 */

"use client";

import { useId } from "react";

import { cn } from "@pelatform/utils";

/**
 * DotsPattern Component
 *
 * Generates an SVG-based dots pattern that can be used as a background element.
 * Features customizable dot size, spacing, and positioning with automatic
 * pattern generation using unique IDs.
 *
 * @param props - Component props
 * @param props.dotSize - Size of each dot in pixels (default: 2)
 * @param props.gapSize - Space between dots in pixels (default: 10)
 * @param props.patternOffset - X and Y offset for pattern positioning (default: [0, 0])
 * @param props.className - Additional CSS classes
 * @returns JSX element with SVG dots pattern
 *
 * @example
 * ```tsx
 * // Basic dots pattern
 * <div className="relative h-64 bg-gray-50">
 *   <DotsPattern />
 *   <div className="relative z-10 p-4">
 *     Content over dots pattern
 *   </div>
 * </div>
 *
 * // Customized dots pattern
 * <DotsPattern
 *   dotSize={3}
 *   gapSize={15}
 *   className="text-blue-500/20"
 * />
 *
 * // Offset pattern
 * <DotsPattern
 *   patternOffset={[5, 5]}
 *   dotSize={1}
 *   gapSize={8}
 * />
 *
 * // Hero section with dots background
 * <section className="relative min-h-screen bg-white">
 *   <DotsPattern
 *     dotSize={2}
 *     gapSize={12}
 *     className="text-gray-300"
 *   />
 *   <div className="relative z-10 flex items-center justify-center min-h-screen">
 *     <h1>Hero Content</h1>
 *   </div>
 * </section>
 *
 * // Card with dots pattern
 * <div className="relative p-6 bg-white rounded-lg shadow-lg overflow-hidden">
 *   <DotsPattern
 *     dotSize={1}
 *     gapSize={6}
 *     className="text-gray-100"
 *   />
 *   <div className="relative z-10">
 *     <h3>Card Title</h3>
 *     <p>Card content...</p>
 *   </div>
 * </div>
 * ```
 */
export function DotsPattern({
  dotSize = 2,
  gapSize = 10,
  patternOffset = [0, 0],
  className,
}: {
  dotSize?: number;
  gapSize?: number;
  patternOffset?: [number, number];
  className?: string;
}) {
  const id = useId();

  return (
    <svg
      className={cn("pointer-events-none absolute inset-0 text-foreground/10", className)}
      width="100%"
      height="100%"
    >
      <defs>
        <pattern
          id={`dots-${id}`}
          x={patternOffset[0] - 1}
          y={patternOffset[1] - 1}
          width={dotSize + gapSize}
          height={dotSize + gapSize}
          patternUnits="userSpaceOnUse"
        >
          <rect x={1} y={1} width={dotSize} height={dotSize} fill="currentColor" />
        </pattern>
      </defs>
      <rect fill={`url(#dots-${id})`} width="100%" height="100%" />
    </svg>
  );
}
