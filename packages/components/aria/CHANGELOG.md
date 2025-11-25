# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-11-26

### Added

#### Components

- **DateField**: Accessible date input component with segment-based editing

  - Segment-based date editing (day, month, year)
  - Keyboard navigation support (arrow keys, tab, enter)
  - Multiple size variants (lg, md, sm)
  - Focus state styling with ring indicators
  - Error/invalid state styling with destructive colors
  - Readonly and disabled state support
  - Data slots for testing/styling hooks
  - Full ARIA labels and roles

- **TimeField**: Accessible time input component

  - Segment-based time editing (hour, minute, second, AM/PM)
  - Same features as DateField
  - 12/24 hour format support
  - Timezone support

- **DateSegment**: Individual date/time segment renderer

  - Editable text segments with placeholders
  - Focus-visible state styling
  - Readonly state with reduced opacity
  - Type-specific formatting (literal, day, month, year, hour, etc.)

- **DateInput**: Complete date input container

  - Renders collection of DateSegment components
  - Responsive sizing with CVA variants
  - Focus-within state management
  - Invalid state detection and styling
  - Disabled and readonly state propagation

- **ShowMore**: Toggle button for content expansion
  - Horizontal and vertical orientation support
  - Renders as button or text element
  - Decorative border dividers (CSS pseudo-elements)
  - Toggle state management with React Aria
  - Multiple button variants: primary, mono, destructive, secondary, outline, dashed, ghost, dim, foreground, inverse
  - Multiple modes: default, icon, link, input
  - Size variants: lg, md, sm, xs, icon
  - Compound variants for complex state combinations
  - Full accessibility with ARIA attributes

#### Styling System

- CVA (Class Variance Authority) based variant management
- Comprehensive button variant system with 150+ compound variants
- Input size variants: lg (h-10), md (h-9), sm (h-8)
- Focus states with 3px ring indicators and transparency
- Error states with destructive color palette
- Disabled states with reduced opacity
- Hover and active state styling
- Dark mode support via Tailwind dark: variants

#### Utilities

- `dateInputStyles`: CVA factory for DateInput styling
- Shared styling utilities from @pelatformui/general
  - `cn()`: Smart class name merger with Tailwind conflict resolution
  - `cva`: Class Variance Authority factory
  - `VariantProps<T>`: Type utility for variant props

#### Features

- Built on React Aria Components for WCAG 2.1 compliance
- Full keyboard navigation and focus management
- Screen reader support with proper ARIA attributes
- Internationalization support via @internationalized/date
- Responsive sizing across all components
- TypeScript support with comprehensive type definitions
- Client component directive for Next.js compatibility
- Zero side effects (tree-shakeable)

#### Dependencies

- Added react-aria-components (^1.13.0) for accessible component primitives
- Added @pelatformui/general (>=0.1.0) for styling utilities

#### CSS Export

- Added CSS export via `./css` entry point
- Style file: `dist/style.css`
- Import with `import '@pelatformui/aria/css'`
