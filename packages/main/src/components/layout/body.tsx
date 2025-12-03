/**
 * Body Component
 * Provides a customizable body element with dynamic class names based on slug
 * Useful for applying different styles or themes based on page context
 */

"use client";

import type { BaseComponentProps } from "@pelatform/ui.general";
import { cn } from "@pelatform/ui.general";

function useMode(slug: string): string | undefined {
  return Array.isArray(slug) && slug.length > 0 ? slug[0] : undefined;
}

/**
 * Body Component
 *
 * A wrapper component for the HTML body element that applies dynamic
 * class names based on the provided slug. Useful for implementing
 * theme switching, page-specific styling, or mode-based layouts.
 *
 * @param props - Component props
 * @param props.children - Content to render inside the body
 * @param props.slug - Slug used to determine additional class names
 * @param props.className - Additional CSS classes to merge
 * @returns JSX body element with combined class names
 *
 * @example
 * ```tsx
 * // Basic usage with theme slug
 * <Body slug={['dark', 'compact']} className="font-sans">
 *   <div>Page content</div>
 * </Body>
 *
 * // With single slug
 * <Body slug="admin" className="bg-gray-100">
 *   <AdminPanel />
 * </Body>
 *
 * // Dynamic theme switching
 * function App() {
 *   const [theme, setTheme] = useState(['light']);
 *
 *   return (
 *     <Body slug={theme} className="transition-colors">
 *       <ThemeToggle onThemeChange={setTheme} />
 *       <MainContent />
 *     </Body>
 *   );
 * }
 * ```
 */
export function Body({ slug, children, className }: BaseComponentProps & { slug: string }) {
  const mode = useMode(slug);

  return <body className={cn(mode, className)}>{children}</body>;
}
