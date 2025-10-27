/**
 * Blank Layout Component
 * Provides a minimal full-screen layout with a subtle background grid,
 * optional header logo using a custom Link, and optional footer.
 */

'use client';

import type { ReactNode } from 'react';

import { cn } from '../../lib/utils';
import type { BaseProps } from '../../types/components';
import { Grid } from './grid';

/**
 * Props interface for the `LayoutBlank` component
 * Inherits `children` and `className` from `BaseProps`, and `Link` from `SharedLink`.
 */
export interface LayoutBlankProps extends BaseProps {
  /** Optional footer content displayed at the bottom */
  footer?: ReactNode;
  /** Optional logo element displayed at the top */
  logo?: ReactNode;
  /** Destination URL for the logo link */
  logoHref?: string;
}

/**
 * LayoutBlank Component
 *
 * A minimal full-screen layout with a subtle background grid and configurable
 * header logo and footer content. Useful for simple landing or blank pages.
 *
 * @param props - Component props
 * @returns JSX element containing the blank layout
 *
 * @example
 * ```tsx
 * <LayoutBlank logo={<Logo />} logoHref="/">
 *   <Content />
 * </LayoutBlank>
 * ```
 */
export function LayoutBlank({ children, footer, className, logo, logoHref }: LayoutBlankProps) {
  return (
    <>
      <div className="absolute inset-0 isolate overflow-hidden bg-background">
        {/* Grid */}
        <div
          className={cn(
            '-translate-x-1/2 absolute inset-y-0 start-1/2 w-[1200px]',
            'mask-intersect mask-[linear-gradient(black,transparent_320px),linear-gradient(90deg,transparent,black_5%,black_95%,transparent)]',
          )}
        >
          <Grid cellSize={60} patternOffset={[0.75, 0]} className="text-foreground/15" />
        </div>
      </div>

      <div
        className={cn(
          'relative flex min-h-screen w-full flex-col items-center justify-between',
          className,
        )}
      >
        <div className="grow basis-0">
          {logo && (
            <div className="pt-4">
              <a href={logoHref ?? '#'} target="_blank" className="block">
                {logo}
              </a>
            </div>
          )}
        </div>

        <div className="w-full max-w-4xl px-4 py-16">{children}</div>

        <div className="grow basis-0">{footer}</div>
      </div>
    </>
  );
}
