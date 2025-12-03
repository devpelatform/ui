/**
 * Background Paths Components
 * Provides animated SVG path backgrounds with motion effects
 * Perfect for creating dynamic visual backgrounds and decorative elements
 */

"use client";

import { motion } from "motion/react";

import { cn } from "@pelatform/ui.general";

/**
 * FloatingPaths Component
 *
 * Creates animated floating SVG paths with customizable position and color.
 * Features smooth animations with varying opacity and path lengths for
 * a dynamic background effect.
 *
 * @param props - Component props
 * @param props.position - Position multiplier for path positioning (affects curve placement)
 * @param props.color - CSS color class for the paths (default: 'text-slate-950 dark:text-white')
 * @returns JSX element with animated SVG paths
 *
 * @example
 * ```tsx
 * // Basic floating paths
 * <FloatingPaths position={1} />
 *
 * // Custom colored paths
 * <FloatingPaths
 *   position={2}
 *   color="text-blue-500 dark:text-blue-300"
 * />
 *
 * // Multiple layers with different positions
 * <div className="relative">
 *   <FloatingPaths position={1} color="text-gray-300" />
 *   <FloatingPaths position={2} color="text-gray-400" />
 *   <FloatingPaths position={3} color="text-gray-500" />
 * </div>
 *
 * // In a hero section
 * <section className="relative min-h-screen">
 *   <FloatingPaths position={1.5} />
 *   <div className="relative z-10">
 *     <h1>Your Content Here</h1>
 *   </div>
 * </section>
 * ```
 */
export function FloatingPaths({
  position,
  color = "text-slate-950 dark:text-white",
}: {
  position: number;
  color?: string;
}) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="-z-50 pointer-events-none absolute inset-0">
      <svg className={cn("h-full w-full", color)} viewBox="0 0 696 316" fill="none">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

/**
 * BackgroundPaths Component
 *
 * A simplified wrapper around FloatingPaths with a fixed position,
 * providing an easy way to add animated background paths to any container.
 *
 * @param props - Component props
 * @param props.color - CSS color class for the paths (default: 'text-slate-950 dark:text-white')
 * @returns JSX element with animated background paths
 *
 * @example
 * ```tsx
 * // Basic background paths
 * <div className="relative">
 *   <BackgroundPaths />
 *   <div className="relative z-10">
 *     Your content here
 *   </div>
 * </div>
 *
 * // Custom colored background
 * <BackgroundPaths color="text-purple-500 dark:text-purple-300" />
 *
 * // In a card component
 * <div className="relative p-6 bg-white rounded-lg shadow-lg">
 *   <BackgroundPaths color="text-gray-100" />
 *   <div className="relative z-10">
 *     <h2>Card Title</h2>
 *     <p>Card content...</p>
 *   </div>
 * </div>
 * ```
 */
export function BackgroundPaths({ color = "text-slate-950 dark:text-white" }: { color?: string }) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white dark:bg-neutral-950">
      <div className="absolute inset-0">
        <FloatingPaths position={1} color={color} />
        <FloatingPaths position={-1} color={color} />
      </div>
    </div>
  );
}
