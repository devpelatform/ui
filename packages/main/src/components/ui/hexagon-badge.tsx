/**
 * HexagonBadge Component
 * A decorative hexagon-shaped badge container with SVG borders
 * Perfect for displaying icons, avatars, or small content in a distinctive geometric shape
 */

"use client";

import type { ReactNode } from "react";

import { cn } from "@pelatform/utils";

/**
 * Props interface for HexagonBadge component
 */
interface HexagonBadgeProps {
  /** Content to be displayed inside the hexagon badge */
  children?: ReactNode;
  /** Custom class names for different parts of the component */
  classNames?: {
    /** Class name for the base container element */
    base?: string;
    /** Class name for the SVG hexagon shape */
    svg?: string;
    /** Class name for the content wrapper (note: typo 'wraper' kept for backward compatibility) */
    wraper?: string;
  };
}

/**
 * HexagonBadge component
 *
 * Creates a hexagon-shaped badge container using SVG for the border shape.
 * The hexagon provides a distinctive visual element for displaying icons,
 * status indicators, or small pieces of content.
 *
 * Features:
 * - SVG-based hexagon shape with fill and stroke
 * - Perfectly centered content using absolute positioning
 * - Customizable styling via classNames prop
 * - RTL (right-to-left) layout support
 * - Responsive sizing based on container
 *
 * The component uses a 44x48 viewBox for the SVG hexagon and automatically
 * centers the content within the hexagonal boundary.
 *
 * @param props - Component props
 * @param props.children - Content to display inside the hexagon (icons, text, etc.)
 * @param props.classNames - Object containing custom class names for styling
 * @param props.classNames.base - Classes for the outer container
 * @param props.classNames.svg - Classes for the SVG hexagon element
 * @param props.classNames.wraper - Classes for the content wrapper element
 * @returns JSX element representing the hexagon badge
 *
 * @example
 * ```tsx
 * // Basic usage with an icon
 * import { StarIcon } from '@pelatform/ui.general';
 *
 * <HexagonBadge>
 *   <StarIcon className="w-6 h-6" />
 * </HexagonBadge>
 *
 * // With custom styling
 * <HexagonBadge
 *   classNames={{
 *     base: 'w-16 h-16',
 *     svg: 'text-primary fill-primary/10',
 *     wraper: 'text-white'
 *   }}
 * >
 *   <span className="font-bold">A</span>
 * </HexagonBadge>
 *
 * // As a status badge
 * <HexagonBadge
 *   classNames={{
 *     svg: 'text-green-500 fill-green-50'
 *   }}
 * >
 *   <CheckIcon />
 * </HexagonBadge>
 * ```
 */
export const HexagonBadge = ({ children, classNames }: HexagonBadgeProps) => {
  return (
    <div className={cn("relative shrink-0", classNames?.base)}>
      <svg
        className={cn("h-full w-full", classNames?.svg)}
        width="44"
        height="48"
        viewBox="0 0 44 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 2.4641C19.7128 0.320509 24.2872 0.320508 28 2.4641L37.6506 8.0359C41.3634 10.1795 43.6506 14.141 43.6506 
            18.4282V29.5718C43.6506 33.859 41.3634 37.8205 37.6506 39.9641L28 45.5359C24.2872 47.6795 19.7128 47.6795 16 45.5359L6.34937 
            39.9641C2.63655 37.8205 0.349365 33.859 0.349365 29.5718V18.4282C0.349365 14.141 2.63655 10.1795 6.34937 8.0359L16 2.4641Z"
          fill=""
        />
        <path
          d="M16.25 2.89711C19.8081 0.842838 24.1919 0.842837 27.75 2.89711L37.4006 8.46891C40.9587 10.5232 43.1506 14.3196 43.1506 
            18.4282V29.5718C43.1506 33.6804 40.9587 37.4768 37.4006 39.5311L27.75 45.1029C24.1919 47.1572 19.8081 47.1572 16.25 45.1029L6.59937 
            39.5311C3.04125 37.4768 0.849365 33.6803 0.849365 29.5718V18.4282C0.849365 14.3196 3.04125 10.5232 6.59937 8.46891L16.25 2.89711Z"
          stroke=""
        />
      </svg>
      <div
        className={cn(
          "-translate-y-2/4 -translate-x-2/4 absolute start-2/4 top-2/4 leading-none rtl:translate-x-2/4",
          classNames?.wraper,
        )}
      >
        {children}
      </div>
    </div>
  );
};
