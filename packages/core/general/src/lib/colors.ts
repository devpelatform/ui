/**
 * Theme configuration for the application
 * Handles light, dark, and system theme modes with their respective colors
 */

/**
 * Available theme modes in the application
 * - light: Force light theme
 * - dark: Force dark theme
 * - system: Follow system/OS preference (auto-detect)
 */
export const THEME_MODES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const;

/**
 * Type definition for theme modes
 */
export type ThemeMode = (typeof THEME_MODES)[keyof typeof THEME_MODES];

/**
 * Meta theme colors for different theme modes
 * Used for:
 * - HTML meta theme-color tags
 * - Browser address bar coloring
 * - PWA theme colors
 * - System theme integration
 */
export const META_THEME_COLORS = {
  /** Light theme color - Pure white for clean, bright appearance */
  [THEME_MODES.LIGHT]: "#ffffff",
  /** Dark theme color - Near black with slight warmth to reduce eye strain */
  [THEME_MODES.DARK]: "#09090b",
  /** System theme - Will be determined by user's OS preference */
  [THEME_MODES.SYSTEM]: "auto", // Special value indicating system preference
} as const;

/**
 * Default theme mode when no preference is set
 * Falls back to system preference to respect user's OS settings
 */
export const DEFAULT_THEME_MODE: ThemeMode = THEME_MODES.SYSTEM;
