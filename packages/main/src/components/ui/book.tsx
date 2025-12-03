/**
 * Book Component
 * Creates a 3D book-like visual element with customizable appearance and hover effects
 * Perfect for showcasing content, documentation, or creating engaging visual elements
 */

"use client";

import type React from "react";

import { cn } from "@pelatform/ui.general";

/**
 * Props interface for the Book component
 */
interface BookProps {
  /** Content to display inside the book */
  children: React.ReactNode;
  /** Book cover color (default: '#f50537') */
  color?: string;
  /** Text color for book content */
  textColor?: string;
  /** Whether to apply texture effects */
  texture?: boolean;
  /** Book depth in container query width units */
  depth?: number;
  /** Book variant style (default: 'default') */
  variant?: "default" | "simple";
  /** Optional illustration to display on the book */
  illustration?: React.ReactNode;
  /** Book width in pixels (default: 196) */
  width?: number;
}

/**
 * Book Component
 *
 * A 3D book component with hover animations and customizable styling.
 * Features perspective transforms, shadow effects, and flexible content layout.
 *
 * @param props - Component props
 * @returns JSX element with 3D book appearance
 *
 * @example
 * ```tsx
 * // Basic book
 * <Book>
 *   <h3>Book Title</h3>
 *   <p>Book description...</p>
 * </Book>
 *
 * // Customized book
 * <Book
 *   color="#3b82f6"
 *   textColor="#ffffff"
 *   width={240}
 *   depth={6}
 * >
 *   <div className="p-4">
 *     <h2>Custom Book</h2>
 *     <p>Custom content</p>
 *   </div>
 * </Book>
 *
 * // Simple variant with illustration
 * <Book
 *   variant="simple"
 *   illustration={<BookIcon />}
 * >
 *   Simple book content
 * </Book>
 *
 * // Book gallery
 * <div className="flex gap-4">
 *   <Book color="#ef4444">Red Book</Book>
 *   <Book color="#10b981">Green Book</Book>
 *   <Book color="#8b5cf6">Purple Book</Book>
 * </div>
 * ```
 */
export function Book(props: BookProps) {
  const {
    children,
    color = "#f50537",
    depth,
    texture,
    variant = "default",
    textColor,
    illustration,
    width,
  } = props;
  return (
    <div
      className={cn("group perspective-[900px] inline-block w-fit")}
      style={
        {
          "--book-color": color,
          "--text-color": textColor,
          "--book-depth": `${depth || 4}cqw`,
          "--book-width": `${width || 196}px`,
        } as React.CSSProperties
      }
    >
      <div className="transform-3d group-hover:transform-[rotateY(-20deg)_scale(1.066)translateX(-8px)] relative aspect-49/60 w-fit min-w-[calc(var(--book-width))] rotate-0 transition-transform duration-500 ease-out contain-inline-size">
        <Stack
          align="stretch"
          className="absolute size-full overflow-hidden rounded-r rounded-l border border-border bg-stone-100 shadow-book dark:bg-stone-800"
        >
          {variant !== "simple" && (
            <Stack
              shrink
              grow
              direction="row"
              className={cn(
                "relative min-w-[calc(var(--book-width))] overflow-hidden bg-(--book-color)",
              )}
            >
              <div className="absolute inset-y-0 min-w-[8.2%] bg-book-bind-bg opacity-100 mix-blend-overlay" />
              {illustration && <div className="object-cover">{illustration}</div>}
            </Stack>
          )}
          <Stack grow={variant === "simple"} direction="row" className="h-fit">
            <div className="h-full min-w-[8.2%] bg-book-bind-bg opacity-100 mix-blend-overlay" />
            <div className="w-full contain-inline-size">{children}</div>
          </Stack>
          {texture && (
            <div
              aria-hidden={true}
              className="absolute inset-0 bg-ali bg-cover bg-no-repeat opacity-60 mix-blend-hard-light"
            />
          )}
        </Stack>
        <div
          aria-hidden={true}
          className="absolute top-[3px] h-[calc(100%-2*6px)] w-[calc(var(--book-depth)-2px)] bg-book-pages"
          style={{
            transform:
              "translateX(calc(var(--book-width) - var(--book-depth) / 2 - 3px)) rotateY(90deg) translateX(calc(var(--book-depth) / 2))",
          }}
        />
        <div
          aria-hidden={true}
          className="book-bg absolute left-0 h-full w-full rounded-r rounded-l-md bg-(--book-color)"
          style={{
            transform: "translateZ(calc(-1 * var(--book-depth)))",
          }}
        />
      </div>
    </div>
  );
}

type FlexAlignItems = "stretch" | "start" | "end" | "center";
type FlexJustifyContent =
  | "stretch"
  | "start"
  | "end"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "center";

interface StackProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  direction?: "column" | "row";
  align?: FlexAlignItems;
  justify?: FlexJustifyContent;
  gap?: number;
  padding?: number;
  grow?: boolean;
  shrink?: boolean;
  wrap?: boolean;
  className?: string;
}

export function Stack(props: StackProps) {
  const {
    children,
    shrink = false,
    grow = false,
    justify = "start",
    align = "start",
    wrap = false,
    padding = 0,
    gap = 0,
    direction = "column",
    className,
    ...etc
  } = props;

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flex: "initial",
        flexDirection: direction,
        alignItems: align === "start" ? "flex-start" : align === "end" ? "flex-end" : align,
        justifyContent:
          justify === "start" ? "flex-start" : justify === "end" ? "flex-end" : justify,
        flexWrap: wrap ? "wrap" : "nowrap",
        flexGrow: grow ? 1 : 0,
        flexShrink: shrink ? 1 : 0,
        padding: `${padding * 4}px`,
        gap: `${gap * 4}px`,
      }}
      {...etc}
    >
      {children}
    </div>
  );
}
