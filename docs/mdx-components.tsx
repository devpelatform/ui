import type { ComponentProps, FC } from 'react';
import { createGenerator } from 'fumadocs-typescript';
import { AutoTypeTable } from 'fumadocs-typescript/ui';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Banner } from 'fumadocs-ui/components/banner';
import { Callout } from 'fumadocs-ui/components/callout';
import { File, Files, Folder } from 'fumadocs-ui/components/files';
import { GithubInfo } from 'fumadocs-ui/components/github-info';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { TypeTable } from 'fumadocs-ui/components/type-table';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

import { CodeDisplay, DownloadFile, Video, Wrapper, Youtube } from '@pelatform/ui/components';
import { ComponentPreview } from '@/components/component-preview';
import { GithubCodeBlock } from '@/components/github-code-block';
import { CustomLink } from '@/components/link';

const generator = createGenerator();

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    // callout, card, codeblock, heading,
    ...defaultMdxComponents,

    // fumadocs-ui
    img: (props: ComponentProps<'img'>) => (
      // biome-ignore lint/suspicious/noExplicitAny: disable
      <ImageZoom className="my-0! rounded-xl bg-fd-background" {...(props as any)} />
    ),
    Accordion,
    Accordions,
    Banner,
    blockquote: Callout as unknown as FC<ComponentProps<'blockquote'>>,
    File,
    Folder,
    Files,
    GithubInfo,
    InlineTOC,
    Step,
    Steps,
    Tab,
    Tabs,
    TypeTable,
    AutoTypeTable: (props) => <AutoTypeTable {...props} generator={generator} />,

    // custom
    CodeDisplay,
    ComponentPreview,
    DownloadFile,
    GithubCodeBlock,
    ImageZoom,
    Link: CustomLink,
    Video,
    Wrapper,
    Youtube,

    ...components,
  };
}

export const useMDXComponents = getMDXComponents;
