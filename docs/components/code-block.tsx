import { highlight } from 'fumadocs-core/highlight';
// import { getHighlighter, highlight } from 'fumadocs-core/highlight';
import * as Base from 'fumadocs-ui/components/codeblock';

// import type { BundledLanguage } from 'shiki';

import { cn } from '@pelatform/ui';

export interface CodeBlockProps {
  code: string;
  wrapper?: Base.CodeBlockProps;
  lang: string;
}

// const highlighter = await getHighlighter('js', {
//   langs: ['js', 'ts', 'jsx', 'tsx'],
//   themes: ['vesper', 'github-light'],
// });

export async function CodeBlock({ code, lang, wrapper }: CodeBlockProps) {
  // await highlighter.loadLanguage(lang as BundledLanguage);
  // const hast = highlighter.codeToHast(code, {
  //   lang,
  //   defaultColor: false,
  //   themes: {
  //     light: 'github-light',
  //     dark: 'vesper',
  //   },
  // });

  const rendered = await highlight(code, {
    lang,
    defaultColor: false,
    themes: {
      light: 'catppuccin-latte',
      dark: 'catppuccin-mocha',
    },
  });

  return (
    <Base.CodeBlock {...wrapper} className={cn('my-0', wrapper?.className)}>
      {rendered}
    </Base.CodeBlock>
  );
}
