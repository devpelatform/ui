const fs = require('node:fs');
const path = require('node:path');

function generateRegistry() {
  const registryPath = path.join(__dirname, '../registry');
  const components = {};

  function readDirectory(dir, basePath = '') {
    const items = fs.readdirSync(dir);

    items.forEach((item) => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        readDirectory(fullPath, path.join(basePath, item));
      } else if (item.endsWith('.tsx') && item !== 'index.ts') {
        const relativePath = path.join(basePath, item.replace('.tsx', '')).replace(/\\/g, '/');
        components[relativePath] = `() => import('../registry/${relativePath}')`;
      }
    });
  }

  readDirectory(registryPath);

  // Generate TypeScript file
  const tsContent = `// Auto-generated file - do not edit manually
// Generated on: ${new Date().toISOString()}

// biome-ignore lint/suspicious/noExplicitAny: disable
export const registryComponents: Record<string, () => Promise<any>> = {
${Object.entries(components)
  .map(([key, value]) => `  '${key}': ${value},`)
  .join('\n')}
};
`;

  // Write to file
  fs.writeFileSync(path.join(__dirname, '../registry/index.ts'), tsContent);

  console.log('✅ Registry map generated successfully!');
  console.log(`📁 Found ${Object.keys(components).length} components`);
}

generateRegistry();
