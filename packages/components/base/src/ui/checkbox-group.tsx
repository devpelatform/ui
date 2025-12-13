"use client";

import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui-components/react/checkbox-group";

import { cn } from "@pelatform/utils";

function CheckboxGroup({ className, ...props }: React.ComponentProps<typeof BaseCheckboxGroup>) {
  return (
    <BaseCheckboxGroup
      data-slot="checkbox-group"
      className={cn("flex flex-col items-start gap-1.5", className)}
      {...props}
    />
  );
}

export { CheckboxGroup };
