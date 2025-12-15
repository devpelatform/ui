"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

import { cva, type VariantProps } from "@pelatform/ui.general";
import { cn } from "@pelatform/utils";

// Define a context for `permanent` state
const SwitchContext = React.createContext<{ permanent: boolean }>({
  permanent: false,
});

const useSwitchContext = () => {
  const context = React.useContext(SwitchContext);
  if (!context) {
    throw new Error("SwitchIndicator must be used within a Switch component");
  }
  return context;
};

// Define classes for variants
const switchVariants = cva(
  `
    relative peer inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors 
    focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background 
    disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-input
    aria-invalid:border aria-invalid:border-destructive/60 aria-invalid:ring-destructive/10 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/20
    in-data-[invalid=true]:border in-data-[invalid=true]:border-destructive/60 in-data-[invalid=true]:ring-destructive/10  dark:in-data-[invalid=true]:border-destructive dark:in-data-[invalid=true]:ring-destructive/20
  `,
  {
    variants: {
      shape: {
        pill: "rounded-full",
        square: "rounded-md",
      },
      size: {
        sm: "h-5 w-8",
        md: "h-6 w-10",
        lg: "h-8 w-14",
        xl: "h-9 w-16",
      },
      permanent: {
        true: "bg-input",
        false: "data-[state=checked]:bg-primary",
      },
    },
    defaultVariants: {
      shape: "pill",
      permanent: false,
      size: "md",
    },
  },
);

const switchThumbVariants = cva(
  "pointer-events-none start-0 block h-[calc(100%-4px)] w-1/2 bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-[2px] rtl:data-[state=checked]:-translate-x-[calc(100%-2px)] rtl:data-[state=unchecked]:-translate-x-[2px]",
  {
    variants: {
      shape: {
        pill: "rounded-full",
        square: "rounded-md",
      },
      size: {
        xs: "",
        sm: "",
        md: "",
        lg: "",
        xl: "",
      },
    },
    compoundVariants: [
      {
        shape: "square",
        size: "xs",
        className: "rounded-sm",
      },
    ],
    defaultVariants: {
      shape: "pill",
      size: "md",
    },
  },
);

const switchIndicatorVariants = cva(
  "pointer-events-none absolute top-1/2 mx-[2px] flex w-1/2 -translate-y-1/2 items-center justify-center text-center font-medium text-sm transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
  {
    variants: {
      state: {
        on: "start-0",
        off: "end-0",
      },
      permanent: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        state: "on",
        permanent: false,
        className:
          "text-primary-foreground peer-data-[state=unchecked]:invisible peer-data-[state=unchecked]:translate-x-full rtl:peer-data-[state=unchecked]:-translate-x-full",
      },
      {
        state: "off",
        permanent: false,
        className:
          "-translate-x-full peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-0 rtl:translate-x-full",
      },
      {
        state: "on",
        permanent: true,
        className: "start-0",
      },
      {
        state: "off",
        permanent: true,
        className: "end-0",
      },
    ],
    defaultVariants: {
      state: "off",
      permanent: false,
    },
  },
);

function SwitchWrapper({
  className,
  children,
  permanent = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { permanent?: boolean }) {
  return (
    <SwitchContext.Provider value={{ permanent }}>
      <div
        data-slot="switch-wrapper"
        className={cn("relative inline-flex items-center", className)}
        {...props}
      >
        {children}
      </div>
    </SwitchContext.Provider>
  );
}

function Switch({
  className,
  thumbClassName = "",
  shape,
  size,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> &
  VariantProps<typeof switchVariants> & { thumbClassName?: string }) {
  const context = useSwitchContext();
  const permanent = context?.permanent ?? false;

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(switchVariants({ shape, size, permanent }), className)}
      {...props}
    >
      <SwitchPrimitive.Thumb className={cn(switchThumbVariants({ shape, size }), thumbClassName)} />
    </SwitchPrimitive.Root>
  );
}

function SwitchIndicator({
  className,
  state,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof switchIndicatorVariants>) {
  const context = useSwitchContext();
  const permanent = context?.permanent ?? false;

  return (
    <span
      data-slot="switch-indicator"
      className={cn(switchIndicatorVariants({ state, permanent }), className)}
      {...props}
    />
  );
}

export { Switch, SwitchIndicator, SwitchWrapper };
