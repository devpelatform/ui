/**
 * Auth Layout Component
 * Provides a centered authentication layout with optional logo and card container.
 * Perfect for login/register pages and auth flows.
 */

"use client";

import type { ReactNode } from "react";

import { Card, CardContent } from "@pelatform/ui.default";
import type { BaseComponentProps } from "@pelatform/ui.general";
import { cn } from "@pelatform/utils";

/**
 * LayoutAuth Component
 *
 * A centered authentication page layout that vertically and horizontally
 * centers its content. Optionally renders a `logo` above the card.
 *
 * @param props - Component props
 * @returns JSX element containing the authentication layout
 *
 * @example
 * ```tsx
 * <LayoutAuth logo={<MyLogo />}>
 *   <LoginForm />
 * </LayoutAuth>
 * ```
 */
export function LayoutAuth({
  children,
  className,
  logo,
}: BaseComponentProps & { logo?: ReactNode }) {
  return (
    <div
      className={cn("flex min-h-screen grow flex-col items-center justify-center p-4", className)}
    >
      {logo && <div className="m-5">{logo}</div>}
      <Card className="w-full max-w-md">
        <CardContent className="p-6">{children}</CardContent>
      </Card>
    </div>
  );
}
