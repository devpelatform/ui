# @pelatformui/general

Core utilities and type definitions for the Pelatform UI Library. This package provides essential utilities for analytics, asset management, theme configuration, networking, URL parsing, and CSS class management, along with TypeScript type definitions for common component patterns.

## Installation

```bash
# Using bun
bun add @pelatformui/general

# Using npm
npm install @pelatformui/general
```

## Features

### Utilities

#### Analytics

Google Analytics event tracking with validation and error handling.

```typescript
import { googleTrackEvent } from "@pelatformui/general";

googleTrackEvent({
  name: "button_click",
  properties: {
    button_id: "signup",
    page: "landing",
  },
});
```

#### Assets

Generate CDN URLs for Pelatform assets including media and country flags.

```typescript
import { getAssetsUrl, getFlagUrl } from "@pelatformui/general";

const imageUrl = getAssetsUrl("media/illustrations/29.svg");
const flagUrl = getFlagUrl("US"); // Returns SVG flag for United States
```

#### Theme Configuration

Manage theme modes and meta theme colors for light/dark mode support.

```typescript
import {
  THEME_MODES,
  META_THEME_COLORS,
  DEFAULT_THEME_MODE,
} from "@pelatformui/general";

// Available modes: 'light', 'dark', 'system'
const currentTheme = DEFAULT_THEME_MODE; // 'system'
const themeColor = META_THEME_COLORS[currentTheme];
```

#### IP Detection

Retrieve client IP addresses with multiple fallback providers for reliability.

```typescript
import { getIPAddress } from "@pelatformui/general";

const ipAddress = await getIPAddress();
console.log(ipAddress); // e.g., "203.0.113.42" or "unknown"
```

#### URL Parsing

Parse and normalize Next.js requests with domain and path extraction.

```typescript
import { parse, normalizePath } from "@pelatformui/general";

const parsed = parse(request);
// Returns: { domain, path, fullPath, key, fullKey, searchParamsObj, searchParamsString }

const normalized = normalizePath("//dashboard///users/");
// Returns: "/dashboard/users"
```

#### Class Name Merging

Optimized Tailwind CSS class merging with conflict resolution.

```typescript
import { cn } from "@pelatformui/general";

const className = cn(
  "px-2 py-1",
  "px-4", // Overrides px-2
  isError && "text-red-500",
  "hover:bg-gray-100"
);
```

### Components

#### Icons

Brand icon collection providing 48 SVG icons for popular services, technologies, and platforms.

```typescript
import { Icons } from "@pelatformui/general";

function MyComponent() {
  return (
    <div>
      <Icons.google className="w-6 h-6" />
      <Icons.github className="w-6 h-6 text-gray-900" />
      <Icons.googleColorful className="w-8 h-8" />
    </div>
  );
}
```

Available brand icons include:

- **Tech Companies**: Anthropic, Apple, Google, Microsoft, OpenAI
- **Social Media**: Discord, Facebook, Instagram, Kick, LinkedIn, Twitter (X)
- **Development**: GitHub, GitLab, NPM, PNPM, Vercel
- **Frameworks/Tools**: Next.js, React, Radix UI, Tailwind CSS, Prisma
- **Services**: Notion, Linear, Stripe, PayPal, Dropbox
- **Colorful Variants**: `googleColorful`, `facebookColorful`, `linkedinColorful`

All icons support `currentColor` for easy theming and accept standard SVG props.

### Type Definitions

#### Component Types

Standard interfaces for common component patterns including base props, images, and links.

```typescript
import type {
  BaseComponentProps,
  ImageComponent,
  LinkComponent,
} from "@pelatformui/general";
```

#### Menu Configuration

Comprehensive type system for building navigational menus with nesting, badges, and collapsible sections.

```typescript
import type { MenuItem, MenuConfig } from "@pelatformui/general";
```

### Re-exports

Class Variance Authority (CVA) utilities for component variant patterns:

```typescript
import { cva, type VariantProps } from "@pelatformui/general";

const buttonVariants = cva("button-base", {
  variants: {
    variant: {
      primary: "bg-blue-500",
      secondary: "bg-gray-500",
    },
  },
});
```

## API Reference

### Components

- **`Icons`** - Brand icon collection (48 SVG brand icons)

### Utilities

- **`googleTrackEvent(params)`** - Track events in Google Analytics
- **`getAssetsUrl(path)`** - Build CDN URL for assets
- **`getFlagUrl(flag)`** - Build CDN URL for country flags
- **`getIPAddress()`** - Retrieve client IP address
- **`parse(request)`** - Parse Next.js request object
- **`normalizePath(input)`** - Normalize URL pathname
- **`cn(...inputs)`** - Merge Tailwind CSS class names

### Constants

- **`THEME_MODES`** - Available theme modes (light, dark, system)
- **`META_THEME_COLORS`** - Theme color mapping
- **`DEFAULT_THEME_MODE`** - Default theme mode ('system')

### Types

- **`BaseComponentProps`** - Base props for all components
- **`ImageComponent`** - Image component interface
- **`LinkComponent`** - Link component interface
- **`MenuItem`** - Menu item structure
- **`MenuConfig`** - Menu configuration array
- **`ThemeMode`** - Theme mode type union
- **`ParsedRequest`** - Parsed request structure
- **`EventProps`** - Analytics event properties

## Dependencies

This package uses:

- `class-variance-authority` - Component variant patterns
- `clsx` - Conditional class names
- `tailwind-merge` - Tailwind CSS class conflict resolution

## License

MIT
