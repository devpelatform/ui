/**
 * Toolbar Components
 * Provides a flexible toolbar layout system for page headers and action bars
 * Includes title, heading, and action components with responsive design
 */

"use client";

import type { BaseComponentProps } from "@pelatform/ui.general";
import { cn } from "@pelatform/utils";

/**
 * Main Toolbar Component
 *
 * Creates a horizontal layout with space between heading and actions.
 * Typically used at the top of pages or sections to display titles
 * and related action buttons.
 *
 * @param props - Component props
 * @returns JSX element containing the toolbar layout
 *
 * @example
 * ```tsx
 * <Toolbar>
 *   <ToolbarHeading>
 *     <ToolbarTitle>Dashboard</ToolbarTitle>
 *     <p className="text-sm text-muted-foreground">
 *       Welcome back! Here's what's happening.
 *     </p>
 *   </ToolbarHeading>
 *   <ToolbarActions>
 *     <Button variant="outline">Export</Button>
 *     <Button>Create New</Button>
 *   </ToolbarActions>
 * </Toolbar>
 * ```
 */
export const Toolbar = ({ children }: BaseComponentProps) => {
  return <div className="flex grow items-center justify-between gap-2.5 pb-5">{children}</div>;
};

/**
 * ToolbarHeading Component
 *
 * Container for the left side of the toolbar, typically containing
 * the title and optional subtitle or description text.
 *
 * @param props - Component props
 * @returns JSX element containing the heading section
 *
 * @example
 * ```tsx
 * <ToolbarHeading>
 *   <ToolbarTitle>User Management</ToolbarTitle>
 *   <p className="text-sm text-muted-foreground">
 *     Manage user accounts and permissions
 *   </p>
 * </ToolbarHeading>
 * ```
 */
export const ToolbarHeading = ({ children, className }: BaseComponentProps) => {
  return <div className={cn("flex flex-col flex-wrap gap-px", className)}>{children}</div>;
};

/**
 * ToolbarTitle Component
 *
 * Displays the main title text with consistent typography.
 * Renders as an h1 element for proper semantic structure.
 *
 * @param props - Component props
 * @returns JSX element containing the title
 *
 * @example
 * ```tsx
 * <ToolbarTitle>Analytics Dashboard</ToolbarTitle>
 *
 * // With custom styling
 * <ToolbarTitle className="text-2xl text-blue-600">
 *   Premium Features
 * </ToolbarTitle>
 * ```
 */
export const ToolbarTitle = ({ className, children }: BaseComponentProps) => {
  return <h1 className={cn("font-semibold text-foreground text-lg", className)}>{children}</h1>;
};

/**
 * ToolbarActions Component
 *
 * Container for the right side of the toolbar, typically containing
 * action buttons, dropdowns, or other interactive elements.
 * Responsive design with different gaps on mobile vs desktop.
 *
 * @param props - Component props
 * @returns JSX element containing the actions section
 *
 * @example
 * ```tsx
 * <ToolbarActions>
 *   <Button variant="outline" size="sm">
 *     <IconDownload className="w-4 h-4 mr-2" />
 *     Export
 *   </Button>
 *   <Button size="sm">
 *     <IconPlus className="w-4 h-4 mr-2" />
 *     Add Item
 *   </Button>
 * </ToolbarActions>
 *
 * // With dropdown menu
 * <ToolbarActions>
 *   <DropdownMenu>
 *     <DropdownMenuTrigger asChild>
 *       <Button variant="outline">Options</Button>
 *     </DropdownMenuTrigger>
 *     <DropdownMenuContent>
 *       <DropdownMenuItem>Edit</DropdownMenuItem>
 *       <DropdownMenuItem>Delete</DropdownMenuItem>
 *     </DropdownMenuContent>
 *   </DropdownMenu>
 * </ToolbarActions>
 * ```
 */
export const ToolbarActions = ({ children }: BaseComponentProps) => {
  return <div className="flex flex-wrap items-center gap-1.5 lg:gap-3.5">{children}</div>;
};
