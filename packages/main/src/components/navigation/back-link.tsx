/**
 * BackLink Component
 * Provides a styled back navigation link with chevron icon and hover animations
 * Perfect for breadcrumb navigation and page hierarchy
 */

"use client";

import { ChevronLeftIcon } from "lucide-react";

import { Button } from "@pelatform/ui.default";
import type { BaseComponentProps } from "@pelatform/ui.general";
import { cn } from "@pelatform/utils";
import { DefaultLink, type SharedLink } from "../utils/shared";

/**
 * Props interface for the BackLink component
 */
interface BackLinkProps extends SharedLink, BaseComponentProps {
  /** URL to navigate back to */
  href: string;
}

/**
 * BackLink Component
 *
 * A navigation component that provides a styled back link with a chevron icon
 * and smooth hover animations. Features a secondary button with icon and
 * customizable link component support.
 *
 * @param props - Component props
 * @param props.Link - Custom link component (defaults to DefaultLink)
 * @param props.children - Text content for the back link
 * @param props.href - Destination URL for the back navigation
 * @param props.className - Additional CSS classes
 * @returns JSX element with back navigation link
 *
 * @example
 * ```tsx
 * // Basic back link
 * <BackLink href="/dashboard">
 *   Back to Dashboard
 * </BackLink>
 *
 * // With custom Link component (Next.js)
 * <BackLink Link={NextLink} href="/products">
 *   Back to Products
 * </BackLink>
 *
 * // Custom styling
 * <BackLink
 *   href="/settings"
 *   className="text-blue-600 hover:text-blue-800"
 * >
 *   Back to Settings
 * </BackLink>
 *
 * // In breadcrumb navigation
 * <nav className="flex items-center space-x-2">
 *   <BackLink href="/docs">
 *     Documentation
 *   </BackLink>
 *   <span>/</span>
 *   <span>Current Page</span>
 * </nav>
 *
 * // Dynamic back navigation
 * function ProductDetail({ productId }: { productId: string }) {
 *   return (
 *     <div>
 *       <BackLink href={`/category/${categoryId}`}>
 *         Back to Category
 *       </BackLink>
 *       <h1>Product Details</h1>
 *     </div>
 *   );
 * }
 * ```
 */
export function BackLink({ Link = DefaultLink, children, href, className }: BackLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-2 text-foreground transition-colors duration-100 hover:text-foreground/75",
        className,
      )}
    >
      <Button
        variant="secondary"
        mode="icon"
        className="group-hover:-translate-x-0.5 size-7.5! transition-transform duration-100"
      >
        <ChevronLeftIcon />
      </Button>
      <span className="font-semibold text-lg">{children}</span>
    </Link>
  );
}
