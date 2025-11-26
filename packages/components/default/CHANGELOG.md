# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1](https://github.com/devpelatform/ui/compare/default-v0.1.0...default-v0.1.1) (2025-11-26)


### 🐛 Bug Fixes

* **components:** fix build script order for CSS export ([21cc7c4](https://github.com/devpelatform/ui/commit/21cc7c41b79614f2360516f0bf594e7d4c9eb181))


### 📚 Documentation

* add comprehensive documentation for all packages ([dd08601](https://github.com/devpelatform/ui/commit/dd086011ca0bfabb268ca2e6e897fbb45b6f57d0))
* update README files with consistent formatting and syntax ([7273fce](https://github.com/devpelatform/ui/commit/7273fceb62e9764a97130f9d494e7883578efc73))


### 💎 Styles

* standardize quote usage in import statements across docs ([7273fce](https://github.com/devpelatform/ui/commit/7273fceb62e9764a97130f9d494e7883578efc73))


### 👷 Continuous Integration

* remove createGithubReleases flag from release workflow ([7273fce](https://github.com/devpelatform/ui/commit/7273fceb62e9764a97130f9d494e7883578efc73))

## [0.1.0] - 2025-11-26

### Added

#### Layout & Structure Components (10 components)

- **Accordion**: Collapsible content sections with smooth animations
- **AccordionMenu**: Accordion-style navigation menu for sidebar layouts
- **AspectRatio**: Fixed aspect ratio container for responsive media
- **Card**: Content card container with header, content, and footer sections
- **Collapsible**: Collapsible content wrapper with trigger and content
- **DescriptionList**: Styled term/definition list for displaying key-value pairs
- **Item**: Generic list item component for consistent styling
- **Resizable**: Resizable panels with drag handles (via react-resizable-panels)
- **Sidebar**: Sidebar layout component with responsive behavior
- **Tabs**: Tabbed interface with tab list, triggers, and content panels

#### Navigation Components (7 components)

- **Breadcrumb**: Navigation breadcrumb trail with separators
- **Command**: Command palette/search menu with keyboard shortcuts (via cmdk)
- **ContextMenu**: Right-click context menu with nested submenus
- **DropdownMenu**: Dropdown menu with items, submenus, and separators
- **MenuBar**: Menu bar for application-level navigation
- **NavigationMenu**: Navigation menu with dropdown submenus and indicators
- **Scrollspy**: Scroll-based navigation highlighting for table of contents

#### Form & Input Components (11 components)

- **Checkbox**: Checkbox input with checked/unchecked/indeterminate states
- **Field**: Form field wrapper with label, description, and error messages
- **Form**: Form wrapper with React Hook Form integration and validation
- **Input**: Text input field with size variants and prefix/suffix support
- **InputOTP**: One-time password input with individual character boxes (via input-otp)
- **Label**: Form label with required indicator
- **RadioGroup**: Radio button group with exclusive selection
- **Select**: Select dropdown with search and keyboard navigation
- **Slider**: Range slider with single or dual handles
- **Switch**: Toggle switch with smooth animations
- **Textarea**: Multi-line text input with auto-resize option

#### Data Display Components (12 components)

- **Alert**: Alert/notification box with variants (info, success, warning, error)
- **Avatar**: User avatar with image and fallback initials
- **Badge**: Status badge with color variants and removable option
- **Calendar**: Full-featured date picker calendar (via react-day-picker)
- **Code**: Code snippet display with syntax highlighting support
- **Empty**: Empty state placeholder with icon and message
- **Heading**: Semantic heading component with size variants
- **Kbd**: Keyboard shortcut display with styled keys
- **Progress**: Progress bar with determinate/indeterminate modes
- **Rating**: Star rating component with half-star support
- **Skeleton**: Loading placeholder with pulse animation
- **Spinner**: Loading spinner with size variants

#### Data Table Components (9 components)

- **DataGrid**: Advanced data table with pagination, sorting, and filtering
  - Server-side and client-side data support
  - Column visibility management
  - Row selection
  - Custom cell renderers
  - Loading states
  - Empty states
- **DataGridColumnFilter**: Column filtering UI with search and select filters
- **DataGridColumnHeader**: Column header with sorting indicators
- **DataGridColumnVisibility**: Column visibility toggle dropdown
- **DataGridPagination**: Pagination controls with page size selector
- **DataGridTable**: Base table component with TanStack React Table integration
- **DataGridTableDnd**: Draggable columns with @dnd-kit
- **DataGridTableDndRows**: Draggable rows with @dnd-kit
- **Table**: Simple HTML table wrapper with styled variants
- **Pagination**: Standalone pagination component

#### Dialog & Overlay Components (7 components)

- **AlertDialog**: Alert/confirmation dialog with action buttons
- **Dialog**: Modal dialog with backdrop and focus trap
- **Drawer**: Slide-in drawer from bottom (via vaul), mobile-friendly
- **HoverCard**: Hover-triggered information card
- **Popover**: Floating popover with arrow indicator
- **Sheet**: Side sheet/panel from top/right/bottom/left
- **Tooltip**: Hover tooltip with configurable delay

#### Advanced Feature Components (8 components)

- **Carousel**: Image/content carousel with touch support (via embla-carousel)
  - Auto-play option
  - Pagination dots
  - Previous/next navigation
  - Loop mode
- **Filters**: Filter UI components for building filter panels
- **Kanban**: Drag-and-drop kanban board (via @dnd-kit)
  - Column management
  - Card dragging between columns
  - Keyboard navigation
  - Touch support
- **Sortable**: Sortable list with drag & drop (via @dnd-kit)
- **Stepper**: Multi-step wizard/form navigation
  - Linear and non-linear modes
  - Step indicators
  - Optional/required steps
  - Validation support
- **Tree**: Hierarchical tree view (via @headless-tree/core)
  - Expand/collapse nodes
  - Keyboard navigation
  - Selection support
  - Custom node rendering

#### Utility & Feedback Components (7 components)

- **ButtonGroup**: Grouped buttons with connected styling
- **Button**: Action button with multiple variants and sizes
  - Variants: primary, secondary, outline, ghost, destructive
  - Sizes: sm, md, lg
  - Icon and loading states
- **ScrollArea**: Custom scrollable area with styled scrollbars
- **Separator**: Visual divider/separator (horizontal/vertical)
- **Sonner**: Toast notification system (via sonner)
  - Success, error, warning, info, loading toasts
  - Action buttons
  - Auto-dismiss
  - Promise-based toasts
- **Toggle**: Toggle button with pressed state
- **ToggleGroup**: Toggle button group with single/multiple selection

#### Features

- Full Radix UI integration for accessibility
- Dark mode support via next-themes
- Tailwind CSS styling with CVA variants
- TypeScript support with comprehensive types
- React Hook Form integration for forms
- TanStack React Table for data grids
- @dnd-kit for drag-and-drop functionality
- Responsive design for all components
- Keyboard navigation support
- Focus management
- SSR-safe implementations
- Tree-shakeable (zero side effects)

#### Dependencies

- Added @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/modifiers, @dnd-kit/utilities for drag-and-drop
- Added @tanstack/react-table (^8.21.3) for table state management
- Added cmdk (^1.1.1) for command menu
- Added embla-carousel-react (^8.6.0) for carousel
- Added input-otp (^1.4.2) for OTP input
- Added react-day-picker (^9.11.2) for date picker
- Added react-resizable-panels (^3.0.6) for resizable layouts
- Added vaul (^1.1.2) for drawer component
- Added @headless-tree/core (^1.5.1) for tree component
- Added @radix-ui/react-slot (^1.2.4) for slot rendering

#### CSS Export

- Added CSS export via `./css` entry point
- Style file: `dist/style.css`
- Import with `import '@pelatformui/default/css'`
