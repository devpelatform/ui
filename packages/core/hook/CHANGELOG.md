# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-11-26

### Added

#### Analytics & Tracking Hooks

- **useAnalytics**: CRUD operation tracking with Google Analytics integration
  - Track create, update, and delete operations
  - Comprehensive module and submodule type system covering 11 domains
  - Automatic timestamp and event categorization
  - Support for hard and soft delete tracking

#### Responsive Design Hooks

- **useMediaQuery**: CSS media query tracking in real-time

  - SSR-safe implementation with automatic updates
  - Support for all CSS media queries
  - Proper event listener cleanup

- **useIsMobile**: Mobile viewport detection with customizable breakpoint

  - Default breakpoint at 1024px
  - SSR-safe with hydration mismatch prevention
  - Uses both matchMedia and window.innerWidth

- **useViewport**: Real-time viewport dimension tracking
  - Returns [height, width] tuple
  - Automatic updates on window resize
  - Passive event listeners for performance
  - SSR-safe initialization

#### Form & Input Management Hooks

- **useFileUpload**: Comprehensive file upload with drag & drop support

  - Single and multiple file upload
  - File validation (size, type, count)
  - Preview generation for images
  - Duplicate file detection
  - Complete drag & drop integration
  - Memory cleanup with object URL revocation

- **useSliderInput**: Dual slider input management with synchronized state

  - Synchronized slider and number input values
  - Boundary validation and range prevention
  - Performance optimized with useCallback

- **useCopyToClipboard**: Clipboard functionality with state management
  - Browser compatibility checks
  - Auto-reset copied state after timeout
  - Optional callback on successful copy
  - Error handling and warnings

#### Navigation & Scrolling Hooks

- **useMenu**: Menu navigation state management

  - Active state detection for items and paths
  - Breadcrumb generation
  - Nested menu structure support
  - Child menu extraction at specific levels
  - Root path matching with exact match for '/'

- **useScrollPosition**: Scroll position tracking
  - Support for window and element scrolling
  - Passive event listeners for performance
  - SSR-safe implementation
  - Handles both window.scrollY and element.scrollTop

#### DOM Management Hooks

- **useBodyClasses**: Dynamic body class management

  - Add/remove CSS classes from document body
  - Handles multi-line class strings
  - Automatic cleanup on component unmount

- **useMutationObserver**: DOM mutation observation
  - Automatic observer lifecycle management
  - Configurable observation options
  - Default options observe all mutation types
  - Proper cleanup on unmount

#### Security Hooks

- **useRecaptchaV2**: Google reCAPTCHA v2 integration
  - Automatic script loading (loads only once)
  - Widget management and rendering
  - Token retrieval and validation
  - Reset functionality
  - Error handling and recovery
  - Prevents multiple simultaneous initializations

#### Utility Hooks

- **useMounted**: Client-side mount detection

  - Essential for SSR applications
  - Prevents hydration mismatches
  - Used with client-only components

- **useRemoveGAParams**: Google Analytics parameter cleanup
  - Removes `_gl` parameter from URL after GA initialization
  - Uses history.replaceState (no page reload)
  - Handles cross-domain linker attribution
  - Automatic 2-second delay for GA processing

#### Features

- Full TypeScript support with comprehensive type definitions
- SSR-safe implementations for all applicable hooks
- Automatic cleanup and memory management
- Performance optimized with passive listeners and memoization
- Zero runtime dependencies
- Extensive validation and error handling
- Browser API compatibility checks
- Tree-shakeable (zero side effects)
