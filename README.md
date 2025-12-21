# Pelatform UI

**A comprehensive React UI library for TypeScript.**

Pelatform UI provides 100+ accessible components, 15 React hooks, and a complete styling system—all with full TypeScript support. Built for modern web applications with React 19, Tailwind CSS, Radix UI, and TanStack.

## Why Pelatform UI?

Building UI in the React ecosystem often requires cobbling together multiple libraries and writing custom code for common patterns. Pelatform UI solves this by providing:

- **Complete Component Library**: 100+ production-ready components across animation, forms, data display, and more
- **Accessibility First**: WCAG 2.1 compliant components with keyboard navigation and screen reader support
- **Flexible Architecture**: Use headless base components or pre-styled defaults—your choice
- **Production Ready**: Built with TypeScript, tested patterns, and optimized for performance
- **Developer Experience**: Tree-shakeable imports, organized paths, and comprehensive documentation

## Installation

```bash
bun add pelatform-ui

# Peer dependencies (if not already installed)
bun add react react-dom
```

## Packages

This monorepo contains packages organized into three categories:

### Core Packages

- **[@pelatform/ui.general](./packages/core/general)** - Core utilities, types, and helpers
  - CVA (Class Variance Authority) integration
  - Color, analytics, and parsing utilities
  - Component and menu type definitions

- **[@pelatform/ui.hook](./packages/core/hook)** - 15 React hooks
  - `useHydrated`, `useMobile`, `useMediaQuery`, `useAnalytics`
  - `useCopyToClipboard`, `useFileUpload`, `useScrollPosition`
  - `useMutationObserver`, `useRecaptchaV2`, and more

- Shared TypeScript configurations via `@pelatform/tsconfig` (external package)
  - Base, library, and Next.js configs

### Component Packages

- **[@pelatform/ui.animation](./packages/components/animation)** - 14 animation components
  - Text effects: ShimmeringText, TextReveal, TypingText
  - Number animations: CountingNumber, AnimatedNumber
  - Layout effects: Marquee, InfiniteSlider
  - Background patterns and effects

- **[@pelatform/ui.aria](./packages/components/aria)** - ARIA components
  - DateField, ShowMore with WCAG 2.1 compliance

- **[@pelatform/ui.base](./packages/components/base)** - Headless components
  - Fully accessible, unstyled components built on Radix UI
  - Forms, dialogs, navigation, data display

- **[@pelatform/ui.default](./packages/components/default)** - Styled components
  - Pre-styled components with variants
  - DataGrid, Kanban, Stepper, Tree, Carousel
  - Complete form system with validation

### Main Package

- **[pelatform-ui](./packages/main)** - Main entry point
  - Aggregates all sub-packages with organized import paths
  - Provides additional custom components (SiteHeader, SiteFooter, ThemeProvider)
  - Exposes complete styling via `pelatform-ui/css`

## Package Documentation

Each package has comprehensive documentation with examples and API references:

- **Core**
  - [@pelatformui/general](./packages/core/general) - Core utilities, types, and helpers
  - [@pelatformui/hook](./packages/core/hook) - 15 React hooks for common use cases
  - [@repo/tsconfig](./packages/core/tsconfig) - Shared TypeScript configurations

- **Components**
  - [@pelatformui/animation](./packages/components/animation) - 14 animation components
  - [@pelatformui/aria](./packages/components/aria) - 2 WCAG 2.1 compliant ARIA components
  - [@pelatformui/base](./packages/components/base) - 40+ headless, accessible components
  - [@pelatformui/default](./packages/components/default) - 71 pre-styled components

- **Main**
  - [@pelatformui/react](./packages/main/react) - Unified package with all components and hooks

## Contributing

We welcome contributions! This project is community-driven and your help makes it better.

**Getting Started:**

- Read the [Contributing Guide](./CONTRIBUTING.md) for development setup and guidelines
- Check the [Code of Conduct](./CODE_OF_CONDUCT.md)
- Browse [open issues](https://github.com/pelatformlabs/ui/issues) or start a [discussion](https://github.com/pelatformlabs/ui/discussions)

**Development:**

```bash
bun install          # Install dependencies
bun dev              # Run in development mode
bun build            # Build all packages
bun types:check      # Type-check
bun run lint         # Lint (Biome + turbo lint)
bun run format       # Format (Biome)
bun run lint:fix     # Fix lint issues
```

## Security

If you discover a security vulnerability, please send an email to **pelatformdev@gmail.com**. All security vulnerabilities will be promptly addressed.

Do not report security issues through public GitHub issues.

## Links

- [GitHub Repository](https://github.com/pelatformlabs/ui)
- [NPM Organization](https://www.npmjs.com/org/pelatformui)
- [Issues](https://github.com/pelatformlabs/ui/issues)
- [Discussions](https://github.com/pelatformlabs/ui/discussions)

## License

MIT License - see [LICENSE](./LICENSE) for details.

By contributing to Pelatform UI, you agree that your contributions will be licensed under the MIT License.
