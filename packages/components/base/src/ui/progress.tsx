"use client";

import type * as React from "react";
import { Progress as BaseProgress } from "@base-ui-components/react/progress";

import { cn } from "@pelatform/utils";

function Progress({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseProgress.Root>) {
  return (
    <BaseProgress.Root data-slot="progress" className="relative" {...props}>
      <BaseProgress.Track
        data-slot="progress-track"
        className={cn("block h-1.5 w-full overflow-hidden rounded-full bg-secondary", className)}
      >
        <BaseProgress.Indicator
          data-slot="progress-indicator"
          className="block h-full w-full bg-primary transition-all"
        />
      </BaseProgress.Track>
      {children}
    </BaseProgress.Root>
  );
}

function ProgressValue({ className, ...props }: React.ComponentProps<typeof BaseProgress.Value>) {
  return (
    <BaseProgress.Value
      data-slot="progress-value"
      className={cn("mt-1.5 flex justify-end font-medium text-foreground text-sm", className)}
      {...props}
    />
  );
}

export { Progress, ProgressValue };
