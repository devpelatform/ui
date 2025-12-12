# @pelatform/ui.general

[![Version](https://img.shields.io/npm/v/@pelatform/ui.general.svg)](https://www.npmjs.com/package/@pelatform/ui.general)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Core utilities and type definitions for the Pelatform UI Library.
This package now focuses on lightweight re-exports of shared utilities and server helpers,
plus a small set of core types and components used across the UI library.

## Installation

```bash
# Using bun
bun add @pelatform/ui.general

# Using npm
npm install @pelatform/ui.general
```

## Features

### Utilities (Re-exports)

This package re-exports utilities from `@pelatform/utils` so you can consume them via a single UI entry-point.
Common helpers include class name merging, asset URL builders, and more.

```typescript
import { cn, assetsUrl } from "@pelatform/ui.general";
import { someHelper } from "@pelatform/ui.general";
```

- `cn(...inputs)` — Tailwind-safe class merger
- `assetsUrl(path)` — Build CDN URLs for Pelatform assets
- All other shared helpers are also available via this package through re-export from `@pelatform/utils`.

### Server Utilities

Server-side helpers are available through a dedicated subpath export:

```typescript
import {} from /* server utilities */ "@pelatform/ui.general/server";
// Or when using the aggregator package:
// import { /* server utilities */ } from "pelatform-ui/server";
```

The server subpath is bundled and typed, and mirrors the helpers available from `@pelatform/utils/server`.

### Legacy Utilities (removed)

#### Analytics

Google Analytics event tracking with validation and error handling.

```typescript
import { googleTrackEvent } from "@pelatform/ui.general";

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
import { getAssetsUrl, getFlagUrl } from "@pelatform/ui.general";

const imageUrl = getAssetsUrl("media/illustrations/29.svg");
const flagUrl = getFlagUrl("indonesia"); // Returns SVG flag for Indonesia
```

#### Theme Configuration

Manage theme modes and meta theme colors for light/dark mode support.

```typescript
import {
  THEME_MODES,
  META_THEME_COLORS,
  DEFAULT_THEME_MODE,
} from "@pelatform/ui.general";

// Available modes: 'light', 'dark', 'system'
const currentTheme = DEFAULT_THEME_MODE; // 'system'
const themeColor = META_THEME_COLORS[currentTheme];
```

#### IP Detection

Retrieve client IP addresses with multiple fallback providers for reliability.

```typescript
import { getIPAddress } from "@pelatform/ui.general";

const ipAddress = await getIPAddress();
console.log(ipAddress); // e.g., "203.0.113.42" or "unknown"
```

#### URL Parsing

Parse and normalize Next.js requests with domain and path extraction.

```typescript
import { parse, normalizePath } from "@pelatform/ui.general";

const parsed = parse(request);
// Returns: { domain, path, fullPath, key, fullKey, searchParamsObj, searchParamsString }

const normalized = normalizePath("//dashboard///users/");
// Returns: "/dashboard/users"
```

#### Class Name Merging

Optimized Tailwind CSS class merging with conflict resolution.

```typescript
import { cn } from "@pelatform/ui.general";

const className = cn(
  "px-2 py-1",
  "px-4", // Overrides px-2
  isError && "text-red-500",
  "hover:bg-gray-100"
);
```

#### Image Processing

Resize, crop, and encode images using browser APIs.

```typescript
import {
  resizeAndCropImage,
  loadImage,
  fileToBase64,
} from "@pelatform/ui.general";

// Resize to centered square 256x256 and export as WebP
const processed = await resizeAndCropImage(file, "avatar", 256, "webp");

// Load File as HTMLImageElement
const img = await loadImage(file);

// Convert File to Base64 data URL
const base64 = await fileToBase64(file);
```

#### Email Utilities

Validate, normalize, and analyze email addresses.

```typescript
import {
  validateEmail,
  normalizeEmail,
  isDisposableEmail,
  isBusinessEmail,
  getEmailDomain,
} from "@pelatform/ui.general";

// Validate and enforce business email
const result = validateEmail("john@company.com", { requireBusiness: true });
if (!result.isValid) throw new Error(result.error || "Invalid email");

// Normalize user input
const normalized = normalizeEmail(" User.Name+tag@gmail.com ");

// Checks
const isDisposable = isDisposableEmail("temp@10minutemail.com");
const isBusiness = isBusinessEmail("jane@enterprise.org");
const domain = getEmailDomain("user@example.com");
```

#### Application Constants

Environment flags and shared query param keys.

```typescript
import {
  isDevelopment,
  isStaging,
  isProduction,
  REDIRECT_QUERY_PARAM,
} from "@pelatform/ui.general";

if (isProduction) {
  // Enable production optimizations
}

// Use consistent redirect query name
const loginUrl = `/login?${REDIRECT_QUERY_PARAM}=/dashboard`;
```

### Components

#### Icons

Brand icon collection providing 48 SVG icons for popular services, technologies, and platforms.

```typescript
import { Icons } from "@pelatform/ui.general";

function MyComponent() {
  return (
    <div>
      <Icons.Anthropic className="w-6 h-6" />
      <Icons.GitHub className="w-6 h-6 text-gray-900" />
      <Icons.GoogleColorful className="w-8 h-8" />
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
- **Colorful Variants**: `GoogleColorful`, `FacebookColorful`, `LinkedInColorful`

All icons support `currentColor` for easy theming and accept standard SVG props.

### Type Definitions

#### Component Types

Standard interfaces for common component patterns including base props, images, and links.

```typescript
import type {
  BaseComponentProps,
  ImageComponent,
  LinkComponent,
} from "@pelatform/ui.general";
```

#### Menu Configuration

Comprehensive type system for building navigational menus with nesting, badges, and collapsible sections.

```typescript
import type { MenuItem, MenuConfig } from "@pelatform/ui.general";
```

### Re-exports

Class Variance Authority (CVA) utilities for component variant patterns:

```typescript
import { cva, type VariantProps } from "@pelatform/ui.general";

const buttonVariants = cva("button-base", {
  variants: {
    variant: {
      primary: "bg-blue-500",
      secondary: "bg-gray-500",
    },
  },
});
```

## Migration Guide

This package has been simplified to primarily re-export shared utilities from `@pelatform/utils`.
Several internal modules previously under `src/lib/*` have been removed.

- Replace any deep imports from `@pelatform/ui.general/src/lib/*` with top-level imports from `@pelatform/ui.general`.
- Use `assetsUrl(...)` instead of `getAssetsUrl(...)`.
- For server-only helpers, import from `@pelatform/ui.general/server` (or `pelatform-ui/server` if using the aggregator).

Examples:

```typescript
// Before
import { getAssetsUrl } from "@pelatform/ui.general";

// After
import { assetsUrl } from "@pelatform/ui.general";
```

```typescript
// Before (deep lib import)
import { someLibHelper } from "@pelatform/ui.general/src/lib/utils";

// After (top-level re-export)
import { someLibHelper } from "@pelatform/ui.general";
```

```typescript
// Server helpers
import { serverHelper } from "@pelatform/ui.general/server";
// Or
import { serverHelper } from "pelatform-ui/server";
```

## API Reference

### Components

- **`Icons`** - Brand icon collection (48 SVG brand icons)

### Utilities

- **`cn(...inputs)`** - Merge Tailwind CSS class names
- **`assetsUrl(path)`** — Build Pelatform CDN URLs
- Other helpers are available through re-exports from `@pelatform/utils`.

### Server

- Import server-only helpers via `@pelatform/ui.general/server` (or `pelatform-ui/server`).

### Constants

- **`THEME_MODES`** - Available theme modes (light, dark, system)
- **`META_THEME_COLORS`** - Theme color mapping
- **`DEFAULT_THEME_MODE`** - Default theme mode ('system')
- **`isDevelopment` | `isStaging` | `isProduction`** - Environment flags
- **`REDIRECT_QUERY_PARAM`** - Shared redirect query param name

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

- `@pelatform/utils` — Shared cross-project utilities
- `class-variance-authority` — Component variant patterns
- `clsx` — Conditional class names
- `tailwind-merge` — Tailwind CSS class conflict resolution

## Links

- [npm Package](https://www.npmjs.com/package/@pelatform/ui.general)
- [Contributing Guide](../../../CONTRIBUTING.md)
- [Code of Conduct](../../../CODE_OF_CONDUCT.md)
- [License](../../../LICENSE)

## License

MIT © [Pelatform Inc.](../../../LICENSE)
