import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';

import { Logo } from '@pelatform/ui/components';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      themeSwitch={{
        mode: 'light-dark',
      }}
      links={[]}
      githubUrl="https://github.com/devpelatform/ui"
      nav={{
        title: (
          <div className="flex flex-row items-center gap-2">
            <Logo className="size-5.5" />
            <span className="font-semibold text-mono">Pelatform UI</span>
          </div>
        ),
      }}
      tabMode="navbar"
    >
      {children}
    </DocsLayout>
  );
}
