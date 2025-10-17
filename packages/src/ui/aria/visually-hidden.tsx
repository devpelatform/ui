'use client';

import type { ReactNode } from 'react';
import { useVisuallyHidden } from 'react-aria';

type VisuallyHiddenSpanProps = {
  children: ReactNode;
};

const VisuallyHidden = ({ children }: VisuallyHiddenSpanProps) => {
  const { visuallyHiddenProps } = useVisuallyHidden();

  return <span {...visuallyHiddenProps}>{children}</span>;
};

export { VisuallyHidden };
