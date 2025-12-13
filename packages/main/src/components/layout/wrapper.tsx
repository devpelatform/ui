/**
 * MaxWidthWrapper Component
 * Provides a responsive container with maximum width constraints
 * Useful for creating consistent content layouts across different screen sizes
 */

"use client";

import type { BaseComponentProps } from "@pelatform/ui.general";
import { cn } from "@pelatform/utils";

/**
 * MaxWidthWrapper Component
 *
 * A responsive container component that constrains content to a maximum
 * width while providing consistent padding and centering. Ideal for
 * creating readable layouts that work well across different screen sizes.
 *
 * @param props - Component props
 * @param props.className - Additional CSS classes to merge
 * @param props.children - Content to render inside the wrapper
 * @returns JSX div element with max-width constraints and responsive padding
 *
 * @example
 * ```tsx
 * // Basic content wrapper
 * <MaxWidthWrapper>
 *   <h1>Page Title</h1>
 *   <p>Content that won't exceed the maximum width</p>
 * </MaxWidthWrapper>
 *
 * // With custom styling
 * <MaxWidthWrapper className="bg-gray-50 rounded-lg">
 *   <Article />
 * </MaxWidthWrapper>
 *
 * // Multiple sections
 * <main>
 *   <MaxWidthWrapper>
 *     <Header />
 *   </MaxWidthWrapper>
 *   <MaxWidthWrapper className="py-8">
 *     <MainContent />
 *   </MaxWidthWrapper>
 *   <MaxWidthWrapper>
 *     <Footer />
 *   </MaxWidthWrapper>
 * </main>
 *
 * // Nested with other layout components
 * <Section>
 *   <MaxWidthWrapper>
 *     <Grid>
 *       <Card>Content</Card>
 *     </Grid>
 *   </MaxWidthWrapper>
 * </Section>
 * ```
 */
export function MaxWidthWrapper({ className, children }: BaseComponentProps) {
  return <div className={cn("mx-auto w-full max-w-7xl p-3 lg:px-10", className)}>{children}</div>;
}
