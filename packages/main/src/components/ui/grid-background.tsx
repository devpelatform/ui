/**
 * Grid Background Component
 * Creates a customizable grid background with vertical lines and dots pattern
 * Perfect for adding structured visual backgrounds to layouts and sections
 */

"use client";

import type { FC } from "react";

import { cn } from "@pelatform/utils";

/**
 * Props interface for the GridBackground component
 */
interface GridBackgroundProps {
  /** Number of grid columns to display (default: 4) */
  columns?: number;
  /** Additional CSS classes for styling */
  className?: string;
  /** CSS class for maximum width container (default: 'grid-container') */
  maxWidthClass?: string;
}

/**
 * GridBackground Component
 *
 * Creates a customizable grid background with vertical lines and dots pattern.
 * Features configurable column count and styling options for creating
 * structured visual backgrounds.
 *
 * @param props - Component props
 * @param props.columns - Number of grid columns to display
 * @param props.className - Additional CSS classes for styling
 * @param props.maxWidthClass - CSS class for maximum width container
 * @returns JSX element with grid background pattern
 *
 * @example
 * ```tsx
 * // Basic grid background
 * <div className="relative">
 *   <GridBackground />
 *   <div className="relative z-10">Content over grid</div>
 * </div>
 *
 * // Custom column count
 * <GridBackground columns={6} />
 *
 * // With custom styling
 * <GridBackground
 *   columns={3}
 *   className="opacity-50"
 *   maxWidthClass="max-w-6xl"
 * />
 * ```
 */
export const GridBackground: FC<GridBackgroundProps> = ({
  columns = 4,
  className = "",
  maxWidthClass = "grid-container",
}) => {
  // Create array based on column count
  const columnElements = Array.from({ length: columns }, (_, i) => (
    <div
      key={i}
      className="h-full w-px"
      style={{
        backgroundColor: i === 0 ? "var(--grid-base-color)" : "transparent",
        backgroundImage:
          i === 0 ? "none" : `linear-gradient(180deg, var(--grid-dots-color) 50%, transparent 50%)`,
        backgroundSize: i === 0 ? "auto" : "1px 8px",
      }}
    />
  ));

  return (
    <div className={cn("stripe-grid absolute inset-0 -z-50 h-full w-full", className)}>
      <div className="relative h-full w-full overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-0 h-full w-full" aria-hidden="true">
          <div
            className={cn("relative mx-auto grid h-full grid-cols-4 grid-rows-1", maxWidthClass)}
          >
            {columnElements}
            <div
              className="absolute top-0 right-0 h-full w-px"
              style={{ backgroundColor: "var(--grid-base-color)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
