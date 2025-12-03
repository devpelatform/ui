/**
 * Coming Soon Component
 * Displays a full-height section with an animated hover background and
 * optional title and description. Ideal for placeholder pages or upcoming
 * feature announcements.
 */

"use client";

import { HoverBackground } from "@pelatform/ui.animation";
import { cn } from "@pelatform/ui.general";

/**
 * Props interface for the `ComingSoon` component
 */
export interface ComingSoonProps {
  /** Additional CSS classes for the wrapper */
  className?: string;
  /** Optional highlighted title text */
  title?: string;
  /** Optional descriptive text below the title */
  description?: string;
}

/**
 * ComingSoon Component
 *
 * Renders a full-height container with animated hover background objects
 * and optional title/description content centered on the screen.
 *
 * @param props - Component props
 * @returns JSX element containing the coming soon layout
 *
 * @example
 * ```tsx
 * <ComingSoon title="Coming Soon" description="We are cooking something nice." />
 * ```
 */
export function ComingSoon({ className, title, description }: ComingSoonProps) {
  return (
    <div className={cn("h-[calc(100vh-54px)] w-full overflow-hidden", className)}>
      <HoverBackground
        colors={{
          background: "bg-gradient-to-br from-black via-gray-900 to-zinc-900",
          objects: [
            "bg-emerald-500/30",
            "bg-teal-500/30",
            "bg-green-500/30",
            "bg-lime-500/30",
            "bg-cyan-500/30",
            "bg-blue-500/30",
          ],
          glow: "shadow-emerald-400/70",
        }}
        objectCount={8}
      >
        <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
          {title && <h2 className="font-bold text-4xl text-white/90">{title}</h2>}
          {description && <p className="max-w-md text-emerald-100/80 text-lg">{description}</p>}
        </div>
      </HoverBackground>
    </div>
  );
}
