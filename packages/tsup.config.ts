import { preserveDirectivesPlugin } from 'esbuild-plugin-preserve-directives';
import { defineConfig } from 'tsup';

export default defineConfig(() => {
  return {
    external: ['react', 'react-dom'],
    entry: [
      './src/index.ts',
      './src/animation.ts',
      './src/aria.ts',
      './src/base.ts',
      './src/components.ts',
      './src/default.ts',
      './src/hooks.ts',
      './src/re-export/*.ts',
    ],
    format: ['esm', 'cjs'],
    splitting: true,
    cjsInterop: true,
    skipNodeModulesBundle: true,
    treeshake: false,
    metafile: true,
    esbuildPlugins: [
      preserveDirectivesPlugin({
        directives: ['use client', 'use strict'],
        include: /\.(js|ts|jsx|tsx)$/,
        exclude: /node_modules/,
      }),
    ],
    onSuccess: 'node scripts/addClientDirective.js',
  };
});
