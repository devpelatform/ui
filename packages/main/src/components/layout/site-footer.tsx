/**
 * Site Footer Component
 * Provides a consistent footer layout with responsive design
 * and flexible content arrangement for site-wide footer elements
 */

"use client";

import type { BaseComponentProps } from "@pelatform/ui.general";
import { cn } from "@pelatform/utils";

/**
 * SiteFooter Component
 *
 * A responsive footer component that provides consistent styling
 * and layout for site-wide footer content. Features a top border,
 * responsive padding, and flexible content arrangement.
 *
 * Features:
 * - Responsive design (stacked on mobile, horizontal on desktop)
 * - Consistent container width and padding
 * - Top border for visual separation
 * - Flexible content arrangement
 * - Semantic footer element
 *
 * @param props - Component props
 * @returns JSX element containing the site footer
 *
 * @example
 * ```tsx
 * // Basic usage with copyright and links
 * <SiteFooter>
 *   <div className="flex flex-col items-center gap-4 md:flex-row">
 *     <p className="text-sm text-muted-foreground">
 *       © 2024 Your Company. All rights reserved.
 *     </p>
 *     <nav className="flex gap-4">
 *       <Link href="/privacy" className="text-sm hover:underline">
 *         Privacy Policy
 *       </Link>
 *       <Link href="/terms" className="text-sm hover:underline">
 *         Terms of Service
 *       </Link>
 *     </nav>
 *   </div>
 * </SiteFooter>
 *
 * // With social links and newsletter
 * <SiteFooter>
 *   <div className="text-sm text-muted-foreground">
 *     © 2024 Your Company
 *   </div>
 *   <div className="flex items-center gap-4">
 *     <SocialLinks />
 *     <NewsletterSignup />
 *   </div>
 * </SiteFooter>
 *
 * // Custom styling
 * <SiteFooter className="bg-gray-50 dark:bg-gray-900">
 *   <FooterContent />
 * </SiteFooter>
 * ```
 */
export function SiteFooter({ children, className }: BaseComponentProps) {
  return (
    <footer className={cn("border-border border-t py-5 md:py-0", className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-4 md:h-16 md:flex-row">
        {children}
      </div>
    </footer>
  );
}
