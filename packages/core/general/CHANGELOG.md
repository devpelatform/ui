# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0](https://github.com/devpelatform/ui/compare/general-v0.1.1...general-v0.2.0) (2025-11-26)


### 🚀 Features

* initial monorepo setup with core packages ([bf577e5](https://github.com/devpelatform/ui/commit/bf577e5905e3da66dd3ee28aeabb0330019c4222))


### ♻️ Code Refactoring

* **icons:** move brand icons to @pelatformui/general ([9f9cc03](https://github.com/devpelatform/ui/commit/9f9cc031ea505a815db569cf3011217b110b975d))

## [0.1.1] - 2025-11-26

### Added

#### Components

- **Icons**: Brand icon collection moved from @pelatformui/react
  - 48 SVG brand icons for popular services and technologies
  - Includes: Anthropic, Apple, Discord, Facebook, GitHub, Google, LinkedIn, Microsoft, Next.js, OpenAI, React, and more
  - Colorful variants available for some brands (Google, Facebook, LinkedIn)
  - Optimized SVG with currentColor support for theming
  - Accessible via `@pelatformui/general` export

### Changed

- Removed `@types/node` from devDependencies (no longer needed)

## [0.1.0] - 2025-11-26

### Added

#### Utilities

- **Analytics**: Google Analytics event tracking utility with validation and error handling

  - `googleTrackEvent()` function for tracking custom events
  - Support for event properties and GA4-compliant event structure
  - Browser environment detection and error handling

- **Assets**: CDN URL generation utilities for Pelatform assets

  - `getAssetsUrl()` function for building full CDN URLs
  - `getFlagUrl()` function for country flag SVG URLs with ISO 3166-1 alpha-2 support

- **Theme Configuration**: Theme mode management and meta theme colors

  - `THEME_MODES` constant for available theme modes (light, dark, system)
  - `META_THEME_COLORS` constant for theme-to-color mapping
  - `DEFAULT_THEME_MODE` constant set to 'system'
  - `ThemeMode` type for theme mode unions

- **IP Detection**: Client IP address retrieval with multiple fallback providers

  - `getIPAddress()` async function with three fallback services
  - SSR-safe implementation with graceful error handling
  - Support for ipify.org, ipapi.co, and ip.sb providers

- **URL Parsing**: Next.js request parsing and normalization utilities

  - `parse()` function for extracting domain, path, and search parameters
  - `normalizePath()` function for pathname normalization
  - International character support via URI decoding
  - Domain normalization (www removal, lowercasing)

- **Class Merging**: Tailwind CSS class name merging utility
  - `cn()` function combining clsx and tailwind-merge
  - Automatic conflict resolution for Tailwind classes
  - Support for conditional class application

#### Type Definitions

- **Component Types**: Standard interfaces for component patterns

  - `BaseComponentProps` interface with children and className
  - `ImageComponent` type for standardized image components
  - `LinkComponent` type for standardized link components

- **Menu Types**: Comprehensive menu configuration types
  - `MenuItem` interface with support for:
    - Display properties (heading, title, icon)
    - Navigation (path, external links)
    - Hierarchy (children, nesting, root path)
    - Styling (separator, collapse behavior)
    - State (disabled, disabled text)
    - Badge (text, variant)
  - `MenuConfig` type alias for menu arrays

#### Re-exports

- Re-exported `cva` and `VariantProps` from class-variance-authority for component variant patterns

#### Dependencies

- Added class-variance-authority (^0.7.1) for component variants
- Added clsx (^2.1.1) for conditional class names
- Added tailwind-merge (^3.4.0) for Tailwind CSS class conflict resolution
