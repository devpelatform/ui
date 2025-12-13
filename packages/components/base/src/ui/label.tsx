"use client";

import type * as React from "react";

import { cva, type VariantProps } from "@pelatform/ui.general";
import { cn } from "@pelatform/utils";

const labelVariants = cva(
  "text-sm leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "font-medium",
        secondary: "font-normal",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

function Label({
  className,
  variant,
  ...props
}: React.ComponentProps<"label"> & VariantProps<typeof labelVariants>) {
  return (
    <label data-slot="label" className={cn(labelVariants({ variant }), className)} {...props} />
  );
}

export { Label };
