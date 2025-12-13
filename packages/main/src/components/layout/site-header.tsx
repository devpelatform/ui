/**
 * Site Header Component
 * Provides a sticky header layout with backdrop blur and responsive design
 * Perfect for site navigation, branding, and header actions
 */

"use client";

import type { BaseComponentProps } from "@pelatform/ui.general";
import { cn } from "@pelatform/utils";

/**
 * SiteHeader Component
 *
 * A sticky header component with modern styling including backdrop blur,
 * semi-transparent background, and responsive design. Positioned at the
 * top of the viewport with high z-index for proper layering.
 *
 * Features:
 * - Sticky positioning at top of viewport
 * - Backdrop blur effect for modern appearance
 * - Semi-transparent background with fallback
 * - Bottom border for visual separation
 * - Responsive container with consistent spacing
 * - High z-index for proper layering
 * - Dark mode support
 *
 * @param props - Component props
 * @returns JSX element containing the site header
 *
 * @example
 * ```tsx
 * // Basic usage with logo and navigation
 * <SiteHeader>
 *   <div className="flex items-center gap-4">
 *     <Logo />
 *     <MainNav items={navItems} />
 *   </div>
 *   <div className="flex items-center gap-2">
 *     <ThemeToggle />
 *     <UserMenu />
 *   </div>
 * </SiteHeader>
 *
 * // With mobile navigation
 * <SiteHeader>
 *   <div className="flex items-center gap-4">
 *     <MobileNav>
 *       <MobileNavItems />
 *     </MobileNav>
 *     <Logo />
 *     <MainNav items={navItems} className="hidden md:flex" />
 *   </div>
 *   <HeaderActions />
 * </SiteHeader>
 *
 * // Custom styling
 * <SiteHeader className="bg-white/80 border-gray-200">
 *   <HeaderContent />
 * </SiteHeader>
 * ```
 */
export function SiteHeader({ className, children }: BaseComponentProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-border border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60",
        className,
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4">{children}</div>
    </header>
  );
}
