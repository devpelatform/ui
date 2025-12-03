/**
 * Meta theme color management hook for React components
 * Automatically manages HTML meta theme-color tag based on current theme
 * Integrates with next-themes for seamless theme switching
 */

"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { META_THEME_COLORS, THEME_MODES } from "@pelatform/ui.general";

/**
 * Hook for managing HTML meta theme-color tag based on current theme
 *
 * This hook automatically calculates the appropriate meta theme color
 * based on the current theme (light/dark) and provides utilities for
 * manual meta color manipulation.
 *
 * Features:
 * - Automatic theme color calculation based on resolved theme
 * - Support for custom color configurations
 * - Manual meta color setting capability
 * - Integration with next-themes
 *
 * @param defaultColors - Optional custom color configuration (defaults to META_THEME_COLORS)
 * @returns Object containing current meta color and setter function
 *
 * @example
 * ```tsx
 * // Basic usage with default colors (supports light, dark, and system)
 * function App() {
 *   const { metaColor, setMetaColor } = useMetaColor();
 *
 *   // metaColor automatically updates based on theme (light/dark/system)
 *   useEffect(() => {
 *     console.log('Current meta color:', metaColor);
 *   }, [metaColor]);
 *
 *   return <div>App content</div>;
 * }
 *
 * // Custom colors with system theme support
 * function CustomThemeApp() {
 *   const customColors = {
 *     light: '#f0f0f0',
 *     dark: '#1a1a1a',
 *     system: 'auto' // Will resolve to light or dark based on OS preference
 *   };
 *   const { metaColor } = useMetaColor(customColors);
 *
 *   return <div style={{ backgroundColor: metaColor }}>Custom themed app</div>;
 * }
 *
 * // Manual meta color override for special pages
 * function SpecialPage() {
 *   const { setMetaColor } = useMetaColor();
 *
 *   useEffect(() => {
 *     // Override meta color for this page
 *     setMetaColor('#ff0000');
 *
 *     // Cleanup: reset to theme color when leaving page
 *     return () => {
 *       setMetaColor(''); // This will revert to theme-based color
 *     };
 *   }, [setMetaColor]);
 *
 *   return <div>Special page with red theme color</div>;
 * }
 *
 * // Integration with theme switcher
 * function ThemeAwareComponent() {
 *   const { theme, setTheme } = useTheme();
 *   const { metaColor } = useMetaColor();
 *
 *   return (
 *     <div>
 *       <p>Current theme: {theme}</p>
 *       <p>Meta color: {metaColor}</p>
 *       <button onClick={() => setTheme('light')}>Light</button>
 *       <button onClick={() => setTheme('dark')}>Dark</button>
 *       <button onClick={() => setTheme('system')}>System</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useMetaColor(defaultColors?: typeof META_THEME_COLORS) {
  /** Get resolved theme from next-themes */
  const { resolvedTheme } = useTheme();

  /**
   * Helper function to detect system dark mode preference
   */
  const isSystemDarkMode = React.useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }, []);

  /**
   * Get effective theme mode (resolves 'system' to actual preference)
   */
  const getEffectiveTheme = React.useCallback(
    (theme: string | undefined) => {
      if (theme === THEME_MODES.SYSTEM) {
        return isSystemDarkMode() ? THEME_MODES.DARK : THEME_MODES.LIGHT;
      }
      return theme;
    },
    [isSystemDarkMode],
  );

  /**
   * Calculate appropriate meta color based on current theme
   * Handles light, dark, and system themes properly
   * Memoized to prevent unnecessary recalculations
   */
  const metaColor = React.useMemo(() => {
    const colorsToUse = defaultColors ?? META_THEME_COLORS;

    // Get the effective theme (resolves system to light/dark)
    const effectiveTheme = getEffectiveTheme(resolvedTheme);

    // Handle different theme modes
    if (effectiveTheme === THEME_MODES.DARK) {
      return colorsToUse[THEME_MODES.DARK];
    } else if (effectiveTheme === THEME_MODES.LIGHT) {
      return colorsToUse[THEME_MODES.LIGHT];
    }

    // Fallback to light theme if resolvedTheme is undefined (during hydration)
    return colorsToUse[THEME_MODES.LIGHT];
  }, [resolvedTheme, defaultColors, getEffectiveTheme]);

  /**
   * Manually set meta theme color in the document
   * Useful for temporary color overrides or custom scenarios
   *
   * @param color - Hex color string to set as meta theme color
   */
  const setMetaColor = React.useCallback((color: string) => {
    // Find and update the meta theme-color tag
    const metaTag = document.querySelector('meta[name="theme-color"]');
    if (metaTag) {
      metaTag.setAttribute("content", color);
    } else {
      // Create meta tag if it doesn't exist
      const newMetaTag = document.createElement("meta");
      newMetaTag.name = "theme-color";
      newMetaTag.content = color;
      document.head.appendChild(newMetaTag);
    }
  }, []);

  return {
    /** Current meta theme color based on resolved theme */
    metaColor,
    /** Function to manually set meta theme color */
    setMetaColor,
  };
}
