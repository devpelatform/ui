# @pelatformui/base

Base components for the Pelatform UI Library. A comprehensive collection of 43 fundamental, headless UI components built on @base-ui-components/react with full accessibility support.

## Installation

```bash
# Using bun
bun add @pelatformui/base

# Using npm
npm install @pelatformui/base
```

### Peer Dependencies

```bash
bun add @pelatformui/general lucide-react react-hook-form
```

### Import Styles

Import the component styles in your app:

```typescript
import "@pelatformui/base/css";
```

## Component Categories

### Form & Input (8 components)

#### Input

Text input field with multiple variants and addons.

```typescript
import { Input, InputWrapper, InputGroup } from '@pelatformui/base';

<Input placeholder="Enter text" size="md" />
<InputWrapper prefix="$" suffix=".00">
  <Input />
</InputWrapper>
```

#### Field & Label

Form field wrapper with label and error support.

```typescript
import { Field, Label, FieldDescription, FieldError } from "@pelatformui/base";

<Field>
  <Label>Email</Label>
  <FieldDescription>Enter your email address</FieldDescription>
  <Input />
  <FieldError />
</Field>;
```

#### Form

React Hook Form integration wrapper.

```typescript
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@pelatformui/base";

<Form {...form}>
  <FormField
    name="username"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>
      </FormItem>
    )}
  />
</Form>;
```

**Other Form Components:**

- **Fieldset**: Groups form fields
- **NumberField**: Numeric input with increment/decrement
- **PhoneInput**: Phone number input with country selection
- **FormTanstack**: TanStack Form integration

### Selection Components (8 components)

- **Checkbox**: Single checkbox with label
- **CheckboxGroup**: Multiple checkboxes
- **RadioGroup**: Radio button group
- **Select**: Dropdown select menu
- **Combobox**: Searchable select/autocomplete
- **Autocomplete**: Auto-completing input
- **Switch**: Toggle switch (on/off)
- **Toggle**: Toggle button
- **ToggleGroup**: Group of toggle buttons

```typescript
import { Checkbox, RadioGroup, Select, Switch } from '@pelatformui/base';

<Checkbox>Accept terms</Checkbox>

<RadioGroup defaultValue="option1">
  <RadioGroupItem value="option1">Option 1</RadioGroupItem>
  <RadioGroupItem value="option2">Option 2</RadioGroupItem>
</RadioGroup>

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
  </SelectContent>
</Select>

<Switch checked={enabled} onCheckedChange={setEnabled} />
```

### Layout & Navigation (7 components)

- **Accordion**: Collapsible sections
- **Breadcrumb**: Navigation breadcrumbs
- **Menu**: Context/dropdown menu
- **Menubar**: Menu bar
- **NavigationMenu**: Navigation menu
- **ScrollArea**: Scrollable container
- **Separator**: Visual separator/divider
- **Tabs**: Tab interface

```typescript
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@pelatformui/base";

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content here</AccordionContent>
  </AccordionItem>
</Accordion>;
```

### Buttons & Actions (2 components)

- **Button**: Action button with multiple variants
- **Toolbar**: Tool strip/button group

```typescript
import { Button } from "@pelatformui/base";

<Button variant="primary" size="md">
  Click me
</Button>;
```

**Button Variants:** primary, mono, destructive, secondary, outline, dashed, ghost, dim, foreground, inverse

### Dialogs & Overlays (5 components)

- **Dialog**: Modal dialog
- **AlertDialog**: Alert/confirmation dialog
- **Sheet**: Side sheet/drawer
- **Popover**: Floating popover
- **ContextMenu**: Right-click context menu

```typescript
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@pelatformui/base";

<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    <p>Dialog content</p>
  </DialogContent>
</Dialog>;
```

### Data Display (7 components)

- **Avatar**: User avatar with fallback
- **Badge**: Status badge
- **Meter**: Progress meter/gauge
- **Progress**: Progress bar
- **PreviewCard**: Content preview card
- **Slider**: Range slider
- **Tooltip**: Hover tooltip

```typescript
import { Avatar, AvatarImage, AvatarFallback } from '@pelatformui/base';
import { Badge } from '@pelatformui/base';
import { Progress } from '@pelatformui/base';
import { Tooltip, TooltipTrigger, TooltipContent } from '@pelatformui/base';

<Avatar>
  <AvatarImage src="/avatar.jpg" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

<Badge variant="success">Active</Badge>

<Progress value={60} />

<Tooltip>
  <TooltipTrigger>Hover me</TooltipTrigger>
  <TooltipContent>Tooltip text</TooltipContent>
</Tooltip>
```

### Utilities (6 components)

- **Toast**: Toast notification system (via useToast hook)

```typescript
import { useToast } from "@pelatformui/base";

const { toast } = useToast();

toast({
  title: "Success",
  description: "Operation completed",
  variant: "success",
});
```

## Complete Component List

### Form & Input

1. field
2. fieldset
3. form
4. form-tanstack
5. input
6. label
7. number-field
8. phone-input

### Selection

9. checkbox
10. checkbox-group
11. radio-group
12. select
13. combobox
14. autocomplete
15. switch
16. toggle
17. toggle-group

### Layout & Navigation

18. accordion
19. breadcrumb
20. menu
21. menubar
22. navigation-menu
23. scroll-area
24. separator
25. tabs

### Buttons

26. button
27. toolbar

### Dialogs & Overlays

28. dialog
29. alert-dialog
30. sheet
31. popover
32. context-menu

### Data Display

33. avatar
34. badge
35. meter
36. progress
37. preview-card
38. slider
39. tooltip

### Utilities

40. use-toast

## Features

- Built on @base-ui-components/react for headless, accessible UI
- Full WCAG 2.1 compliance
- Keyboard navigation support
- Focus management
- Screen reader friendly
- React Hook Form integration
- TanStack Form integration
- Phone number validation with country codes
- Size variants (sm, md, lg)
- Multiple color variants
- Dark mode support
- TypeScript support with full type definitions
- Styled with Tailwind CSS using CVA
- Customizable via className prop

## Dependencies

- `@base-ui-components/react` (1.0.0-beta.6) - Headless UI primitives
- `@tanstack/react-form` (^1.26.0) - Form state management
- `react-phone-number-input` (^3.4.14) - Phone input validation
- `@pelatformui/general` (>=0.1.0) - Styling utilities
- `lucide-react` (>=0.5.0) - Icons
- `react-hook-form` (>=7.5.0) - Form validation

## License

MIT
