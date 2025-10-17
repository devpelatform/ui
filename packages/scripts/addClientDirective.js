#!/usr/bin/env node

import fs from 'node:fs';

function addClientDirective(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const clientDirective = '"use client";\n';

  if (content.startsWith(clientDirective)) return;

  fs.writeFileSync(filePath, `${clientDirective}${content}`, 'utf8');
}

[
  'dist/animation.js',
  'dist/animation.cjs',
  'dist/aria.js',
  'dist/aria.cjs',
  'dist/base.js',
  'dist/base.cjs',
  'dist/components.js',
  'dist/components.cjs',
  'dist/default.js',
  'dist/default.cjs',
  'dist/hooks.js',
  'dist/hooks.cjs',
].forEach(addClientDirective);

process.exit(0);
