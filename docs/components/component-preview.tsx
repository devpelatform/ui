import { registryComponents } from '../registry';
import { CodeBlock } from './code-block';
import { ComponentPreviewClient } from './preview-client';

interface ComponentPreviewProps {
  className?: string;
  hideCode?: boolean;
  path: string;
}

async function loadSourceCode(path: string): Promise<string> {
  try {
    // Use dynamic import to load the actual source code
    const fs = await import('node:fs');
    const pathModule = await import('node:path');

    // Construct the correct file path - we're already in docs folder
    const filePath = pathModule.join(process.cwd(), 'registry', `${path}.tsx`);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.warn(`Source file not found: ${filePath}`);
      return `// Source code not available for ${path}
// File not found: ${filePath}`;
    }

    // Read the file content
    const content = fs.readFileSync(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error(`Error loading source code for ${path}:`, error);
    return `// Error loading source code for ${path}
// ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

export async function ComponentPreview({ className, hideCode, path }: ComponentPreviewProps) {
  try {
    if (!registryComponents[path]) {
      return (
        <div className="flex items-center justify-center p-8">
          <div className="text-destructive text-sm">Component not found: {path}</div>
        </div>
      );
    }

    const componentModule = (await Promise.race([
      registryComponents[path](),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Component load timeout')), 5000),
      ),
      // biome-ignore lint/suspicious/noExplicitAny: disable
    ])) as any;

    const Component = componentModule.default;

    if (!Component) {
      return (
        <div className="flex items-center justify-center p-8">
          <div className="text-destructive text-sm">Component export not found: {path}</div>
        </div>
      );
    }

    // Load source code dynamically
    const sourceCode = await loadSourceCode(path);

    return (
      <ComponentPreviewClient
        className={className}
        hideCode={hideCode}
        component={<Component />}
        source={<CodeBlock code={sourceCode} lang="tsx" />}
      />
    );
  } catch (error) {
    console.error(`Error loading component from path: ${path}`, error);
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-destructive text-sm">Failed to load component: {path}</div>
        <div className="mt-2 text-muted-foreground text-xs">
          Error: {error instanceof Error ? error.message : 'Unknown error'}
        </div>
      </div>
    );
  }
}
