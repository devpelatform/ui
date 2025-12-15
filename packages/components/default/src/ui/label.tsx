"use client";

import type * as React from "react";
import { Label as LabelPrimitive } from "radix-ui";

import { cva, type VariantProps } from "@pelatform/ui.general";
import { cn } from "@pelatform/utils";

const labelVariants = cva(
  "text-foreground text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
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
}: React.ComponentProps<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(labelVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Label };
