/**
 * Menu navigation utilities hook for dashboard layouts
 * Provides comprehensive menu state management and navigation helpers
 * Handles active states, breadcrumbs, and hierarchical menu structures
 */

"use client";

import type { ComponentType, SVGProps } from "react";

/**
 * Menu item interface
 */
interface MenuItem {
  /** Heading text */
  heading?: string;
  /** Menu item title */
  title?: string;
  /** Navigation path */
  path?: string;
  /** Menu item icon component */
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  /** Whether to show separator */
  separator?: boolean;

  /** Root path for active state matching */
  rootPath?: string;
  /** Child menu items */
  children?: MenuConfig;
  /** Children index for nested items */
  childrenIndex?: number;

  /** Whether the item is external */
  external?: boolean;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Disable text */
  disabledText?: string;

  /** Badge text */
  badge?: string;
  /** Badge variant */
  badgeVariant?:
    | "primary"
    | "destructive"
    | "success"
    | "info"
    | "warning"
    | "secondary"
    | "outline";

  /** Collapse configuration */
  collapse?: boolean;
  /** Title when collapsed */
  collapseTitle?: string;
  /** Title when expanded */
  expandTitle?: string;
}

/**
 * Type aliases for backward compatibility
 */
type MenuConfig = MenuItem[];

/** Return type interface for useMenu hook */
interface UseMenuReturn {
  /** Check if a specific path is currently active */
  isActive: (path: string | undefined) => boolean;
  /** Check if any child menu item is currently active */
  hasActiveChild: (children: MenuItem[] | undefined) => boolean;
  /** Check if a menu item (including its children) is currently active */
  isItemActive: (item: MenuItem) => boolean;
  /** Get the currently active menu item from the menu configuration */
  getCurrentItem: (items: MenuConfig) => MenuItem | undefined;
  /** Generate breadcrumb trail for the current active path */
  getBreadcrumb: (items: MenuConfig) => MenuItem[];
  /** Get child menu items at a specific level for the current active path */
  getChildren: (items: MenuConfig, level: number) => MenuConfig | null;
}

/**
 * Hook for managing menu navigation state and utilities
 *
 * This hook provides comprehensive menu management functionality including:
 * - Active state detection for menu items and paths
 * - Hierarchical menu navigation support
 * - Breadcrumb generation for current navigation path
 * - Child menu extraction at specific levels
 * - Support for nested menu structures
 *
 * @param pathname - Current pathname from router or location
 * @returns Object containing menu utility functions
 *
 * @example
 * ```tsx
 * const { isActive, getBreadcrumb, getCurrentItem } = useMenu(pathname);
 *
 * // Check if path is active
 * const isHomeActive = isActive('/dashboard');
 *
 * // Get breadcrumb for current path
 * const breadcrumb = getBreadcrumb(menuItems);
 *
 * // Get current active menu item
 * const currentItem = getCurrentItem(menuItems);
 * ```
 */
