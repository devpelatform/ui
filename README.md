# Pelatform UI

A modern and minimal React UI library built with TailwindCSS. Comprehensive component library with 100+ components, 15 React hooks, and full TypeScript support.

## Features

- **100+ Components**: Complete UI component library across multiple packages
- **15 React Hooks**: Production-ready hooks for common use cases
- **TypeScript First**: Full type safety with comprehensive type definitions
- **Accessible**: WCAG 2.1 compliant components with keyboard navigation
- **Dark Mode**: Built-in theme support with next-themes integration
- **SSR-Safe**: Next.js compatible with proper hydration handling
- **Tree-Shakeable**: Import only what you need for optimal bundle size
- **Modern Stack**: Built with React 19, Tailwind CSS, Radix UI, and TanStack

## Installation

```bash
# Install the main package
bun add @pelatformui/react

# Or install individual packages
bun add @pelatformui/general @pelatformui/hook
bun add @pelatformui/animation @pelatformui/aria @pelatformui/base @pelatformui/default
```

### Peer Dependencies

```bash
bun add react react-dom tailwindcss
```

## Packages

This monorepo contains 7 packages organized into three categories:

### Core Packages

- **[@pelatformui/general](./packages/core/general)** - Core utilities, types, and helpers

  - CVA (Class Variance Authority) integration
  - Color, analytics, and parsing utilities
  - Component and menu type definitions

- **[@pelatformui/hook](./packages/core/hook)** - 15 React hooks

  - `useHydrated`, `useMobile`, `useMediaQuery`, `useAnalytics`
  - `useCopyToClipboard`, `useFileUpload`, `useScrollPosition`
  - `useMutationObserver`, `useRecaptchaV2`, and more

- **[@repo/tsconfig](./packages/core/tsconfig)** - Shared TypeScript configurations
  - Base, library, and Next.js configs

### Component Packages

- **[@pelatformui/animation](./packages/components/animation)** - 14 animation components

  - Text effects: ShimmeringText, TextReveal, TypingText
  - Number animations: CountingNumber, AnimatedNumber
  - Layout effects: Marquee, InfiniteSlider
  - Background patterns and effects

- **[@pelatformui/aria](./packages/components/aria)** - 2 ARIA components

  - DateField, ShowMore with WCAG 2.1 compliance

- **[@pelatformui/base](./packages/components/base)** - 40+ headless components

  - Fully accessible, unstyled components built on Radix UI
  - Forms, dialogs, navigation, data display

- **[@pelatformui/default](./packages/components/default)** - 71 styled components
  - Pre-styled components with variants
  - DataGrid, Kanban, Stepper, Tree, Carousel
  - Complete form system with validation

### Main Package

- **[@pelatformui/react](./packages/main/react)** - Main entry point
  - Aggregates all packages with organized import paths
  - Additional custom components (SiteHeader, SiteFooter, ThemeProvider)
  - Complete styling system

## Quick Start

```typescript
import { Button, Card, Input } from "@pelatformui/react/default";
import { useHydrated } from "@pelatformui/react/hooks";
import "@pelatformui/react/css";

function App() {
  const hydrated = useHydrated();

  if (!hydrated) return null;

  return (
    <Card>
      <h1>Welcome to Pelatform UI</h1>
      <Input placeholder="Enter your email" />
      <Button>Get Started</Button>
    </Card>
  );
}
```

### With Theme Provider

```typescript
import { ThemeProvider } from "@pelatformui/react/components";
import "@pelatformui/react/css";

function App({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
```

## Import Paths

The main `@pelatformui/react` package provides multiple import paths:

```typescript
// Core utilities and types
import { cn, cva, googleTrackEvent } from "@pelatformui/react";

// Hooks
import { useHydrated, useMobile } from "@pelatformui/react/hooks";

// Animation components
import { ShimmeringText, Marquee } from "@pelatformui/react/animation";

// ARIA components
import { DateField } from "@pelatformui/react/aria";

// Headless base components
import { Button, Input } from "@pelatformui/react/base";

// Styled default components
import { Card, DataGrid } from "@pelatformui/react/default";

// Custom components
import { SiteHeader, ThemeProvider } from "@pelatformui/react/components";

// Styles
import "@pelatformui/react/css";
```

## Documentation

Each package has its own README with detailed documentation:

- [General Package](./packages/core/general/README.md)
- [Hook Package](./packages/core/hook/README.md)
- [Animation Package](./packages/components/animation/README.md)
- [ARIA Package](./packages/components/aria/README.md)
- [Base Package](./packages/components/base/README.md)
- [Default Package](./packages/components/default/README.md)
- [React Package](./packages/main/react/README.md)

## Development

### Prerequisites

- [Bun](https://bun.sh) 1.3.3 or higher
- Node.js 20 or higher
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/devpelatform/ui.git
cd ui

# Install dependencies
bun install

# Run all packages in development mode
bun dev

# Build all packages
bun build

# Type-check all packages
bun types:check

# Lint and format code
bun lint:format
```

### Working on Individual Packages

```bash
cd packages/core/general
bun dev              # Watch mode
bun build            # Build package
bun types:check      # Type-check
```

## Contributing

We welcome contributions! Please read our [Contributing Guide](./CONTRIBUTING.md) for details on:

- Development workflow
- Code style guidelines
- Commit message conventions
- Pull request process

Please also read our [Code of Conduct](./CODE_OF_CONDUCT.md) before contributing.

## Tech Stack

- **Runtime**: Bun 1.3.3+
- **Framework**: React 19.2+
- **Language**: TypeScript 5.9+
- **Styling**: Tailwind CSS 4.1+
- **Animation**: Motion (Framer Motion)
- **Components**: Radix UI
- **Data Management**: TanStack React Query & React Table
- **Build Tool**: tsup
- **Monorepo**: Turborepo
- **Linting**: Biome
- **Version Management**: Changesets

## License

MIT � [Pelatform](https://github.com/devpelatform)

## Links

- [GitHub Repository](https://github.com/devpelatform/ui)
- [NPM Organization](https://www.npmjs.com/org/pelatformui)
- [Issues](https://github.com/devpelatform/ui/issues)
- [Discussions](https://github.com/devpelatform/ui/discussions)

---

Built with ❤️ by the Pelatform team
