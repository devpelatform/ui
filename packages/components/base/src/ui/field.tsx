"use client";

import { Field as BaseField } from "@base-ui-components/react/field";

import { cn } from "@pelatform/ui.general";

function Field({ className, ...props }: React.ComponentProps<typeof BaseField.Root>) {
  return (
    <BaseField.Root
      data-slot="field"
      className={cn(
        "flex flex-col gap-2 has-data-[slot=field-error]:**:data-[slot=field-description]:hidden",
        className,
      )}
      {...props}
    />
  );
}

function FieldLabel({ className, ...props }: React.ComponentProps<typeof BaseField.Label>) {
  return (
    <BaseField.Label
      data-slot="field-label"
      className={cn("font-medium text-foreground text-sm", className)}
      {...props}
    />
  );
}

function FieldError({ className, ...props }: React.ComponentProps<typeof BaseField.Error>) {
  return (
    <BaseField.Error
      data-slot="field-error"
      className={cn("font-normal text-destructive text-xs", className)}
      {...props}
    />
  );
}

function FieldDescription({
  className,
  ...props
}: React.ComponentProps<typeof BaseField.Description>) {
  return (
    <BaseField.Description
      data-slot="field-description"
      className={cn("text-muted-foreground text-xs", className)}
      {...props}
    />
  );
}

function FieldControl({ ...props }: React.ComponentProps<typeof BaseField.Control>) {
  return <BaseField.Control data-slot="field-control" {...props} />;
}

export { Field, FieldLabel, FieldError, FieldDescription, FieldControl };
