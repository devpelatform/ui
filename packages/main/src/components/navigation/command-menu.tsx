/**
 * Command Menu Component
 *
 * A powerful command palette interface that provides quick access to application features
 * through keyboard shortcuts and search functionality. Built on top of Radix UI Dialog
 * and Command components with integrated analytics tracking.
 *
 * Features:
 * - Keyboard shortcuts (Cmd+K, Ctrl+K, /) for quick access
 * - Search functionality with customizable placeholder
 * - Analytics tracking for user interactions
 * - Responsive design with adaptive sizing
 * - Customizable styling for button and dialog
 * - Accessibility support with proper ARIA labels
 * - Smart focus management and keyboard navigation
 */

"use client";

import * as React from "react";
import type { DialogProps } from "@radix-ui/react-dialog";
import { SearchIcon } from "lucide-react";

import { Button, CommandDialog, CommandInput, CommandList } from "@pelatform/ui.default";
import { cn, googleTrackEvent } from "@pelatform/utils";

/**
 * Props interface for the CommandMenu component
 * Extends DialogProps from Radix UI for full dialog customization
 */
export interface CommandMenuProps extends DialogProps {
  /** Child elements to render inside the command list (command items, groups, etc.) */
  children: React.ReactNode;
  /** Additional CSS classes for the trigger button */
  classButton?: string;
  /** Additional CSS classes for the command dialog */
  classDialog?: string;
  /** Text displayed on the search trigger button */
  searchButtonText?: string;
  /** Placeholder text for the command input field */
  commandInputPlaceholder?: string;
  /** Keyboard shortcut hint displayed on the button (e.g., "⌘K", "Ctrl+K") */
  keyHint?: string;
}

/**
 * CommandMenu Component
 *
 * A comprehensive command palette that provides users with quick access to application
 * features through keyboard shortcuts and search. Automatically tracks user interactions
 * for analytics and provides a responsive, accessible interface.
 *
 * The component listens for keyboard shortcuts (Cmd+K, Ctrl+K, /) and opens a dialog
 * with a search input and command list. It intelligently avoids triggering when the
 * user is typing in form fields or content-editable areas.
 *
 * @param props - Component props extending DialogProps
 * @returns JSX element containing the command menu trigger and dialog
 *
 * @example
 * ```tsx
 * // Basic usage with command items
 * <CommandMenu>
 *   <CommandGroup heading="Navigation">
 *     <CommandItem onSelect={() => router.push('/')}>
 *       <IconHome className="mr-2 h-4 w-4" />
 *       <span>Home</span>
 *     </CommandItem>
 *     <CommandItem onSelect={() => router.push('/dashboard')}>
 *       <IconDashboard className="mr-2 h-4 w-4" />
 *       <span>Dashboard</span>
 *     </CommandItem>
 *   </CommandGroup>
 *
 *   <CommandGroup heading="Actions">
 *     <CommandItem onSelect={() => setTheme('dark')}>
 *       <IconMoon className="mr-2 h-4 w-4" />
 *       <span>Toggle Dark Mode</span>
 *     </CommandItem>
 *   </CommandGroup>
 * </CommandMenu>
 *
 * // Custom styling and text
 * <CommandMenu
 *   searchButtonText="Search commands..."
 *   commandInputPlaceholder="What would you like to do?"
 *   keyHint="⌘K"
 *   classButton="w-64 bg-gray-50"
 *   classDialog="max-w-2xl"
 * >
 *   <CommandEmpty>No results found.</CommandEmpty>
 *   <CommandGroup heading="Quick Actions">
 *     <CommandItem onSelect={handleCreateNew}>
 *       <IconPlus className="mr-2 h-4 w-4" />
 *       <span>Create New Project</span>
 *       <CommandShortcut>⌘N</CommandShortcut>
 *     </CommandItem>
 *   </CommandGroup>
 * </CommandMenu>
 *
 * // With search functionality
 * <CommandMenu
 *   searchButtonText="Search docs..."
 *   commandInputPlaceholder="Search documentation..."
 * >
 *   <CommandEmpty>No documentation found.</CommandEmpty>
 *   <CommandGroup heading="Documentation">
 *     {docs.map((doc) => (
 *       <CommandItem
 *         key={doc.id}
 *         onSelect={() => router.push(`/docs/${doc.slug}`)}
 *       >
 *         <IconBook className="mr-2 h-4 w-4" />
 *         <span>{doc.title}</span>
 *       </CommandItem>
 *     ))}
 *   </CommandGroup>
 * </CommandMenu>
 * ```
 */
