/**
 * Section Component
 * Provides a structured section layout with grid background and decorative elements
 * Useful for creating visually consistent page sections with grid-based design
 */

"use client";

import type { HTMLAttributes } from "react";
import { PlusIcon } from "lucide-react";

import { cn } from "@pelatform/utils";
import { GridBackground } from "../ui/grid-background";

/**
 * Props interface for the Section component
 */
type SectionProps = {
  /** Additional CSS classes to apply to the section element */
  sectionClassName?: string;
} & HTMLAttributes<HTMLDivElement>;

/**
 * Cross Component
 *
 * Renders a decorative cross/plus icon with background lines.
 * Used as corner decoration in the Section component.
 */
const Cross = () => (
  <div className="relative h-6 w-6">
    <div className="absolute left-3 h-6 w-px bg-background" />
    <div className="absolute top-3 h-px w-6 bg-background" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <PlusIcon size={20} className="text-border/70 dark:text-border" />
    </div>
  </div>
);

/**
 * Section Component
 *
 * A layout component that creates structured sections with a grid background
 * and decorative corner elements. Provides consistent spacing and visual
 * hierarchy for page content sections.
 *
 * @param props - Component props extending HTMLDivElement attributes
 * @param props.children - Content to render inside the section
 * @param props.sectionClassName - CSS classes for the section element
 * @param props.className - CSS classes for the content container
 * @returns JSX section element with grid background and decorative elements
 *
 * @example
 * ```tsx
 * // Basic section
 * <Section>
 *   <h2>Section Title</h2>
 *   <p>Section content</p>
 * </Section>
 *
 * // With custom styling
 * <Section
 *   sectionClassName="py-16 bg-gray-50"
 *   className="text-center"
 * >
 *   <Hero />
 * </Section>
 *
 * // Multiple sections
 * <main>
 *   <Section sectionClassName="bg-white">
 *     <Introduction />
 *   </Section>
 *   <Section sectionClassName="bg-gray-100">
 *     <Features />
 *   </Section>
 *   <Section sectionClassName="bg-blue-50">
 *     <CallToAction />
 *   </Section>
 * </main>
 *
 * // With additional props
 * <Section
 *   id="about"
 *   sectionClassName="scroll-mt-16"
 *   className="space-y-8"
 * >
 *   <AboutContent />
 * </Section>
 * ```
 */
export const Section = ({ children, sectionClassName, className, ...props }: SectionProps) => (
  <section className={sectionClassName} {...props}>
    <div className="grid-container relative mx-auto">
      <GridBackground maxWidthClass="grid-container" />
      <div className={cn(className)}>{children}</div>
      <div className="absolute -bottom-3 -left-3 z-10 hidden h-6 sm:block">
        <Cross />
      </div>
      <div className="absolute -right-3 -bottom-3 z-10 hidden h-6 -translate-x-px sm:block">
        <Cross />
      </div>
    </div>
  </section>
);
