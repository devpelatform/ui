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
# Install the main package
npm install @pelatformui/react
# or
bun add @pelatformui/react
# or
pnpm add @pelatformui/react

# Peer dependencies (if not already installed)
npm install react react-dom tailwindcss
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
- Browse [open issues](https://github.com/devpelatform/ui/issues) or start a [discussion](https://github.com/devpelatform/ui/discussions)

**Development:**

```bash
bun install          # Install dependencies
bun dev              # Run in development mode
bun build            # Build all packages
bun types:check      # Type-check
bun lint:format      # Lint and format
```

## Security

If you discover a security vulnerability, please send an email to **pelatformdev@gmail.com**. All security vulnerabilities will be promptly addressed.

Do not report security issues through public GitHub issues.

## License

MIT License - see [LICENSE](./LICENSE) for details.

By contributing to Pelatform UI, you agree that your contributions will be licensed under the MIT License.

## Links

- [GitHub Repository](https://github.com/devpelatform/ui)
- [NPM Organization](https://www.npmjs.com/org/pelatformui)
- [Issues](https://github.com/devpelatform/ui/issues)
- [Discussions](https://github.com/devpelatform/ui/discussions)
