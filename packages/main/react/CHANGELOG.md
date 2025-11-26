# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2025-11-26

### Changed

- **Icons**: Moved icon components to @pelatformui/general for better reusability
  - Icons are now exported from `@pelatformui/general`
  - Still accessible via `@pelatformui/react` through re-export
  - No breaking changes - existing imports continue to work
  - Better package architecture and dependency management

### Removed

- Internal `src/components/ui/icons.tsx` file (moved to @pelatformui/general)

## [1.0.0] - 2025-11-26

### Added

#### Main Package Features

- Unified entry point for all Pelatform UI packages
- Multiple import paths for organized imports
- Comprehensive TypeScript support
- Tree-shakeable exports

#### Export Paths

- **Main exports** (`@pelatformui/react`) - Core utilities, types, and icons
- **Hooks** (`@pelatformui/react/hooks`) - 15 React hooks
- **Animation** (`@pelatformui/react/animation`) - 14 animation components
- **ARIA** (`@pelatformui/react/aria`) - 2 accessible components
- **Base** (`@pelatformui/react/base`) - 40+ headless components
- **Default** (`@pelatformui/react/default`) - 71 styled components
- **Components** (`@pelatformui/react/components`) - All custom components
- **CSS** (`@pelatformui/react/css`) - Complete stylesheet

#### Layout Components (10 components)

- Auth, Blank, Body, ComingSoon, Error, Grid, Section, SiteHeader, SiteFooter, Wrapper

#### Navigation Components (4 components)

- BackLink, CommandMenu, MainNav, MobileNav

#### Feedback Components (6 components)

- Alert (with Toast, Notification, Comingsoon variants), Dialog, ScreenLoader

#### UI Components (20+ components)

- Announcement (with Tag, Title sub-components)
- Background components (Paths, Dots, Grid patterns)
- Book, HexagonBadge, ImageInput
- LanguageSwitcher, Logo, ModeSwitcher
- MovingBorder, Subscribe, Toolbar, UserAvatar
- Icons collection

#### Provider Components (2 components)

- QueryProvider (TanStack Query integration)
- ThemeProvider (next-themes + TooltipProvider integration)

#### MDX Components (6 components)

- CodeDisplay, Download, Link, Video, Wrapper, YouTube

#### Utility Components (3 components)

- Fonts configuration
- RecaptchaPopover
- Shared utilities

#### Hooks (via @pelatformui/hook@0.1.1)

- 15 production-ready React hooks
- Includes new useHydrated hook for SSR-safe hydration detection

#### Animation Components (via @pelatformui/animation@0.1.0)

- 14 animation components including text effects, number counters, and backgrounds

#### ARIA Components (via @pelatformui/aria@0.1.0)

- DateField and ShowMore components with full WCAG compliance

#### Base Components (via @pelatformui/base@0.1.0)

- 40+ headless UI components with full accessibility

#### Default Components (via @pelatformui/default@0.1.0)

- 71 styled components including data tables, kanban, stepper, tree

#### Theme System

- Dark mode support via next-themes
- System theme detection
- Smooth theme transitions
- CSS custom properties for theming

#### Styling System

- Tailwind CSS 4.1.17 integration
- Custom theme configuration
- Component-specific stylesheets
- Animation utilities
- Pattern backgrounds

#### Features

- Full TypeScript support
- SSR-safe implementations
- Tree-shakeable exports
- Next.js optimized
- TanStack Query integration
- Responsive design
- Accessibility (WCAG 2.1)
- 100+ total components
- Comprehensive documentation

#### Dependencies

- Added @pelatformui/animation (workspace)
- Added @pelatformui/aria (workspace)
- Added @pelatformui/base (workspace)
- Added @pelatformui/default (workspace)
- Added @pelatformui/general (workspace)
- Added @pelatformui/hook (workspace)
- Added @radix-ui/react-dialog (^1.1.15)
- Added @tanstack/react-query (^5.90.11)
- Added lucide-react (^0.554.0)
- Added motion (^12.23.24)
- Added next-themes (^0.4.6)
- Added radix-ui (^1.4.3)
- Added sonner (^2.0.7)
- Added tw-animate-css (^1.4.0)

#### CSS Exports

- Theme configuration (theme.css)
- Component styles (individual CSS files per component category)
- Animation utilities
- Pattern backgrounds
- Responsive utilities
