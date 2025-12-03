/**
 * Announcement Components
 * Provides styled announcement badges with optional theming and tags
 * Perfect for displaying notifications, updates, and promotional content
 */

"use client";

import type { HTMLAttributes } from "react";

import { Badge, type badgeVariants } from "@pelatform/ui.default";
import type { VariantProps } from "@pelatform/ui.general";
import { cn } from "@pelatform/ui.general";

/**
 * Props interface for the Announcement component
 */
type AnnouncementProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants> & {
    /** Whether to apply themed styling with special background treatment */
    themed?: boolean;
  };

/**
 * Announcement Component
 *
 * A styled badge component for displaying announcements, notifications,
 * and promotional content. Features rounded design with hover effects
 * and optional themed styling.
 *
 * @param props - Component props
 * @param props.variant - Badge variant style (default: 'outline')
 * @param props.themed - Whether to apply themed styling
 * @param props.className - Additional CSS classes
 * @returns JSX element with announcement badge
 *
 * @example
 * ```tsx
 * // Basic announcement
 * <Announcement>
 *   New feature available!
 * </Announcement>
 *
 * // Themed announcement with tag
 * <Announcement themed variant="secondary">
 *   <AnnouncementTag>NEW</AnnouncementTag>
 *   <AnnouncementTitle>
 *     Product Update v2.0
 *   </AnnouncementTitle>
 * </Announcement>
 *
 * // Custom styled announcement
 * <Announcement
 *   variant="destructive"
 *   className="border-red-500"
 * >
 *   Important Notice
 * </Announcement>
 * ```
 */
export const Announcement = ({
  variant = "outline",
  themed = false,
  className,
  ...props
}: AnnouncementProps) => (
  <Badge
    variant={variant}
    className={cn(
      "group max-w-full gap-2 rounded-full bg-background px-3 py-0.5 font-medium shadow-sm transition-all",
      "hover:shadow-md",
      themed && "announcement-themed border-foreground/5",
      className,
    )}
    {...props}
  />
);

/**
 * Props interface for the AnnouncementTag component
 */
type AnnouncementTagProps = HTMLAttributes<HTMLDivElement>;

/**
 * AnnouncementTag Component
 *
 * A small tag component designed to be used within announcements
 * to highlight categories, status, or importance levels.
 *
 * @param props - Component props
 * @param props.className - Additional CSS classes
 * @returns JSX element with announcement tag
 *
 * @example
 * ```tsx
 * <Announcement>
 *   <AnnouncementTag>BETA</AnnouncementTag>
 *   <AnnouncementTitle>New Dashboard</AnnouncementTitle>
 * </Announcement>
 * ```
 */
export const AnnouncementTag = ({ className, ...props }: AnnouncementTagProps) => (
  <div
    className={cn(
      "-ml-2.5 shrink-0 truncate rounded-full bg-foreground/5 px-2.5 py-1 text-xs",
      "group-[.announcement-themed]:bg-background/60",
      className,
    )}
    {...props}
  />
);

/**
 * Props interface for the AnnouncementTitle component
 */
type AnnouncementTitleProps = HTMLAttributes<HTMLDivElement>;

/**
 * AnnouncementTitle Component
 *
 * A title component designed for use within announcements,
 * providing proper spacing and alignment for announcement content.
 *
 * @param props - Component props
 * @param props.className - Additional CSS classes
 * @returns JSX element with announcement title
 *
 * @example
 * ```tsx
 * <Announcement>
 *   <AnnouncementTag>UPDATE</AnnouncementTag>
 *   <AnnouncementTitle>
 *     System Maintenance Scheduled
 *   </AnnouncementTitle>
 * </Announcement>
 * ```
 */
export const AnnouncementTitle = ({ className, ...props }: AnnouncementTitleProps) => (
  <div className={cn("flex items-center gap-1 truncate py-1", className)} {...props} />
);
