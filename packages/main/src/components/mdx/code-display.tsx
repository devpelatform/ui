/**
 * CodeDisplay Component
 * Displays code examples alongside their rendered components in a side-by-side layout
 * Perfect for documentation and component showcases in MDX content
 */

"use client";

import type { ReactNode } from "react";

/**
 * CodeDisplay Component
 *
 * A responsive layout component that displays code examples alongside
 * their rendered output. Features a two-column layout on desktop
 * and stacked layout on mobile devices.
 *
 * @param props - Component props
 * @param props.children - Code content (typically syntax-highlighted)
 * @param props.component - The rendered component to showcase
 * @returns JSX element with side-by-side code and component display
 *
 * @example
 * ```tsx
 * // Basic usage in MDX documentation
 * <CodeDisplay component={<Button>Click me</Button>}>
 *   ```tsx
 *   <Button>Click me</Button>
 *   ```
 * </CodeDisplay>
 *
 * // With complex component
 * <CodeDisplay
 *   component={
 *     <Card className="w-64">
 *       <CardHeader>
 *         <CardTitle>Example Card</CardTitle>
 *       </CardHeader>
 *       <CardContent>
 *         <p>Card content here</p>
 *       </CardContent>
 *     </Card>
 *   }
 * >
 *   ```tsx
 *   <Card className="w-64">
 *     <CardHeader>
 *       <CardTitle>Example Card</CardTitle>
 *     </CardHeader>
 *     <CardContent>
 *       <p>Card content here</p>
 *     </CardContent>
 *   </Card>
 *   ```
 * </CodeDisplay>
 *
 * // Interactive component showcase
 * <CodeDisplay component={<InteractiveDemo />}>
 *   ```tsx
 *   function InteractiveDemo() {
 *     const [count, setCount] = useState(0);
 *     return (
 *       <Button onClick={() => setCount(count + 1)}>
 *         Clicked {count} times
 *       </Button>
 *     );
 *   }
 *   ```
 * </CodeDisplay>
 * ```
 */
export function CodeDisplay({
  children,
  component,
}: {
  children: ReactNode;
  component: ReactNode;
}) {
  return (
    <div className="my-6 grid grid-cols-1 gap-6 overflow-hidden md:grid-cols-2">
      <div className="w-full overflow-hidden">{children}</div>
      <div className="my-6 flex w-full items-center justify-center rounded-lg border bg-gray-50 dark:bg-gray-900">
        {component}
      </div>
    </div>
  );
}
