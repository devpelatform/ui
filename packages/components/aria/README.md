# @pelatformui/aria

React Aria components for the Pelatform UI Library. Styled, accessible components built on top of React Aria Components with full WCAG compliance and keyboard navigation support.

## Installation

```bash
# Using bun
bun add @pelatformui/aria

# Using npm
npm install @pelatformui/aria
```

### Peer Dependencies

```bash
bun add @pelatformui/general react-aria-components
```

### Import Styles

Import the component styles in your app:

```typescript
import "@pelatformui/aria/css";
```

## Components

### DateField

Accessible date and time input components with segment-based editing.

```typescript
import { DateField, DateInput, DateSegment, TimeField } from '@pelatformui/aria';
import { parseDate } from '@internationalized/date';

// Date input
<DateField>
  <Label>Birth Date</Label>
  <DateInput>
    {(segment) => <DateSegment segment={segment} />}
  </DateInput>
</DateField>

// Time input
<TimeField>
  <Label>Appointment Time</Label>
  <DateInput>
    {(segment) => <DateSegment segment={segment} />}
  </DateInput>
</TimeField>
```

**Features:**

- Segment-based date/time editing (day, month, year, hour, minute)
- Keyboard navigation (arrow keys, tab, enter)
- Multiple size variants (lg, md, sm)
- Focus state with ring indicators
- Error/invalid state styling
- Readonly and disabled states
- Full accessibility (ARIA labels, roles)
- Internationalization support

**Size Variants:**

- `lg` - Large (h-10, text-sm)
- `md` - Medium (h-9, text-sm) - default
- `sm` - Small (h-8, text-xs)

### ShowMore

Toggle button for expanding/collapsing content with decorative borders.

```typescript
import { ShowMore } from "@pelatformui/aria";

<ShowMore orientation="horizontal" as="button" aria-label="Show more content">
  Show More
</ShowMore>;
```

**Features:**

- Horizontal and vertical orientations
- Renders as button or text element
- Decorative border dividers (before/after)
- Multiple button variants and styles
- Toggle state management
- Full accessibility support

**Orientation:**

- `horizontal` - Borders on left and right
- `vertical` - Borders on top and bottom

**Button Variants:**

- primary, mono, destructive, secondary, outline, dashed, ghost, dim, foreground, inverse

**Modes:**

- default, icon, link, input

**Sizes:**

- lg, md, sm, xs, icon

## Features

- Built on React Aria Components for accessibility
- WCAG 2.1 compliant
- Full keyboard navigation support
- Screen reader friendly
- Focus management
- Responsive sizing
- Dark mode support
- TypeScript support with full type definitions
- Styled with Tailwind CSS using CVA (Class Variance Authority)

## Dependencies

- `react-aria-components` (^1.13.0) - Accessible component primitives
- `@pelatformui/general` (>=0.1.0) - Styling utilities

## License

MIT
