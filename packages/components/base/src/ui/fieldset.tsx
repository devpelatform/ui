"use client";

import { Fieldset as BaseFieldset } from "@base-ui-components/react/fieldset";

import { cn } from "@pelatform/ui.general";

function Fieldset({ className, ...props }: React.ComponentProps<typeof BaseFieldset.Root>) {
  return (
    <BaseFieldset.Root
      data-slot="fieldset"
      className={cn("flex w-full flex-col gap-4", className)}
      {...props}
    />
  );
}

function FieldsetLegend({ className, ...props }: React.ComponentProps<typeof BaseFieldset.Legend>) {
  return (
    <BaseFieldset.Legend
      data-slot="fieldset-legend"
      className={cn("font-medium text-foreground text-sm", className)}
      {...props}
    />
  );
}

export { Fieldset, FieldsetLegend };
