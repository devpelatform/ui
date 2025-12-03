# pelatform-ui

A Modern and Minimal React UI Library built with TailwindCSS. The main package that provides access to all Pelatform UI components, hooks, and utilities through a unified interface.

## Installation

```bash
bun add pelatform-ui
```

### Peer Dependencies

Make sure you have these installed:

```bash
bun add react react-dom @tanstack/react-query lucide-react motion next-themes sonner
```

### Import Styles

```typescript
import "pelatform-ui/css";
```

## Package Structure

pelatform-ui is the main entry point that consolidates all Pelatform UI packages:

- **@@pelatform/ui.general** - Core utilities and types
- **@@pelatform/ui.hook** - React hooks (15 hooks)
- **@@pelatform/ui.animation** - Animation components (14 components)
- **@@pelatform/ui.aria** - Accessible ARIA components (2 components)
- **@@pelatform/ui.base** - Base headless components (40+ components)
- **@@pelatform/ui.default** - Styled default components (71 components)

Plus additional ready-to-use components for layouts, navigation, and UI elements.

## Import Paths

```typescript
// Main exports (utilities, types, icons)
import { cn, cva, googleTrackEvent } from "pelatform-ui";

// Hooks
import { useHydrated, useMobile, useMediaQuery } from "pelatform-ui/hooks";

// Animation components
import {
  ShimmeringText,
  CountingNumber,
  Marquee,
} from "pelatform-ui/animation";

// ARIA components
import { DateField, ShowMore } from "pelatform-ui/aria";

// Base components
import { Button, Input, Select } from "pelatform-ui/base";

// Default styled components
import { Card, DataGrid, Kanban } from "pelatform-ui/default";

// All components (base + default + custom)
import { SiteHeader, SiteFooter, CommandMenu } from "pelatform-ui/components";

// Styles
import "pelatform-ui/css";
```

## Quick Start

```typescript
import { Button, Card, Input } from "pelatform-ui/default";
import { useHydrated } from "pelatform-ui/hooks";
import "pelatform-ui/css";

function App() {
  const hydrated = useHydrated();

  if (!hydrated) return null;

  return (
    <Card>
      <Input placeholder="Enter text" />
      <Button>Submit</Button>
    </Card>
  );
}
```

## Components

### Layout Components

- **Auth** - Authentication page layout
- **Blank** - Minimal blank layout
- **Body** - Main content body
- **ComingSoon** - Coming soon page
- **Error** - Error page layout
- **Grid** - Grid-based layout
- **Section** - Content section
- **SiteHeader** - Sticky header with blur
- **SiteFooter** - Site footer
- **Wrapper** - Container wrapper

### Navigation Components

- **BackLink** - Back navigation link
- **CommandMenu** - Command palette
- **MainNav** - Main navigation menu
- **MobileNav** - Mobile navigation

### Feedback Components

- **Alert** - Alert notifications
- **AlertToast** - Toast notifications
- **AlertNotification** - Notification alerts
- **AlertComingsoon** - Coming soon alert
- **Dialog** - Modal dialog
- **ScreenLoader** - Loading screen

### UI Components

- **Announcement** - Announcement banner with tags
- **BackgroundPaths** - Decorative backgrounds
- **Book** - Book/document display
- **DotsPattern** - Dot pattern background
- **GridBackground** - Grid pattern background
- **HexagonBadge** - Hexagon-shaped badge
- **Icons** - Icon components
- **ImageInput** - Image upload input
- **LanguageSwitcher** - Language selector
- **Logo** - Brand logo
- **ModeSwitcher** - Theme mode toggle
- **MovingBorder** - Animated border effect
- **Subscribe** - Email subscription
- **Toolbar** - Toolbar component
- **UserAvatar** - User avatar display

### Provider Components

- **QueryProvider** - TanStack Query provider
- **ThemeProvider** - Theme management (next-themes + tooltip)

### MDX Components

- **CodeDisplay** - Code snippet display
- **Download** - Download link
- **Link** - Custom link
- **Video** - Video embed
- **Wrapper** - MDX content wrapper
- **YouTube** - YouTube embed

### Utility Components

- **Fonts** - Font configuration
- **RecaptchaPopover** - reCAPTCHA integration
- **Shared** - Shared utilities

## Theme Management

```typescript
import { ThemeProvider } from "pelatform-ui/components";

function App({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
```

## Hooks

15 production-ready hooks for common use cases:

- **useAnalytics** - CRUD operation tracking
- **useBodyClass** - Body class management
- **useCopyToClipboard** - Clipboard operations
- **useFileUpload** - File upload with drag & drop
- **useHydrated** - SSR-safe hydration detection
- **useMediaQuery** - Media query tracking
- **useMenu** - Menu navigation state
- **useMobile** - Mobile detection
- **useMounted** - Mount state detection
- **useMutationObserver** - DOM mutation observation
- **useRecaptchaV2** - reCAPTCHA integration
- **useRemoveGAParams** - GA parameter cleanup
- **useScrollPosition** - Scroll tracking
- **useSliderInput** - Slider input management
- **useViewport** - Viewport dimensions

## Styling

The package uses Tailwind CSS with custom theme configuration. Import the CSS in your app:

```typescript
import "pelatform-ui/css";
```

CSS includes:

- Theme variables
- Component styles
- Animation utilities
- Pattern backgrounds
- Custom transitions

## TypeScript Support

Full TypeScript support with comprehensive type definitions for all components and hooks.

## Features

- 100+ total components across all packages
- 15 React hooks for common use cases
- Full dark mode support
- Responsive design
- Accessibility (WCAG 2.1)
- SSR-safe implementations
- Tree-shakeable exports
- TanStack Query integration
- Next.js optimized
- Tailwind CSS styling

## Dependencies

### Production Dependencies

- `@radix-ui/react-dialog`
- `radix-ui`
- `tw-animate-css`

### Peer Dependencies

- `react`
- `react-dom`
- `@tanstack/react-query`
- `lucide-react`
- `motion`
- `next-themes`
- `sonner`

## Links

- [npm Package](https://www.npmjs.com/package/pelatform-ui)
- [Contributing Guide](../../../CONTRIBUTING.md)
- [Code of Conduct](../../../CODE_OF_CONDUCT.md)
- [License](../../../LICENSE)

## License

MIT © [Pelatform Inc.](../../../LICENSE)
