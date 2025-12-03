"use client";

import type * as React from "react";
import { Toolbar as BaseToolbar } from "@base-ui-components/react/toolbar";

import { cn } from "@pelatform/ui.general";
import { type ButtonProps, buttonVariants } from "./button";

function Toolbar({ className, ...props }: React.ComponentProps<typeof BaseToolbar.Root>) {
  return (
    <BaseToolbar.Root
      className={cn(
        "flex items-center gap-2.5 rounded-md bg-popover p-1 shadow-xs outline outline-border",
        className,
      )}
      {...props}
    />
  );
}

function ToolbarButton({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof BaseToolbar.Button> & ButtonProps) {
  return (
    <BaseToolbar.Button
      className={cn(
        buttonVariants({ variant: variant ?? "ghost", size: size ?? "md" }),
        "shrink-0",
        className,
      )}
      {...props}
    />
  );
}

function ToolbarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof BaseToolbar.Separator>) {
  return (
    <BaseToolbar.Separator className={cn("h-6 w-px shrink-0 bg-border", className)} {...props} />
  );
}

function ToolbarInput({ ...props }: React.ComponentProps<typeof BaseToolbar.Input>) {
  return <BaseToolbar.Input {...props} />;
}

function ToolbarGroup({ className, ...props }: React.ComponentProps<typeof BaseToolbar.Group>) {
  return <BaseToolbar.Group className={cn("flex items-center gap-1", className)} {...props} />;
}

function ToolbarLink({ className, ...props }: React.ComponentProps<typeof BaseToolbar.Link>) {
  return (
    <BaseToolbar.Link
      className={cn(
        "inline-flex h-9 shrink-0 items-center gap-2 rounded-md px-4 text-muted-foreground text-sm no-underline transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

export { Toolbar, ToolbarButton, ToolbarSeparator, ToolbarInput, ToolbarGroup, ToolbarLink };
