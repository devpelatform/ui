/**
 * Moving Border Components
 * Provides animated border effects using Framer Motion for enhanced UI interactions
 * Creates smooth, continuous border animations that follow a path around elements
 */

"use client";

import type React from "react";
import { type ReactNode, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";

import { cn } from "@pelatform/ui.general";

/**
 * Props interface for MovingLabel component
 */
interface MovingLabelProps {
  /** Border radius for the component (CSS value) */
  borderRadius?: string;
  /** Child elements to render inside the label */
  children: ReactNode;
  /** HTML element type to render as (default: 'button') */
  as?: React.ElementType;
  /** Additional CSS classes for the container */
  containerClassName?: string;
  /** Additional CSS classes for the border element */
  borderClassName?: string;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Additional CSS classes for the content area */
  className?: string;
  /** Additional props to pass to the root element */
  [key: string]: unknown;
}

/**
 * MovingLabel Component
 *
 * A button or label component with an animated moving border effect.
 * The border continuously moves around the perimeter of the element,
 * creating an eye-catching visual effect perfect for CTAs or highlights.
 *
 * @param props - Component props
 * @returns JSX element with animated border
 *
 * @example
 * ```tsx
 * // Basic button with moving border
 * <MovingLabel>
 *   Click me!
 * </MovingLabel>
 *
 * // Custom styling and duration
 * <MovingLabel
 *   borderRadius="0.5rem"
 *   duration={3000}
 *   className="px-6 py-3 text-lg"
 *   borderClassName="bg-gradient-to-r from-blue-500 to-purple-500"
 * >
 *   Premium Feature
 * </MovingLabel>
 *
 * // As a div instead of button
 * <MovingLabel
 *   as="div"
 *   containerClassName="w-64 h-32"
 *   className="flex items-center justify-center"
 * >
 *   <span>Animated Card</span>
 * </MovingLabel>
 *
 * // Custom border effect
 * <MovingLabel
 *   borderClassName="h-8 w-16 bg-[radial-gradient(#ff6b6b_20%,transparent_70%)]"
 *   duration={1500}
 * >
 *   Fast Animation
 * </MovingLabel>
 * ```
 */
export function MovingLabel({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: MovingLabelProps) {
  return (
    <Component
      className={cn("relative h-9 overflow-hidden bg-transparent p-px text-xl", containerClassName)}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div className="absolute inset-0" style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}>
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-12 w-20 bg-[radial-gradient(#24B47E_15%,transparent_60%)] opacity-[0.6]",
              borderClassName,
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border border-slate-800 bg-slate-900/50 text-sm text-white antialiased backdrop-blur-xl",
          className,
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 1)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

/**
 * Props interface for MovingBorder component
 */
interface MovingBorderProps {
  /** Child elements to animate along the border path */
  children: ReactNode;
  /** Animation duration in milliseconds (default: 2000) */
  duration?: number;
  /** Horizontal border radius for the SVG path */
  rx?: string;
  /** Vertical border radius for the SVG path */
  ry?: string;
  /** Additional props to pass to the SVG element */
  [key: string]: unknown;
}

/**
 * MovingBorder Component
 *
 * Creates an animated border effect where child elements move along
 * the perimeter of a rectangular path. Uses SVG path calculations
 * and Framer Motion for smooth animations.
 *
 * This is typically used as a building block for other components
 * like MovingLabel, but can be used standalone for custom effects.
 *
 * @param props - Component props
 * @returns JSX element with SVG path and animated child
 *
 * @example
 * ```tsx
 * // Basic usage with a glowing dot
 * <div className="relative w-64 h-32 border border-gray-300">
 *   <MovingBorder duration={3000} rx="10%" ry="10%">
 *     <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg" />
 *   </MovingBorder>
 * </div>
 *
 * // Multiple animated elements
 * <div className="relative w-48 h-48 rounded-lg border">
 *   <MovingBorder duration={2000}>
 *     <div className="w-3 h-3 bg-red-500 rounded-full" />
 *   </MovingBorder>
 *   <MovingBorder duration={3000}>
 *     <div className="w-2 h-2 bg-green-500 rounded-full" />
 *   </MovingBorder>
 * </div>
 *
 * // Custom SVG styling
 * <MovingBorder
 *   duration={1500}
 *   rx="20%"
 *   ry="20%"
 *   stroke="blue"
 *   strokeWidth="2"
 * >
 *   <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded" />
 * </MovingBorder>
 * ```
 */
export const MovingBorder = ({
  children,
  duration = 2000,
  rx,
  ry,
  ...otherProps
}: MovingBorderProps) => {
  const pathRef = useRef<SVGRectElement | null>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).x);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).y);

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
