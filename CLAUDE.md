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
bun run lint               # Run Biome check and package lint tasks
bun run lint:fix           # Fix lint issues (Biome + turbo fix)
bun run format             # Format with Biome
bun run format:check       # Format check (Biome)
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
│   │   ├── general/       # @pelatform/ui.general - Core utilities and types
│   │   └── hook/          # @pelatform/ui.hook - React hooks (15 hooks)
│   ├── components/
│   │   ├── animation/     # @pelatform/ui.animation - Animation components
│   │   ├── aria/          # @pelatform/ui.aria - Accessible ARIA components
│   │   ├── base/          # @pelatform/ui.base - Headless base components
│   │   └── default/       # @pelatform/ui.default - Styled default components
│   └── main/              # pelatform-ui - Main entry point package
├── apps/                  # Reserved for example applications
```

### Package System

**@pelatform/ui.general** (`packages/core/general/`)

- Core utilities library with analytics, assets, colors, IP, parsing, and general utils
- Exports class-variance-authority (cva) and VariantProps
- Component types and menu types
- Dependencies: class-variance-authority, clsx, tailwind-merge

**@pelatform/ui.hook** (`packages/core/hook/`)

- 15 React hooks collection including:
  - Analytics, body class, clipboard, file upload
  - Hydration detection (useHydrated), media queries, menu
  - Mobile detection, mounted state, mutation observer
  - reCAPTCHA v2, scroll position, slider input
  - Viewport tracking, GA params removal

Shared TypeScript configurations provided via external `@pelatform/tsconfig`.

**@pelatform/ui.animation** (`packages/components/animation/`)

- 14 animation components for text effects and transitions:
  - Text animations: ShimmeringText, TextReveal, TypingText, GradientText
  - Number animations: CountingNumber, AnimatedNumber
  - Layout animations: Marquee, InfiniteSlider
  - Background effects: AnimatedGridPattern, ParticlesBackground, etc.
- Exports CSS via `./css` entry point

**@pelatform/ui.aria** (`packages/components/aria/`)

- 2 accessible ARIA components with WCAG 2.1 compliance:
  - DateField: Accessible date input field
  - ShowMore: Expandable content with keyboard navigation
- Exports CSS via `./css` entry point

**@pelatform/ui.base** (`packages/components/base/`)

- 40+ headless base components with full accessibility:
  - Forms: Input, Textarea, Select, Checkbox, Radio, Switch, Slider
  - Selection: Combobox, Listbox, MultiSelect
  - Layout: Accordion, Tabs, Dialog, Popover, Tooltip
  - Data: Table, Pagination, Avatar, Badge
  - Buttons, Toasts, and more
- Radix UI foundation with custom styling hooks
- Exports CSS via `./css` entry point

**@pelatform/ui.default** (`packages/components/default/`)

- 71 styled default components across 8 categories:
  - Layout & Structure (10): Accordion, Card, Tabs, Sidebar, etc.
  - Navigation (7): Breadcrumb, Command, DropdownMenu, etc.
  - Forms (11): Input, Select, Checkbox, Form with validation, etc.
  - Data Display (12): Alert, Avatar, Badge, Calendar, etc.
  - Data Tables (9): DataGrid with sorting/filtering/pagination
  - Dialogs (7): Dialog, Sheet, Drawer, AlertDialog, etc.
  - Advanced (8): Carousel, Kanban, Stepper, Tree, etc.
  - Utilities (7): Button, ButtonGroup, Sonner toasts, etc.
- Full Radix UI + TanStack integration
- Exports CSS via `./css` entry point

**pelatform-ui** (`packages/main/`)

- Main entry point that aggregates all packages
- Organized import paths:
  - `pelatform-ui` - Core utilities, types, icons
  - `pelatform-ui/hooks` - Hooks
  - `pelatform-ui/animation` - Animation components
  - `pelatform-ui/aria` - ARIA components
  - `pelatform-ui/base` - Headless components
  - `pelatform-ui/default` - Styled components
  - `pelatform-ui/components` - Custom components (layouts, navigation, etc.)
  - `pelatform-ui/css` - Complete stylesheet
- Includes `llms.txt` for AI assistant integration

### Build System

- **Bundler**: tsup (ESM only, targets ES2022)
- **TypeScript**: Module resolution is "bundler", strict mode enabled
- **Format**: All packages export ESM format with TypeScript declarations
- **External Dependencies**: React is externalized in builds
- **CSS Handling**: Component packages with CSS use build scripts that copy `src/style.css` to `dist/style.css` after tsup build
- **Peer Dependencies**: Component packages use peerDependencies to avoid bundling shared libraries (React, Radix UI, motion, etc.)

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
Scopes: Package names (ui.general, ui.hook, ui.animation, ui.aria, ui.base, ui.default, main)
```

Examples:

- `feat(hook): add useHydrated hook for SSR-safe hydration`
- `feat(animation): add new text reveal component`
- `fix(base): resolve button component accessibility issue`
- `docs(default): update data grid documentation`
- `refactor(react): simplify import paths`
- `chore(general): update dependencies`

## Package Development

### Adding a New Package

1. Create directory in `packages/core/`, `packages/components/`, or `packages/main/`
2. Set up with standard structure:
   - `src/index.ts` - Main exports
   - `package.json` - Package metadata with workspace references
   - `tsconfig.json` - Extends `@repo/tsconfig/react-library.json`
   - `tsup.config.ts` - Build configuration (see existing packages for standard config)
   - `README.md` - Package documentation
   - `CHANGELOG.md` - Version history
3. Package naming: Use `@pelatformui/*` for public packages, `@repo/*` for internal
4. For component packages with CSS:
   - Add `src/style.css` file
   - Configure `./css` export in package.json exports field
   - Update build script to copy CSS: `"build": "tsup && cp src/style.css dist/style.css"`
5. Configure peer dependencies for shared libraries to avoid bundling duplication

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
  "@pelatform/tsconfig": "workspace:*"
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
- **Node Version**: Requires Node.js 22+
- **Biome**: Used exclusively for linting and formatting (no ESLint/Prettier)
- **Turbo**: Caches builds, runs tasks in dependency order
- **React Version**: Uses React 19.2.0
- **TypeScript**: Version 5.9.3, strict mode enforced
- **Git Hooks**: Husky is configured (`bun prepare` installs hooks automatically)
