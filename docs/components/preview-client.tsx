'use client';

import type { ReactNode } from 'react';

import { cn } from '@pelatform/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@pelatform/ui/default';

interface ComponentPreviewProps {
  className?: string;
  hideCode?: boolean;
  component: ReactNode;
  source: ReactNode;
}

export function ComponentPreviewClient({
  className,
  hideCode = false,
  component,
  source,
}: ComponentPreviewProps) {
  if (!component) {
    return <p className="text-muted-foreground text-sm">Component not found.</p>;
  }

  return (
    <ComponentPreviewTabs
      className={className}
      hideCode={hideCode}
      component={component}
      source={source}
    />
  );
}

function ComponentPreviewTabs({
  className,
  hideCode = false,
  component,
  source,
}: ComponentPreviewProps) {
  if (hideCode) {
    return (
      <div
        className={cn(
          'preview flex h-[450px] w-full items-center justify-center overflow-y-auto p-10',
          className,
        )}
      >
        {component}
      </div>
    );
  }

  return (
    <Tabs defaultValue="preview" className={cn(className)}>
      <TabsList className="bg-transparent">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent
        value="preview"
        className="not-prose flex grow items-center justify-center rounded-xl border border-border/90 p-6 shadow-sm lg:min-h-[350px] lg:p-10"
      >
        {component}
      </TabsContent>
      <TabsContent value="code" className="w-full">
        {source}
      </TabsContent>
    </Tabs>
  );
}