export const useMenu = (pathname: string): UseMenuReturn => {
  /**
   * Check if a specific path matches the current pathname
   * Handles root path ('/') as exact match, others as prefix match
   *
   * @param path - The path to check against current pathname
   * @returns True if the path is currently active
   */
  const isActive = (path: string | undefined): boolean => {
    if (path && path === "/") {
      return path === pathname;
    } else {
      return !!path && pathname.startsWith(path);
    }
  };

  /**
   * Recursively check if any child menu item is currently active
   * Traverses through nested menu structures to find active children
   *
   * @param children - Array of child menu items to check
   * @returns True if any child or nested child is active
   */
  const hasActiveChild = (children: MenuItem[] | undefined): boolean => {
    if (!children || !Array.isArray(children)) return false;
    return children.some(
      (child: MenuItem) =>
        (child.path && isActive(child.path)) || (child.children && hasActiveChild(child.children)),
    );
  };

  /**
   * Check if a menu item is active (either directly or through its children)
   * Combines direct path matching with child activity detection
   *
   * @param item - The menu item to check for activity
   * @returns True if the item or any of its children are active
   */
  const isItemActive = (item: MenuItem): boolean => {
    return (
      (item.path ? isActive(item.path) : false) ||
      (item.children ? hasActiveChild(item.children) : false)
    );
  };

  /**
   * Find and return the currently active menu item from the menu configuration
   * Recursively searches through menu hierarchy to find the most specific active item
   * Prioritizes deeper nested items over parent items when both are active
   *
   * @param items - Array of menu items to search through
   * @returns The currently active menu item, or undefined if none found
   */
  const getCurrentItem = (items: MenuConfig): MenuItem | undefined => {
    for (const item of items) {
      if (item.path && isActive(item.path)) {
        if (item.children && item.children.length > 0) {
          const childMatch = getCurrentItem(item.children);
          return childMatch || item;
        }
        return item;
      }
      if (item.children && item.children.length > 0) {
        const childMatch = getCurrentItem(item.children);
        if (childMatch) {
          return childMatch;
        }
      }
    }
    return undefined;
  };

  /**
   * Generate breadcrumb trail for the current active path
   * Creates an array of menu items representing the navigation path from root to current item
   * Useful for displaying navigation breadcrumbs in the UI
   *
   * @param items - Array of menu items to generate breadcrumb from
   * @returns Array of menu items representing the breadcrumb trail
   */
  const getBreadcrumb = (items: MenuConfig): MenuItem[] => {
    const findBreadcrumb = (nodes: MenuItem[], breadcrumb: MenuItem[] = []): MenuItem[] => {
      for (const item of nodes) {
        const currentBreadcrumb = [...breadcrumb, item];

        // Check if this item is active
        if (item.path && isActive(item.path)) {
          return currentBreadcrumb; // Return the breadcrumb up to this point
        }

        // If item has children, recurse and check them
        if (item.children && item.children.length > 0) {
          const childBreadcrumb = findBreadcrumb(item.children, currentBreadcrumb);
          if (childBreadcrumb.length > currentBreadcrumb.length) {
            return childBreadcrumb; // Return the deeper breadcrumb if found
          }
        }
      }
      return breadcrumb; // Return current breadcrumb if no match found
    };

    const breadcrumb = findBreadcrumb(items);
    return breadcrumb.length > 0 ? breadcrumb : [];
  };

  /**
   * Get child menu items at a specific hierarchical level for the current active path
   * Traverses the menu structure to find children at the specified depth level
   * Useful for displaying sub-navigation menus at different levels
   *
   * @param items - Array of menu items to search through
   * @param level - The hierarchical level to get children from (0-based)
   * @returns Array of child menu items at the specified level, or null if none found
   */
  const getChildren = (items: MenuConfig, level: number): MenuConfig | null => {
    const hasActiveChildAtLevel = (items: MenuConfig): boolean => {
      for (const item of items) {
        if (
          (item.path &&
            (item.path === pathname ||
              (item.path !== "/" && item.path !== "" && pathname.startsWith(item.path)))) ||
          (item.children && hasActiveChildAtLevel(item.children))
        ) {
          return true;
        }
      }
      return false;
    };

    const findChildren = (
      items: MenuConfig,
      targetLevel: number,
      currentLevel: number = 0,
    ): MenuConfig | null => {
      for (const item of items) {
        if (item.children) {
          if (targetLevel === currentLevel && hasActiveChildAtLevel(item.children)) {
            return item.children;
          }
          const children = findChildren(item.children, targetLevel, currentLevel + 1);
          if (children) {
            return children;
          }
        } else if (
          targetLevel === currentLevel &&
          item.path &&
          (item.path === pathname ||
            (item.path !== "/" && item.path !== "" && pathname.startsWith(item.path)))
        ) {
          return items;
        }
      }
      return null;
    };

    return findChildren(items, level);
  };

  return {
    isActive,
    hasActiveChild,
    isItemActive,
    getCurrentItem,
    getBreadcrumb,
    getChildren,
  };
};
