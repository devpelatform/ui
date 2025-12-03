"use client";

import type React from "react";
import { Collapsible as BaseCollapsible } from "@base-ui-components/react/collapsible";

import { cn } from "@pelatform/ui.general";

function Collapsible({ ...props }: React.ComponentProps<typeof BaseCollapsible.Root>) {
  return <BaseCollapsible.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({
  children,
  className,
  asChild = false,
  ...props
}: React.ComponentProps<typeof BaseCollapsible.Trigger> & {
  asChild?: boolean;
}) {
  const triggerProps = {
    "data-slot": "alert-dialog-trigger" as const,
    className,
    ...props,
    ...(asChild && {
      render: children as React.ReactElement<
        Record<string, unknown>,
        string | React.JSXElementConstructor<unknown>
      >,
    }),
  };

  return asChild ? (
    <BaseCollapsible.Trigger {...triggerProps} />
  ) : (
    <BaseCollapsible.Trigger {...triggerProps}>{children}</BaseCollapsible.Trigger>
  );
}

function CollapsiblePanel({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseCollapsible.Panel>) {
  return (
    <BaseCollapsible.Panel
      data-slot="collapsible-panel"
      className={cn(
        "h-(--collapsible-panel-height) overflow-hidden transition-all ease-out data-ending-style:h-0 data-starting-style:h-0",
        className,
      )}
      {...props}
    >
      {children}
    </BaseCollapsible.Panel>
  );
}

export { Collapsible, CollapsiblePanel, CollapsibleTrigger };
