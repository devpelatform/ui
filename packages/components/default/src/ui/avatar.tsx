"use client";

import type * as React from "react";
import { Avatar as AvatarPrimitive } from "radix-ui";

import { cva, type VariantProps } from "@pelatform/ui.general";
import { cn } from "@pelatform/utils";

const avatarStatusVariants = cva(
  "flex size-2 items-center rounded-full border-2 border-background",
  {
    variants: {
      variant: {
        online: "bg-green-600",
        offline: "bg-zinc-400 dark:bg-zinc-500",
        busy: "bg-yellow-600",
        away: "bg-blue-600",
      },
    },
    defaultVariants: {
      variant: "online",
    },
  },
);

function Avatar({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn("relative flex size-10 shrink-0", className)}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <div className={cn("relative overflow-hidden rounded-full", className)}>
      <AvatarPrimitive.Image
        data-slot="avatar-image"
        className={cn("aspect-square h-full w-full")}
        {...props}
      />
    </div>
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full border border-border bg-accent text-accent-foreground text-xs",
        className,
      )}
      {...props}
    />
  );
}

function AvatarIndicator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="avatar-indicator"
      className={cn("absolute flex size-6 items-center justify-center", className)}
      {...props}
    />
  );
}

function AvatarStatus({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof avatarStatusVariants>) {
  return (
    <div
      data-slot="avatar-status"
      className={cn(avatarStatusVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Avatar, AvatarFallback, AvatarImage, AvatarIndicator, AvatarStatus, avatarStatusVariants };
