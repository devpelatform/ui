/**
 * Theme provider for application-wide theme management
 * Integrates next-themes with custom theme configuration and tooltip provider
 * Supports light, dark, and system theme modes with smooth transitions
 */

"use client";

import type * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { TooltipProvider } from "@pelatform/ui.default";
import { DEFAULT_THEME_MODE, THEME_MODES } from "@pelatform/ui.general";

/**
 * Props interface for ThemeProvider component
 * Extends NextThemesProvider props for full compatibility
 */
interface ThemeProviderProps extends React.ComponentProps<typeof NextThemesProvider> {
  /** Child components that will have access to theme context */
  children: React.ReactNode;
}

/**
 * Application theme provider component
 *
 * This provider sets up theme management with:
 * - Light, dark, and system theme support
 * - Automatic system preference detection
 * - Smooth theme transitions
 * - Integration with tooltip provider
 * - CSS class-based theme switching
 *
 * The provider integrates with the application's theme configuration
 * and provides a consistent theming experience across all components.
 *
 * @param props - Component props extending NextThemesProvider props
 * @returns JSX element wrapping children with theme and tooltip context
 *
 * @example
 * ```tsx
 * // Basic usage - wrap your app root
 * function App() {
 *   return (
 *     <ThemeProvider>
 *       <YourAppComponents />
 *     </ThemeProvider>
 *   );
 * }
 *
 * // With custom configuration
 * function App() {
 *   return (
 *     <ThemeProvider
 *       defaultTheme="dark"
 *       storageKey="custom-theme"
 *     >
 *       <YourAppComponents />
 *     </ThemeProvider>
 *   );
 * }
 *
 * // Use theme in child components
 * function ThemeToggle() {
 *   const { theme, setTheme } = useTheme();
 *
 *   return (
 *     <select value={theme} onChange={(e) => setTheme(e.target.value)}>
 *       <option value="light">Light</option>
 *       <option value="dark">Dark</option>
 *       <option value="system">System</option>
 *     </select>
 *   );
 * }
 * ```
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      // Use data attribute for theme targeting
      attribute="class"
      // Default to system theme (respects user's OS preference)
      defaultTheme={DEFAULT_THEME_MODE}
      // Enable system theme detection
      enableSystem
      // Disable transitions during theme change to prevent flash
      disableTransitionOnChange
      // Enable color scheme meta tag updates
      enableColorScheme
      // Storage key for persisting theme preference
      storageKey="theme"
      // Available theme options
      themes={[THEME_MODES.LIGHT, THEME_MODES.DARK, THEME_MODES.SYSTEM]}
      // Allow custom props to override defaults
      {...props}
    >
      {/*
        TooltipProvider with optimized delay for better UX
        Provides tooltip context for all child components
      */}
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
    </NextThemesProvider>
  );
}
