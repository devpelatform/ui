/**
 * Grid Component
 * Renders an SVG grid pattern overlay for background decoration
 * Useful for creating grid-based layouts or visual guides
 */

"use client";

import { useId } from "react";

import { cn } from "@pelatform/ui.general";

/**
 * Grid Component
 *
 * Renders an SVG-based grid pattern that can be used as a background
 * overlay. The grid is responsive and fills its container while
 * maintaining consistent cell sizes and stroke widths.
 *
 * @param props - Component props
 * @param props.cellSize - Size of each grid cell (default: 12px)
 * @param props.strokeWidth - Width of grid lines (default: 1px)
 * @param props.patternOffset - Grid offset position (default: [0, 0])
 * @param props.className - Additional CSS classes
 * @returns JSX SVG element with grid pattern
 *
 * @example
 * ```tsx
 * // Basic grid overlay
 * <div className="relative">
 *   <Grid />
 *   <div>Content over grid</div>
 * </div>
 *
 * // Custom grid with larger cells
 * <Grid
 *   cellSize={24}
 *   strokeWidth={2}
 *   className="text-blue-500/20"
 * />
 *
 * // Offset grid pattern
 * <Grid
 *   cellSize={16}
 *   patternOffset={[8, 8]}
 *   className="text-gray-300/30"
 * />
 *
 * // Fine grid for detailed layouts
 * <Grid
 *   cellSize={8}
 *   strokeWidth={0.5}
 *   className="text-slate-400/15"
 * />
 * ```
 */
export function Grid({
  cellSize = 12,
  strokeWidth = 1,
  patternOffset = [0, 0],
  className,
}: {
  /** Size of each grid cell in pixels */
  cellSize?: number;
  /** Width of the grid lines in pixels */
  strokeWidth?: number;
  /** Offset position for the grid pattern [x, y] */
  patternOffset?: [number, number];
  /** Additional CSS classes to apply to the grid */
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
          id={`grid-${id}`}
          x={patternOffset[0] - 1}
          y={patternOffset[1] - 1}
          width={cellSize}
          height={cellSize}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />
        </pattern>
      </defs>
      <rect fill={`url(#grid-${id})`} width="100%" height="100%" />
    </svg>
  );
}
