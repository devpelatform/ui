# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-11-26

### Added

#### Form & Input Components (8 components)

- **Field**: Form field wrapper with label and error support
  - Label, description, and error message components
  - Automatic error state binding
  - Accessible form field structure

- **Fieldset**: Groups related form fields
  - Semantic HTML fieldset element
  - Legend support for field group titles

- **Form**: React Hook Form integration wrapper
  - FormProvider for form context
  - FormField component with Controller integration
  - FormItem, FormLabel, FormControl, FormDescription, FormMessage components
  - Automatic validation state management
  - useFormField hook for accessing field state

- **FormTanstack**: TanStack Form integration
  - Support for TanStack React Form library
  - Similar API to React Hook Form integration

- **Input**: Text input field with variants
  - Size variants: lg, md, sm
  - InputWrapper with prefix/suffix support
  - InputGroup for combining inputs with buttons
  - File input styling
  - Disabled and readonly states

- **Label**: Form label component
  - Accessible label with for attribute
  - Required indicator support

- **NumberField**: Numeric input with increment/decrement
  - Built-in stepper buttons
  - Min/max value constraints
  - Step increment configuration

- **PhoneInput**: Phone number input with country selection
  - International phone number validation
  - Country code selector with flags
  - Integrates with react-phone-number-input
  - Combobox for country search

#### Selection Components (9 components)

- **Checkbox**: Single checkbox with label
  - Checked, unchecked, and indeterminate states
  - Custom styling with CVA variants
  - Accessible with proper ARIA attributes

- **CheckboxGroup**: Multiple checkbox group
  - Group label and description
  - Individual checkbox items
  - Controlled and uncontrolled modes

- **RadioGroup**: Radio button group
  - Mutually exclusive selection
  - RadioGroupItem components
  - Controlled and uncontrolled modes

- **Select**: Dropdown select menu
  - SelectTrigger, SelectValue, SelectContent, SelectItem components
  - Searchable options
  - Multi-select support
  - Keyboard navigation

- **Combobox**: Searchable select/autocomplete
  - Type-ahead filtering
  - Custom option rendering
  - Keyboard navigation

- **Autocomplete**: Auto-completing input
  - Suggestions dropdown
  - Debounced search
  - Custom suggestion rendering

- **Switch**: Toggle switch (on/off)
  - Smooth animations
  - Accessible keyboard support
  - Size variants

- **Toggle**: Toggle button
  - Pressed/unpressed states
  - Icon support
  - Multiple variants

- **ToggleGroup**: Group of toggle buttons
  - Single or multiple selection modes
  - Controlled and uncontrolled

#### Layout & Navigation Components (8 components)

- **Accordion**: Collapsible sections
  - AccordionItem, AccordionTrigger, AccordionContent components
  - Single or multiple expanded sections
  - Smooth expand/collapse animations

- **Breadcrumb**: Navigation breadcrumbs
  - BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator components
  - Current page indicator
  - Customizable separators

- **Menu**: Context/dropdown menu
  - MenuItem, MenuSeparator components
  - Nested submenus
  - Keyboard navigation
  - Icons and shortcuts support

- **Menubar**: Menu bar
  - Multiple menu groups
  - Keyboard navigation
  - Accessible ARIA roles

- **NavigationMenu**: Navigation menu
  - Multi-level navigation support
  - NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent components
  - Hover and click interactions

- **ScrollArea**: Scrollable container
  - Custom scrollbar styling
  - Horizontal and vertical scroll
  - Smooth scrolling

- **Separator**: Visual separator/divider
  - Horizontal and vertical orientations
  - Customizable styling

- **Tabs**: Tab interface
  - TabsList, TabsTrigger, TabsContent components
  - Keyboard navigation
  - Controlled and uncontrolled modes

#### Button Components (2 components)

- **Button**: Action button with multiple variants
  - Variants: primary, mono, destructive, secondary, outline, dashed, ghost, dim, foreground, inverse
  - Modes: default, icon, link, input
  - Sizes: lg, md, sm, xs, icon
  - Loading state support
  - Icon support

- **Toolbar**: Tool strip/button group
  - Horizontal and vertical layouts
  - Button grouping
  - Separator support

#### Dialog & Overlay Components (5 components)

- **Dialog**: Modal dialog
  - DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter components
  - Backdrop overlay
  - Close on escape or backdrop click
  - Focus trap

- **AlertDialog**: Alert/confirmation dialog
  - Similar to Dialog with alert semantics
  - AlertDialogAction and AlertDialogCancel components
  - Accessible alert role

- **Sheet**: Side sheet/drawer
  - SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription components
  - Slide-in animations from top, right, bottom, or left
  - Backdrop overlay

- **Popover**: Floating popover
  - PopoverTrigger, PopoverContent components
  - Positioning with anchor element
  - Arrow indicator
  - Close on outside click

- **ContextMenu**: Right-click context menu
  - ContextMenuTrigger, ContextMenuContent, ContextMenuItem components
  - Nested submenus
  - Keyboard navigation

#### Data Display Components (7 components)

- **Avatar**: User avatar with fallback
  - AvatarImage and AvatarFallback components
  - Automatic fallback on image load error
  - Size variants

- **Badge**: Status badge
  - Variants: primary, secondary, destructive, success, info, warning, outline
  - Removable badges
  - Icon support

- **Meter**: Progress meter/gauge
  - Value and max props
  - Customizable colors
  - Accessible ARIA attributes

- **Progress**: Progress bar
  - Determinate and indeterminate modes
  - Customizable appearance
  - Accessible ARIA attributes

- **PreviewCard**: Content preview card
  - Image preview
  - Title and description
  - Action buttons

- **Slider**: Range slider
  - Single or range (dual) slider
  - Min, max, and step configuration
  - Keyboard support
  - Accessible ARIA attributes

- **Tooltip**: Hover tooltip
  - TooltipTrigger and TooltipContent components
  - Configurable delay
  - Positioning options
  - Arrow indicator

#### Utility Components

- **Toast**: Toast notification system via useToast hook
  - Success, error, warning, info variants
  - Auto-dismiss with configurable duration
  - Action buttons
  - Positioning options
  - Queue management

#### Features

- Built on @base-ui-components/react for headless, accessible UI
- Full WCAG 2.1 compliance
- Keyboard navigation support for all interactive components
- Focus management and focus trap for modals
- Screen reader friendly with proper ARIA attributes
- React Hook Form integration for form validation
- TanStack Form integration
- Phone number validation with country codes
- Size variants (sm, md, lg) across components
- Multiple color/style variants
- Dark mode support
- Full TypeScript support with comprehensive type definitions
- Styled with Tailwind CSS using CVA (Class Variance Authority)
- Customizable via className prop
- SSR-safe implementations

#### Dependencies

- Added @base-ui-components/react (1.0.0-beta.6) for headless UI primitives
- Added @tanstack/react-form (^1.26.0) for form state management
- Added react-phone-number-input (^3.4.14) for phone input validation

#### CSS Export

- Added CSS export via `./css` entry point
- Style file: `dist/style.css`
- Import with `import '@pelatformui/base/css'`
