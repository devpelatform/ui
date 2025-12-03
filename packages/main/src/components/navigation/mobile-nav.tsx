/**
 * Mobile Navigation Component
 * Provides a drawer-based navigation menu optimized for mobile devices
 * with collapsible menu items and meta color management
 */

"use client";

import { useCallback, useState } from "react";
import { ArrowUpRightIcon, ChevronDownIcon, MenuIcon } from "lucide-react";

import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@pelatform/ui.default";
import { type BaseComponentProps, cn } from "@pelatform/ui.general";
import { useMetaColor } from "../../hooks/use-meta-color";
import {
  DefaultLink,
  DefaultNavigate,
  type SharedLink,
  type SharedNavigate,
} from "../utils/shared";
import { handleMenuClick, type NavItem } from "./main-nav";

/**
 * MobileNav Component
 *
 * A mobile-optimized navigation component that uses a drawer interface
 * for space-efficient menu display on small screens. Automatically
 * manages meta theme color changes when the drawer opens/closes.
 *
 * Features:
 * - Drawer-based interface for mobile screens
 * - Meta theme color management
 * - Responsive design (hidden on desktop)
 * - Accessible with proper ARIA labels
 * - Smooth open/close animations
 * - Scrollable content area
 *
 * @param props - Component props
 * @returns JSX element containing the mobile navigation drawer
 *
 * @example
 * ```tsx
 * // Basic usage with navigation items
 * <MobileNav>
 *   <div className="space-y-4">
 *     <MobileNavItemRenderer
 *       item={{ title: 'Home', href: '/' }}
 *       onOpenChange={setOpen}
 *       level={1}
 *     />
 *     <MobileNavItemRenderer
 *       item={{
 *         title: 'Products',
 *         children: [
 *           { title: 'Web Apps', href: '/products/web' },
 *           { title: 'Mobile Apps', href: '/products/mobile' }
 *         ]
 *       }}
 *       onOpenChange={setOpen}
 *       level={1}
 *     />
 *   </div>
 * </MobileNav>
 *
 * // With custom content
 * <MobileNav className="border-l border-gray-200">
 *   <div className="space-y-6">
 *     <NavigationItems />
 *     <UserProfile />
 *     <ThemeToggle />
 *   </div>
 * </MobileNav>
 * ```
 */
export function MobileNav({ children, className }: BaseComponentProps) {
  const { setMetaColor, metaColor } = useMetaColor();
  const [open, setOpen] = useState(false);

  const onOpenChange = useCallback(
    (open: boolean) => {
      setOpen(open);
      setMetaColor(open ? "#09090b" : metaColor);
    },
    [setMetaColor, metaColor],
  );

  return (
    <div className={cn("flex items-center gap-2.5 md:hidden", className)}>
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>
          <Button variant="ghost" className="group/toggle size-8 px-0 text-foreground">
            <MenuIcon />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[60svh] p-0">
          <DrawerTitle className="sr-only">Mobile menu</DrawerTitle>
          <div className="overflow-auto p-6">{children}</div>
          <DrawerDescription className="sr-only">Mobile menu</DrawerDescription>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

interface MobileNavItemRendererProps extends SharedLink, SharedNavigate {
  item: NavItem;
  pathname: string | null;
  level: number;
  onOpenChange: (open: boolean) => void;
}

export function MobileNavItemRenderer({
  Link = DefaultLink,
  navigate = DefaultNavigate,
  item,
  pathname,
  level,
  onOpenChange,
}: MobileNavItemRendererProps) {
  const router = navigate;
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  // Check if the current item or any of its descendants is active
  const isActive = hasChildren
    ? (item.children?.some(
        (child) =>
          child.href === pathname ||
          (child.href !== "/" && child.href && pathname?.startsWith(child.href)) ||
          (child.children?.some(
            (grandchild) =>
              grandchild.href === pathname ||
              (grandchild.href !== "/" && grandchild.href && pathname?.startsWith(grandchild.href)),
          ) ??
            false),
      ) ?? false)
    : item.href === pathname || (item.href !== "/" && item.href && pathname?.startsWith(item.href));

  if (hasChildren && level <= 3) {
    console.log(item);
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger
          className={cn(
            "flex w-full cursor-pointer items-center gap-1 text-sm transition-colors",
            isOpen ? "text-foreground" : "text-foreground/60",
          )}
        >
          {item.icon && <item.icon />}
          {item.title}
          <ChevronDownIcon
            className={cn(
              "ml-auto size-3.5 opacity-60 transition-transform",
              isOpen && "rotate-180",
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className={cn("flex flex-col space-y-2.5 pt-3", `ps-5`)}>
            {item.children!.map((child) => (
              <MobileNavItemRenderer
                key={child.title}
                item={child}
                pathname={pathname}
                level={level + 1}
                onOpenChange={onOpenChange}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Link
      href={item.href || "#"}
      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={() => {
        if (!item.external && item.href) {
          router(item.href.toString());
        }
        onOpenChange?.(false);
        handleMenuClick(item);
      }}
      className={cn(
        "inline-flex items-center gap-1 text-sm transition-colors",
        isActive ? "text-foreground" : "text-foreground/60",
      )}
    >
      {item.icon && <item.icon />}
      {item.title}
      {item.external && <ArrowUpRightIcon className="ml-1 size-3.5 opacity-60" />}
    </Link>
  );
  // return (
  //   <MobileLink
  //     href={item.href || '#'}
  //     external={item.external}
  //     onOpenChange={onOpenChange}
  //     onClick={() => handleMenuClick(item)}
  //     className={cn(
  //       'inline-flex items-center transition-colors text-sm gap-1',
  //       isActive ? 'text-foreground' : 'text-foreground/60',
  //     )}
  //   >
  //     {item.icon}
  //     {item.title}
  //     {item.external && <ArrowUpRight className="ml-1 size-3.5 opacity-60" />}
  //   </MobileLink>
  // );
}

// interface MobileLinkProps extends LinkProps {
//   onOpenChange?: (open: boolean) => void;
//   children: ReactNode;
//   className?: string;
//   external?: boolean;
// }

// function MobileLink({
//   href,
//   external,
//   onOpenChange,
//   className,
//   children,
//   ...props
// }: MobileLinkProps) {
//   const router = useRouter();

//   return (
//     <Link
//       href={href}
//       {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
//       onClick={() => {
//         { !external && router.push(href.toString()) };
//         onOpenChange?.(false);
//       }}
//       className={cn('text-base', className)}
//       {...props}
//     >
//       {children}
//     </Link>
//   );
// }
