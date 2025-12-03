# @pelatform/ui.default

[![Version](https://img.shields.io/npm/v/@pelatform/ui.default.svg)](https://www.npmjs.com/package/@pelatform/ui.default)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Default styled components for the Pelatform UI Library. A comprehensive collection of 71 production-ready React components built on Radix UI, with advanced features like data tables, drag-and-drop, date pickers, and more.

## Installation

```bash
bun add @pelatform/ui.default
```

### Peer Dependencies

Make sure you have these installed:

```bash
bun add @pelatform/ui.general @pelatform/ui.hook @radix-ui/react-dialog lucide-react next-themes radix-ui react-hook-form sonner
```

### Import Styles

Import the component styles in your app:

```typescript
import "@pelatform/ui.default/css";
```

## Quick Start

```typescript
import { Button, Card, Input, Select } from "@pelatform/ui.default";
import "@pelatform/ui.default/css";

function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter text" />
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Option 1</SelectItem>
        </SelectContent>
      </Select>
      <Button>Submit</Button>
    </Card>
  );
}
```

## Components

### Layout & Structure (10 components)

- **Accordion** - Collapsible content sections
- **AccordionMenu** - Accordion-style navigation menu
- **AspectRatio** - Fixed aspect ratio container
- **Card** - Content card container
- **Collapsible** - Collapsible content wrapper
- **DescriptionList** - Term/definition list
- **Item** - Generic list item component
- **Resizable** - Resizable panels with drag handles
- **Sidebar** - Sidebar layout component
- **Tabs** - Tabbed interface

### Navigation (7 components)

- **Breadcrumb** - Navigation breadcrumb trail
- **Command** - Command palette/search menu
- **ContextMenu** - Right-click context menu
- **DropdownMenu** - Dropdown menu
- **MenuBar** - Menu bar
- **NavigationMenu** - Navigation menu with submenus
- **Scrollspy** - Scroll-based navigation highlighting

### Form & Input (11 components)

- **Checkbox** - Checkbox input
- **Field** - Form field wrapper with label/error
- **Form** - Form wrapper with React Hook Form integration
- **Input** - Text input field
- **InputOTP** - One-time password input
- **Label** - Form label
- **RadioGroup** - Radio button group
- **Select** - Select dropdown
- **Slider** - Range slider
- **Switch** - Toggle switch
- **Textarea** - Multi-line text input

### Data Display (12 components)

- **Alert** - Alert/notification box
- **Avatar** - User avatar with fallback
- **Badge** - Status badge
- **Calendar** - Date picker calendar
- **Code** - Code snippet display
- **Empty** - Empty state placeholder
- **Heading** - Semantic heading
- **Kbd** - Keyboard shortcut display
- **Progress** - Progress bar
- **Rating** - Star rating component
- **Skeleton** - Loading placeholder
- **Spinner** - Loading spinner

### Data Tables (9 components)

- **DataGrid** - Advanced data table with features
- **DataGridColumnFilter** - Column filtering UI
- **DataGridColumnHeader** - Column header with sorting
- **DataGridColumnVisibility** - Column visibility toggle
- **DataGridPagination** - Table pagination controls
- **DataGridTable** - Base table component
- **DataGridTableDnd** - Draggable columns
- **DataGridTableDndRows** - Draggable rows
- **Table** - Simple HTML table wrapper
- **Pagination** - Standalone pagination component

### Dialogs & Overlays (7 components)

- **AlertDialog** - Alert/confirmation dialog
- **Dialog** - Modal dialog
- **Drawer** - Slide-in drawer (mobile-friendly)
- **HoverCard** - Hover information card
- **Popover** - Floating popover
- **Sheet** - Side sheet/panel
- **Tooltip** - Hover tooltip

### Advanced Features (8 components)

- **Carousel** - Image/content carousel
- **Filters** - Filter UI components
- **Kanban** - Drag-and-drop kanban board
- **Sortable** - Sortable list with drag & drop
- **Stepper** - Multi-step wizard
- **Tree** - Hierarchical tree view

### Utility & Feedback (7 components)

- **ButtonGroup** - Grouped buttons
- **Button** - Action button
- **ScrollArea** - Custom scrollable area
- **Separator** - Visual divider
- **Sonner** - Toast notifications
- **Toggle** - Toggle button
- **ToggleGroup** - Toggle button group

## Features

### Data Table Features

- Server-side pagination, sorting, and filtering
- Column visibility toggle
- Draggable columns and rows
- Resizable columns
- Row selection
- Custom cell renderers
- Loading states (skeleton/spinner)
- Empty states

### Advanced Components

- **Kanban**: Full drag-and-drop kanban board with @dnd-kit
- **Stepper**: Multi-step forms with navigation
- **Tree**: Hierarchical data with expand/collapse
- **Calendar**: Full-featured date picker with react-day-picker
- **Carousel**: Touch-enabled carousel with embla-carousel
- **Command**: Search/command palette with cmdk

### Form Integration

- React Hook Form support
- Validation error display
- Field-level state management
- Accessible form structure

### Theme Support

- Dark mode via next-themes
- Customizable with Tailwind CSS
- CVA-based variants
- Consistent design tokens

## Component Count

- **Total Components**: 71
- **Includes all Base package components** plus additional advanced components
- Data tables with 8 specialized sub-components
- Kanban board, Stepper, Tree, Calendar, Carousel, Command palette

## TypeScript Support

Full TypeScript support with comprehensive type definitions for all components.

## Dependencies

### Production Dependencies

- `@dnd-kit/core`
- `@dnd-kit/modifiers`
- `@dnd-kit/sortable`
- `@dnd-kit/utilities`
- `@headless-tree/core`
- `@radix-ui/react-slot`
- `@tanstack/react-table`
- `cmdk`
- `embla-carousel-react`
- `input-otp`
- `react-day-picker`
- `react-resizable-panels`
- `vaul`

### Peer Dependencies

- `@pelatform/ui.general`
- `@pelatform/ui.hook`
- `@radix-ui/react-dialog`
- `lucide-react`
- `next-themes`
- `radix-ui`
- `react`
- `react-hook-form`
- `sonner`

## Links

- [npm Package](https://www.npmjs.com/package/@pelatform/ui.default)
- [Contributing Guide](../../../CONTRIBUTING.md)
- [Code of Conduct](../../../CODE_OF_CONDUCT.md)
- [License](../../../LICENSE)

## License

MIT © [Pelatform Inc.](../../../LICENSE)
