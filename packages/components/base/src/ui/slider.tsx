"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "@base-ui-components/react/slider";

import { cn } from "@pelatform/ui.general";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

type SliderRootProps = React.ComponentProps<typeof SliderPrimitive.Root>;
type SliderOnValueChange = NonNullable<SliderRootProps["onValueChange"]>;

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  showTooltip = false,
  tooltipContent,
  onValueChange,
  children,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & {
  showTooltip?: boolean;
  tooltipContent?: (value: number) => React.ReactNode;
  tooltipVariant?: "dark" | "light";
}) {
  const [internalValues, setInternalValues] = React.useState<number[]>(
    Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max],
  );

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValues(Array.isArray(value) ? value : [value]);
    }
  }, [value]);

  const handleValueChange: SliderOnValueChange = (newValue, eventDetails) => {
    const valuesArray = Array.isArray(newValue) ? [...newValue] : [newValue];
    setInternalValues(valuesArray);
    onValueChange?.(newValue, eventDetails);
  };

  const [showTooltipState, setShowTooltipState] = React.useState(false);

  const handlePointerDown = () => {
    if (showTooltip) {
      setShowTooltipState(true);
    }
  };

  const handlePointerUp = React.useCallback(() => {
    if (showTooltip) {
      setShowTooltipState(false);
    }
  }, [showTooltip]);

  React.useEffect(() => {
    if (showTooltip) {
      document.addEventListener("pointerup", handlePointerUp);
      return () => {
        document.removeEventListener("pointerup", handlePointerUp);
      };
    }
  }, [showTooltip, handlePointerUp]);

  const renderThumb = (thumbValue: number, index: number) => {
    const thumb = (
      <SliderPrimitive.Thumb
        key={index}
        data-slot="slider-thumb"
        index={index}
        className={cn(
          "block size-4 shrink-0 rounded-full border border-primary bg-background shadow-sm outline-none ring-ring/20 transition-[color,box-shadow] hover:ring-4 disabled:pointer-events-none disabled:opacity-50 data-dragging:ring-4 data-focused:ring-4 data-touched:ring-4",
        )}
        onPointerDown={handlePointerDown}
      />
    );

    if (!showTooltip) return thumb;

    return (
      <TooltipProvider key={index}>
        <Tooltip open={showTooltipState}>
          <TooltipTrigger render={thumb} />
          <TooltipContent
            className="px-2 py-1 text-xs"
            sideOffset={8}
            side={props.orientation === "vertical" ? "right" : "top"}
          >
            <p>{tooltipContent ? tooltipContent(thumbValue) : thumbValue}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none select-none items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-disabled:opacity-50",
        className,
      )}
      onValueChange={handleValueChange}
      {...props}
    >
      <SliderPrimitive.Control className="relative flex h-4 w-full touch-none select-none items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col">
        <SliderPrimitive.Track className="relative h-1.5 w-full overflow-hidden rounded-full bg-accent data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-1.5">
          <SliderPrimitive.Indicator className="absolute h-full bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full" />
        </SliderPrimitive.Track>
        {showTooltip
          ? internalValues.map((thumbValue, index) => renderThumb(thumbValue, index))
          : children}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

function SliderThumb({ className, ...props }: React.ComponentProps<typeof SliderPrimitive.Thumb>) {
  return (
    <SliderPrimitive.Thumb
      data-slot="slider-thumb"
      className={cn(
        "block size-4 shrink-0 rounded-full border border-primary bg-background shadow-sm outline-none ring-ring/20 transition-[color,box-shadow] hover:ring-4 disabled:pointer-events-none disabled:opacity-50 data-dragging:ring-4 data-focused:ring-4 data-touched:ring-4",
        className,
      )}
      {...props}
    />
  );
}

export { Slider, SliderThumb };