export function CommandMenu({
  children,
  classButton,
  classDialog,
  searchButtonText = "Search ...",
  commandInputPlaceholder = "Type a command or search...",
  keyHint = "⌘K",
  ...props
}: CommandMenuProps) {
  /** State to control the command dialog open/close */
  const [open, setOpen] = React.useState(false);

  /**
   * Effect to handle keyboard shortcuts for opening the command menu
   * Listens for Cmd+K, Ctrl+K, and '/' keys while avoiding conflicts
   * with form inputs and content-editable areas
   */
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for command menu shortcuts: Cmd+K, Ctrl+K, or '/'
      const isCommandShortcut = (e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/";

      if (isCommandShortcut) {
        // Avoid triggering when user is typing in form fields or editable content
        const isTypingInField =
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement;

        if (isTypingInField) {
          return;
        }

        e.preventDefault();

        setOpen((currentOpen) => {
          const newState = !currentOpen;

          // Track analytics only when opening the menu
          if (newState) {
            googleTrackEvent({
              name: "site_header_search_trigger_shortcut",
              properties: {
                method: e.key === "/" ? "slash" : "cmd_k",
                category: "search",
                label: `Search Trigger - ${e.key === "/" ? "Slash" : "Cmd+K"}`,
                timestamp: Date.now(),
              },
            });
          }

          return newState;
        });
      }
    };

    // Add event listener for keyboard shortcuts
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on component unmount
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  /**
   * Handler for button click events with analytics tracking
   * Tracks user interaction when the search button is clicked
   */
  const handleButtonClick = React.useCallback(() => {
    googleTrackEvent({
      name: "site_header_search_trigger_click",
      properties: {
        method: "button_click",
        category: "search",
        label: "Search Trigger - Button Click",
        timestamp: Date.now(),
      },
    });
  }, []);

  /**
   * Handler for opening the command menu
   * Combines state update with analytics tracking
   */
  const handleOpenMenu = React.useCallback(() => {
    setOpen(true);
    handleButtonClick();
  }, [handleButtonClick]);

  return (
    <>
      {/* Search trigger button with keyboard shortcut hint */}
      <Button
        variant="outline"
        mode="input"
        size="sm"
        className={cn("relative h-8 w-full py-0 pl-2 sm:w-40 sm:pr-12 lg:w-48", classButton)}
        onClick={handleOpenMenu}
        aria-label={`Open command menu (${keyHint})`}
        {...props}
      >
        <SearchIcon className="mr-2 h-4 w-4" aria-hidden="true" />
        <span className="inline-flex text-muted-foreground">{searchButtonText}</span>
        <kbd
          className="pointer-events-none absolute top-1/2 right-[5px] hidden h-5 -translate-y-1/2 select-none items-center gap-1 rounded border bg-muted px-1.5 font-medium font-mono text-[10px] opacity-100 sm:flex"
          aria-label={`Keyboard shortcut: ${keyHint}`}
        >
          {keyHint}
        </kbd>
      </Button>

      {/* Command dialog with search input and command list */}
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className={cn(
          "**:data-dialog-close:end-[0.925rem] **:data-dialog-close:top-[0.925rem]",
          classDialog,
        )}
      >
        <CommandInput placeholder={commandInputPlaceholder} aria-label="Search commands" />
        <CommandList>{children}</CommandList>
      </CommandDialog>
    </>
  );
}
