/**
 * Theme Mode Switcher Component
 * Provides a button to cycle through light, dark, and system theme modes
 * Integrates with the application's color configuration and meta color management
 */

"use client";

import * as React from "react";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@pelatform/ui.default";
import { cn, THEME_MODES, type ThemeMode } from "@pelatform/ui.general";

/**
 * Props interface for the ModeSwitcher component
 */
export interface ModeSwitcherProps {
  /** Additional CSS classes for the button */
  className?: string;
  /** Button variant style */
  variant?: "ghost" | "outline" | "secondary";
  /** Button size */
  size?: "sm" | "md" | "lg";
  /** Custom cycle order for themes (defaults to system -> light -> dark) */
  cycleOrder?: ThemeMode[];
  /** Button type: 'toggle' for a single button or 'dropdown' and 'sub-dropdown' for a menu with options */
  type?: "toogle" | "dropdown" | "sub-dropdown";
  /** Labels for each theme mode (optional) */
  label?: {
    system?: string;
    dark?: string;
    light?: string;
  };
}

/**
 * ModeSwitcher Component
 *
 * A button component that cycles through available theme modes (light, dark, system).
 * Automatically updates the meta theme color and displays appropriate icons
 * for each theme state. Integrates with next-themes for theme persistence.
 *
 * Features:
 * - Cycles through light, dark, and system themes
 * - Updates meta theme color automatically
 * - Shows appropriate icons for each theme
 * - Accessible with screen reader support
 * - Customizable appearance and cycle order
 * - Integrates with application color configuration
 *
 * @param props - Component props
 * @returns JSX element containing the theme switcher button
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ModeSwitcher />
 *
 * // Custom styling
 * <ModeSwitcher
 *   className="border border-gray-300"
 *   variant="outline"
 *   size="lg"
 * />
 *
 * // Custom cycle order
 * <ModeSwitcher
 *   cycleOrder={['light', 'dark']} // Skip system mode
 * />
 * ```
 */
export function ModeSwitcher({
  className,
  variant = "ghost",
  size = "md",
  cycleOrder = [THEME_MODES.SYSTEM, THEME_MODES.LIGHT, THEME_MODES.DARK],
  type = "toogle",
  label = {
    system: "System",
    dark: "Dark",
    light: "Light",
  },
}: ModeSwitcherProps) {
  const { setTheme, theme } = useTheme();

  const toggleTheme = React.useCallback(() => {
    const currentIndex = cycleOrder.indexOf(theme as ThemeMode);
    const nextIndex = (currentIndex + 1) % cycleOrder.length;
    const nextTheme = cycleOrder[nextIndex];

    setTheme(nextTheme);
  }, [theme, setTheme, cycleOrder]);

  const getCurrentIcon = (withLabel: boolean = false) => {
    if (theme === THEME_MODES.SYSTEM) {
      return (
        <>
          <MonitorIcon /> {withLabel && <span>{label.system}</span>}
        </>
      );
    }

    if (theme === THEME_MODES.DARK) {
      return (
        <>
          <MoonIcon /> {withLabel && <span>{label.dark}</span>}
        </>
      );
    }

    return (
      <>
        <SunIcon /> {withLabel && <span>{label.light}</span>}
      </>
    );
  };

  const isActive = (val: "light" | "dark" | "system") => theme === val;

  if (type === "toogle") {
    return (
      <Button
        variant={variant}
        size={size}
        className={cn("group/toggle size-8 px-0 text-foreground", className)}
        onClick={toggleTheme}
        aria-label="Switch theme"
      >
        {getCurrentIcon()}
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  if (type === "dropdown") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={variant}
            size={size}
            className={cn(
              "group/toggle size-8 px-0 text-foreground ring-0! focus:outline-none! focus:ring-0! focus-visible:outline-none! focus-visible:ring-0! focus-visible:ring-offset-0!",
              className,
            )}
          >
            {getCurrentIcon()}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" onCloseAutoFocus={(e) => e.preventDefault()}>
          <DropdownMenuItem
            className={isActive("light") ? "bg-accent" : ""}
            onClick={() => setTheme("light")}
          >
            <SunIcon />
            {label.light}
          </DropdownMenuItem>
          <DropdownMenuItem
            className={isActive("dark") ? "bg-accent" : ""}
            onClick={() => setTheme("dark")}
          >
            <MoonIcon />
            {label.dark}
          </DropdownMenuItem>
          <DropdownMenuItem
            className={isActive("system") ? "bg-accent" : ""}
            onClick={() => setTheme("system")}
          >
            <MonitorIcon />
            {label.system}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenuItem
      className={className}
      onSelect={(e) => {
        e.preventDefault();
        toggleTheme();
      }}
    >
      {getCurrentIcon(true)}
    </DropdownMenuItem>
  );
}
