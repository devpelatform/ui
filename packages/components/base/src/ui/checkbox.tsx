"use client";

import type * as React from "react";
import { Checkbox as BaseCheckbox } from "@base-ui-components/react/checkbox";
import { CheckIcon, MinusIcon } from "lucide-react";

import { cva, type VariantProps } from "@pelatform/ui.general";
import { cn } from "@pelatform/utils";

// Define the variants for the Checkbox using cva.
const checkboxVariants = cva(
  `
    group/checkbox peer bg-background shrink-0 rounded-md border border-input ring-offset-background focus-visible:outline-none 
    focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
    aria-invalid:border-destructive/60 aria-invalid:ring-destructive/10 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/20
    in-data-[invalid=true]:border-destructive/60 in-data-[invalid=true]:ring-destructive/10  dark:in-data-[invalid=true]:border-destructive dark:in-data-[invalid=true]:ring-destructive/20
    data-checked:bg-primary data-checked:border-primary data-checked:text-primary-foreground data-indeterminate:bg-primary data-indeterminate:border-primary data-indeterminate:text-primary-foreground
    `,
  {
    variants: {
      size: {
        sm: "size-4.5 [&_svg]:size-3",
        md: "size-5 [&_svg]:size-3.5",
        lg: "size-5.5 [&_svg]:size-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

function Checkbox({
  className,
  size,
  ...props
}: React.ComponentProps<typeof BaseCheckbox.Root> & VariantProps<typeof checkboxVariants>) {
  return (
    <BaseCheckbox.Root
      data-slot="checkbox"
      className={cn(checkboxVariants({ size }), className)}
      {...props}
    >
      <BaseCheckbox.Indicator className={cn("flex items-center justify-center text-current")}>
        <CheckIcon className="group-data-[state=indeterminate]/checkbox:hidden" />
        <MinusIcon className="hidden group-data-[state=indeterminate]/checkbox:block" />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}

export { Checkbox, checkboxVariants };
