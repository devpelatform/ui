/**
 * ExtraLink Component for MDX Content
 * Provides a styled link component specifically designed for MDX content
 * with customizable Link implementation and consistent styling
 */

"use client";

import type { ComponentProps } from "react";

import type { LinkComponent } from "@pelatform/ui.general";
import { cn } from "@pelatform/ui.general";
import { DefaultLink, type SharedLink } from "../utils/shared";

/**
 * ExtraLink component for external and internal links in MDX content
 *
 * This component provides a consistent styled link experience across MDX documents
 * with support for custom Link implementations (e.g., Next.js Link, React Router Link)
 * and automatic styling with underline decoration.
 *
 * Features:
 * - Custom Link component support (defaults to standard anchor tag)
 * - Consistent underline styling with 4px offset
 * - Medium font weight for emphasis
 * - Customizable className for additional styling
 * - Full accessibility support via Link component
 *
 * @param props - Component props extending SharedLink and LinkComponent
 * @param props.Link - Custom Link component (defaults to DefaultLink/anchor)
 * @param props.href - Target URL for the link
 * @param props.target - Target attribute (_blank, _self, etc.)
 * @param props.className - Additional CSS classes to apply
 * @param props.children - Link text or child elements
 * @returns JSX element representing the styled link
 *
 * @example
 * ```tsx
 * // Basic usage in MDX
 * <ExtraLink href="https://example.com">
 *   Visit Example
 * </ExtraLink>
 *
 * // With custom Link component (Next.js)
 * import NextLink from 'next/link';
 *
 * <ExtraLink Link={NextLink} href="/about">
 *   About Us
 * </ExtraLink>
 *
 * // With target and custom styling
 * <ExtraLink
 *   href="https://external.com"
 *   target="_blank"
 *   className="text-primary hover:text-primary-dark"
 * >
 *   External Resource
 * </ExtraLink>
 * ```
 */
export function ExtraLink({
  Link = DefaultLink,
  href,
  target,
  className,
  children,
}: SharedLink & ComponentProps<LinkComponent>) {
  return (
    <Link
      href={href}
      target={target}
      className={cn("font-medium underline underline-offset-4", className)}
    >
      {children}
    </Link>
  );
}
