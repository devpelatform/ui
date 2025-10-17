import type { ComponentProps } from 'react';
import Link from 'next/link';

import { ExtraLink } from '@pelatform/ui/components';

export function CustomLink(props: ComponentProps<typeof ExtraLink>) {
  return <ExtraLink Link={Link} {...props} />;
}
