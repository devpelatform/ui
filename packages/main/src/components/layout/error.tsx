/**
 * Error Components
 * Provides a reusable error layout supporting multiple variants (404, 500, default, custom).
 * Renders themed illustrations from the assets CDN and displays optional
 * title, subtitle, and action button.
 */

"use client";

import type { ReactNode } from "react";

import { Badge } from "@pelatform/ui.default";
import { cn, getAssetsUrl } from "@pelatform/ui.general";

/**
 * Props interface for the `ErrorComponents` component
 */
export interface ErrorComponentsProps {
  /** Additional CSS classes for the container */
  className?: string;
  /** Error variant to display */
  type?: "default" | "404" | "500" | "custom";
  /** Optional title content */
  textTitle?: ReactNode;
  /** Optional subtitle content */
  textSubtitle?: ReactNode;
  /** Optional action button (e.g., retry) */
  button?: ReactNode;
}

/**
 * ErrorComponents Component
 *
 * A reusable error layout supporting multiple variants (404, 500, default, custom).
 * Displays illustrations and optional title, subtitle, and button.
 *
 * @param props - Component props
 * @returns JSX element containing the error layout
 *
 * @example
 * ```tsx
 * <ErrorComponents
 *   type="404"
 *   textTitle="Page not found"
 *   textSubtitle="The page you are looking for does not exist."
 * />
 * ```
 */
export function ErrorComponents({
  className,
  type = "default",
  textTitle,
  textSubtitle,
  button,
}: ErrorComponentsProps) {
  if (type === "404") {
    return (
      <div className={cn("flex h-[95%] grow flex-col items-center justify-center", className)}>
        <div className="mb-10">
          <img
            src={getAssetsUrl("media/illustrations/19.svg")}
            className="max-h-40 dark:hidden"
            alt="illustrations"
          />
          <img
            src={getAssetsUrl("media/illustrations/19-dark.svg")}
            className="hidden max-h-40 dark:block"
            alt="illustrations"
          />
        </div>

        <Badge variant="destructive" appearance="outline" className="mb-3">
          404 Error
        </Badge>

        <h3 className="mb-2 text-center font-semibold text-2xl text-foreground">{textTitle}</h3>

        <div className="mb-10 text-center text-base text-secondary-foreground">{textSubtitle}</div>
      </div>
    );
  }

  if (type === "500") {
    return (
      <div className={cn("flex h-[95%] grow flex-col items-center justify-center", className)}>
        <div className="mb-10">
          <img
            src={getAssetsUrl("media/illustrations/20.svg")}
            className="max-h-40 dark:hidden"
            alt="illustrations"
          />
          <img
            src={getAssetsUrl("media/illustrations/20-dark.svg")}
            className="hidden max-h-40 dark:block"
            alt="illustrations"
          />
        </div>

        <Badge variant="destructive" appearance="outline" className="mb-3">
          500 Error
        </Badge>

        <h3 className="mb-2 text-center font-semibold text-2xl text-foreground">{textTitle}</h3>

        <div className="mb-10 text-center text-base text-secondary-foreground">{textSubtitle}</div>

        {button}
      </div>
    );
  }

  return (
    <div className={cn("flex h-[95%] grow flex-col items-center justify-center", className)}>
      <div className="mb-10">
        <img
          src={getAssetsUrl("media/illustrations/29.svg")}
          className="max-h-40 dark:hidden"
          alt="illustrations"
        />
        <img
          src={getAssetsUrl("media/illustrations/29-dark.svg")}
          className="hidden max-h-40 dark:block"
          alt="illustrations"
        />
      </div>

      <h3 className="mb-2 text-center font-semibold text-2xl text-foreground">{textTitle}</h3>

      <div className="mb-10 text-center text-base text-secondary-foreground">{textSubtitle}</div>
    </div>
  );
}
