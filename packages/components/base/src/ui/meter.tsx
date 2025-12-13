"use client";

import type * as React from "react";
import { Meter as BaseMeter } from "@base-ui-components/react/meter";

import { cn } from "@pelatform/utils";

function Meter({ className, children, ...props }: React.ComponentProps<typeof BaseMeter.Root>) {
  return (
    <BaseMeter.Root data-slot="meter" className={cn("w-full space-y-1.5", className)} {...props}>
      {children}
      <BaseMeter.Track
        data-slot="meter-track"
        className={cn("h-2 w-full overflow-hidden rounded-md bg-primary/20", className)}
        {...props}
      >
        <BaseMeter.Indicator data-slot="meter-indicator" className="bg-primary" />
      </BaseMeter.Track>
    </BaseMeter.Root>
  );
}

function MeterLabel({ className, ...props }: React.ComponentProps<typeof BaseMeter.Label>) {
  return (
    <BaseMeter.Label
      data-slot="meter-label"
      className={cn("font-medium text-sm", className)}
      {...props}
    />
  );
}

function MeterValue({ className, ...props }: React.ComponentProps<typeof BaseMeter.Value>) {
  return (
    <BaseMeter.Value data-slot="meter-value" className={cn("text-sm", className)} {...props} />
  );
}

export { Meter, MeterLabel, MeterValue };
