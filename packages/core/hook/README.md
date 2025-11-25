# @pelatformui/hook

A collection of production-ready React hooks for the Pelatform UI Library. This package provides 14 reusable hooks for analytics, responsive design, form handling, navigation, DOM management, and more.

## Installation

```bash
# Using bun
bun add @pelatformui/hook

# Using npm
npm install @pelatformui/hook
```

## Available Hooks

### Analytics & Tracking

#### `useAnalytics`

Track CRUD operations and user interactions with Google Analytics integration.

```typescript
import { useAnalytics } from "@pelatformui/hook";

const { trackCreate, trackUpdate, trackDelete } = useAnalytics();

trackCreate("workspace", "projects", "project", "proj-123");
trackUpdate("user", "profile", "settings", "user-456");
trackDelete("content", "posts", "post", "post-789", false);
```

### Responsive Design

#### `useMediaQuery`

Track CSS media query matches in real-time.

```typescript
import { useMediaQuery } from "@pelatformui/hook";

const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
const isLargeScreen = useMediaQuery("(min-width: 1024px)");
```

#### `useIsMobile`

Detect if viewport is mobile-sized with customizable breakpoint.

```typescript
import { useIsMobile } from "@pelatformui/hook";

const isMobile = useIsMobile(); // Default breakpoint: 1024px
const isSmallScreen = useIsMobile(768); // Custom breakpoint
```

#### `useViewport`

Track viewport dimensions with real-time updates.

```typescript
import { useViewport } from "@pelatformui/hook";

const [height, width] = useViewport();
```

### Form & Input Management

#### `useFileUpload`

Comprehensive file upload with drag & drop support, validation, and preview generation.

```typescript
import { useFileUpload } from "@pelatformui/hook";

const [
  { files, isDragging, errors },
  { addFiles, removeFile, clearFiles, handleDrop, getInputProps },
] = useFileUpload({
  maxFiles: 5,
  maxSize: 5242880, // 5MB
  accept: "image/*",
  multiple: true,
  onFilesChange: (files) => console.log("Files changed:", files),
});
```

#### `useSliderInput`

Manage dual slider input with synchronized number inputs and validation.

```typescript
import { useSliderInput } from "@pelatformui/hook";

const { sliderValues, inputValues, handleSliderChange, handleInputChange } =
  useSliderInput({
    minValue: 0,
    maxValue: 1000,
    initialValue: [100, 500],
  });
```

#### `useCopyToClipboard`

Copy text to clipboard with automatic state management and callbacks.

```typescript
import { useCopyToClipboard } from "@pelatformui/hook";

const { copied, copy } = useCopyToClipboard({
  timeout: 2000,
  onCopy: () => console.log("Copied!"),
});

<button onClick={() => copy("Text to copy")}>
  {copied ? "Copied!" : "Copy"}
</button>;
```

### Navigation & Scrolling

#### `useMenu`

Comprehensive menu navigation state management with active detection and breadcrumb generation.

```typescript
import { useMenu } from "@pelatformui/hook";
import { usePathname } from "next/navigation";

const pathname = usePathname();
const { isActive, hasActiveChild, getCurrentItem, getBreadcrumb } =
  useMenu(pathname);

const breadcrumb = getBreadcrumb(menuItems);
const currentItem = getCurrentItem(menuItems);
```

#### `useScrollPosition`

Track scroll position of window or specific elements.

```typescript
import { useScrollPosition } from "@pelatformui/hook";

const scrollY = useScrollPosition();
const elementScroll = useScrollPosition({ targetRef: myRef });
```

### DOM Management

#### `useBodyClasses`

Dynamically add/remove CSS classes from the document body element.

```typescript
import { useBodyClasses } from "@pelatformui/hook";

useBodyClasses("dark-theme overflow-hidden");
```

#### `useMutationObserver`

Observe DOM mutations on a referenced element.

```typescript
import { useMutationObserver } from "@pelatformui/hook";

const ref = useRef<HTMLDivElement>(null);

useMutationObserver(ref, (mutations) => {
  mutations.forEach((mutation) => {
    console.log("DOM changed:", mutation);
  });
});
```

### Security

#### `useRecaptchaV2`

Integrate Google reCAPTCHA v2 with automatic script loading and widget management.

```typescript
import { useRecaptchaV2 } from "@pelatformui/hook";

const { containerRef, getToken, resetCaptcha, initializeRecaptcha } =
  useRecaptchaV2(siteKey);

useEffect(() => {
  initializeRecaptcha();
}, []);

const handleSubmit = async () => {
  const token = getToken();
  // Send token to server for verification
};
```

### Utilities

#### `useMounted`

Detect when a component has mounted on the client (essential for SSR).

```typescript
import { useMounted } from "@pelatformui/hook";

const mounted = useMounted();

if (!mounted) return null; // Prevent hydration mismatches
```

#### `useRemoveGAParams`

Automatically remove Google Analytics `_gl` parameter from URL after initialization.

```typescript
import { useRemoveGAParams } from "@pelatformui/hook";

useRemoveGAParams(); // Cleans URL after GA processes linker attribution
```

## Hook Categories

### By Use Case

- **Analytics & Tracking**: `useAnalytics`
- **Responsive Design**: `useMediaQuery`, `useIsMobile`, `useViewport`
- **Form Management**: `useFileUpload`, `useSliderInput`, `useCopyToClipboard`
- **Navigation**: `useMenu`, `useScrollPosition`
- **DOM Interaction**: `useMutationObserver`, `useBodyClasses`
- **Security**: `useRecaptchaV2`
- **SSR Safety**: `useMounted`, `useRemoveGAParams`

### By Complexity

**Simple** (Stateless/Single-purpose):

- `useMounted`
- `useBodyClasses`
- `useRemoveGAParams`
- `useMediaQuery`
- `useIsMobile`
- `useViewport`
- `useScrollPosition`

**Moderate** (State Management):

- `useCopyToClipboard`
- `useSliderInput`
- `useMenu`
- `useMutationObserver`

**Advanced** (Complex State/Side Effects):

- `useAnalytics`
- `useFileUpload`
- `useRecaptchaV2`

## TypeScript Support

All hooks are written in TypeScript and include comprehensive type definitions. Import types as needed:

```typescript
import type { FileUploadOptions, FileWithPreview } from "@pelatformui/hook";
import type { MenuItem, MenuConfig } from "@pelatformui/hook";
```

## Features

- Full TypeScript support with comprehensive types
- SSR-safe implementations for Next.js and other frameworks
- Automatic cleanup and memory management
- Performance optimized with passive listeners and memoization
- Zero side effects (tree-shakeable)
- Extensive validation and error handling
- Browser API compatibility checks

## Dependencies

This package has zero runtime dependencies. It requires:

- React 19.2+ (peer dependency)
- Modern browser with Web APIs support

## License

MIT
