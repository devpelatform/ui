# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Pelatform UI**, a monorepo containing React UI library packages. The project uses Bun as the package manager, Turborepo for monorepo orchestration, Biome for linting/formatting, and Changesets for version management.

## Essential Commands

### Development

```bash
bun dev                    # Run all packages in watch mode
bun build                  # Build all packages
bun types:check            # Type-check all packages
```

### Code Quality

```bash
bun lint:format            # Lint and format with Biome (combines lint + format)
bun lint                   # Lint only (with --write)
bun format                 # Format only (with --write)
```

### Cleanup

```bash
bun clean                  # Clean build artifacts
bun clean:all              # Full cleanup including node_modules, .turbo, bun.lock
```

### Package Management & Publishing

```bash
npx changeset              # Create a changeset for version management
bun run version            # Update package versions based on changesets
bun run release            # Build and publish packages to npm (maintainers only)
```

## Architecture

### Monorepo Structure

```
ui/
├── packages/
│   ├── core/
│   │   ├── general/       # @pelatformui/general - Core utilities and types
│   │   ├── hook/          # @pelatformui/hook - React hooks collection
│   │   └── tsconfig/      # @repo/tsconfig - Shared TypeScript configs
│   └── main/              # Reserved for future main UI components
├── apps/                  # Reserved for example applications
```

### Package System

**@pelatformui/general** (`packages/core/general/`)

- Core utilities library with analytics, assets, colors, IP, parsing, and general utils
- Exports class-variance-authority (cva) and VariantProps
- Component types and menu types
- Dependencies: class-variance-authority, clsx, tailwind-merge

**@pelatformui/hook** (`packages/core/hook/`)

- React hooks collection including:
  - Analytics, body class, clipboard, file upload
  - Media queries, menu, mobile detection, mounted state
  - Mutation observer, reCAPTCHA v2, scroll position
  - Slider input, viewport tracking, GA params removal

**@repo/tsconfig** (`packages/core/tsconfig/`)

- Shared TypeScript configurations:
  - `base.json`: Base config with strict mode, ES2022
  - `library.json`: React library config (extends base)
  - `nextjs.json`: Next.js specific config (extends base)

### Build System

- **Bundler**: tsup (ESM only, targets ES2022)
- **TypeScript**: Module resolution is "bundler", strict mode enabled
- **Format**: All packages export ESM format with TypeScript declarations
- **External Dependencies**: React is externalized in builds

### Code Style (Biome)

- **Indentation**: 2 spaces
- **Line Width**: 100 characters
- **Quotes**: Single quotes (JavaScript), double quotes acceptable in other contexts
- **Semicolons**: Always required
- **Trailing Commas**: All
- **Arrow Parens**: Always
- **Import Organization**: Automatic with specific group ordering:
  1. Node/Bun/URL imports
  2. React and Next.js
  3. External packages
  4. @pelatform/**, @pelatformui/**, @repo/\*\* packages
  5. Aliases and relative paths

### Conventional Commits

Follow the conventional commit format:

```
type(scope): description

Types: feat, fix, docs, refactor, test, chore
Scopes: Package names (email, storage, utils, general, hook)
```

Examples:

- `feat(hook): add use-local-storage hook`
- `fix(general): resolve color parsing issue`
- `docs(general): update utility function documentation`

## Package Development

### Adding a New Package

1. Create directory in `packages/core/` or `packages/main/`
2. Set up with standard structure:
   - `src/index.ts` - Main exports
   - `package.json` - Package metadata with workspace references
   - `tsconfig.json` - Extends `@repo/tsconfig/library.json`
   - `tsup.config.ts` - Build configuration (see existing packages)
3. Package naming: Use `@pelatformui/*` for public packages, `@repo/*` for internal

### Working on Individual Packages

```bash
cd packages/core/general
bun dev              # Watch mode with tsup
bun build            # Build package
bun types:check      # Type-check only
```

### Export Patterns

Each package's `src/index.ts` should clearly organize exports:

```typescript
// Re-exports from dependencies (if any)
export { ... } from '...'

// Library exports
export * from './lib/...'

// Type exports
export * from './types/...'
```

## Workspace Protocol

This monorepo uses workspace protocol for internal dependencies. In package.json:

```json
"devDependencies": {
  "@repo/tsconfig": "workspace:*"
}
```

## Publishing Workflow (Changesets)

1. Make changes to packages
2. Run `npx changeset` and select affected packages
3. Commit the changeset file along with your changes
4. On merge to main, changesets will create a version PR
5. When version PR is merged, packages are automatically published

Configuration: `.changeset/config.json` - Uses main branch, public access, patches internal dependencies

## Important Notes

- **Package Manager**: Must use Bun 1.3.3+ (defined in packageManager field)
- **Node Version**: Requires Node.js 20+
- **Biome**: Used exclusively for linting and formatting (no ESLint/Prettier)
- **Turbo**: Caches builds, runs tasks in dependency order
- **React Version**: Uses React 19.2.0
- **TypeScript**: Version 5.9.3, strict mode enforced
