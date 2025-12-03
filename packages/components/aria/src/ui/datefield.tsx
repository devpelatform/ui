"use client";

import {
  composeRenderProps,
  type DateFieldProps,
  DateField as DateFieldRa,
  type DateInputProps as DateInputPropsRa,
  DateInput as DateInputRa,
  type DateSegmentProps,
  DateSegment as DateSegmentRa,
  type DateValue as DateValueRa,
  type TimeFieldProps,
  TimeField as TimeFieldRa,
  type TimeValue as TimeValueRa,
} from "react-aria-components";

import type { VariantProps } from "@pelatform/ui.general";
import { cn, cva } from "@pelatform/ui.general";

const inputVariants = cva(
  `
    flex w-full bg-background border border-input shadow-xs shadow-black/5 transition-[color,box-shadow] text-foreground placeholder:text-muted-foreground/80 
    focus-visible:ring-ring/30  focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px]     
    disabled:cursor-not-allowed disabled:opacity-60 
    [[readonly]]:bg-muted/80 [[readonly]]:cursor-not-allowed
    file:h-full [[type=file]]:py-0 file:border-solid file:border-input file:bg-transparent 
    file:font-medium file:not-italic file:text-foreground file:p-0 file:border-0 file:border-e
    aria-invalid:border-destructive/60 aria-invalid:ring-destructive/10 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/20
  `,
  {
    variants: {
      variant: {
        lg: "h-10 px-4 text-sm rounded-md file:pe-4 file:me-4",
        md: "h-9 px-3 text-sm rounded-md file:pe-3 file:me-3",
        sm: "h-8 px-2.5 text-xs rounded-md file:pe-2.5 file:me-2.5",
      },
    },
    defaultVariants: {
      variant: "md",
    },
  },
);

function DateField<T extends DateValueRa>({ className, children, ...props }: DateFieldProps<T>) {
  return (
    <DateFieldRa
      className={composeRenderProps(className, (className) => cn(className))}
      data-slot="datefield"
      {...props}
    >
      {children}
    </DateFieldRa>
  );
}

function TimeField<T extends TimeValueRa>({ className, children, ...props }: TimeFieldProps<T>) {
  return (
    <TimeFieldRa
      className={composeRenderProps(className, (className) => cn(className))}
      data-slot="datefield"
      {...props}
    >
      {children}
    </TimeFieldRa>
  );
}

function DateSegment({ className, ...props }: DateSegmentProps) {
  return (
    <DateSegmentRa
      className={composeRenderProps(className, (className) =>
        cn(
          `inline-flex rounded px-0.5 text-foreground caret-transparent outline-hidden data-invalid:data-focused:bg-destructive data-focused:data-placeholder:text-foreground data-invalid:data-focused:text-destructive-foreground data-invalid:data-placeholder:text-destructive data-disabled:cursor-not-allowed data-focused:bg-accent data-[type=literal]:px-0 data-[type=literal]:text-muted-foreground/70 data-focused:text-foreground data-invalid:data-focused:data-placeholder:text-destructive-foreground data-invalid:text-destructive data-placeholder:text-muted-foreground/70 data-disabled:opacity-50`,
          className,
        ),
      )}
      {...props}
      data-invalid
    />
  );
}

const dateInputStyles = `
  relative inline-flex items-center overflow-hidden whitespace-nowrap
  data-focus-within:ring-ring/30 data-focus-within:border-ring data-focus-within:outline-none data-focus-within:ring-[3px] 
  data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive
`;

interface DateInputProps extends DateInputPropsRa, VariantProps<typeof inputVariants> {
  className?: string;
  variant?: VariantProps<typeof inputVariants>["variant"];
}

function DateInput({ className, variant = "md", ...props }: Omit<DateInputProps, "children">) {
  return (
    <DateInputRa
      data-slot="input"
      className={composeRenderProps(className, (className) =>
        cn(inputVariants({ variant }), dateInputStyles, className),
      )}
      {...props}
    >
      {(segment) => <DateSegment segment={segment} />}
    </DateInputRa>
  );
}

export { DateField, DateInput, DateSegment, TimeField, dateInputStyles };
export type { DateInputProps };
