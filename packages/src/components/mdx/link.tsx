'use client';

import type { ComponentProps } from 'react';

import { DefaultLink, type SharedLink } from '../../components';
import { cn } from '../../lib/utils';
import type { Link } from '../../types/components';

export function ExtraLink({
  Link = DefaultLink,
  href,
  target,
  className,
  children,
}: SharedLink & ComponentProps<Link>) {
  return (
    <Link
      href={href}
      target={target}
      className={cn('font-medium underline underline-offset-4', className)}
    >
      {children}
    </Link>
  );
}
