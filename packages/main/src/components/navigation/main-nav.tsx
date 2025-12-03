/**
 * Main Navigation Component
 * Provides a responsive navigation menu with dropdown support, active state detection,
 * and analytics tracking for user interactions
 */

"use client";

import { ArrowUpRightIcon, ChevronDownIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@pelatform/ui.default";
import { cn, googleTrackEvent } from "@pelatform/ui.general";
import { DefaultLink, type SharedLink } from "../utils/shared";

/**
 * Interface defining the structure of a navigation item
 */
export interface NavItem {
  /** Display text for the navigation item */
  title: string;
  /** URL path for the navigation item */
  href?: string;
  /** Whether the link opens in a new tab */
  external?: boolean;
  /** Optional icon to display alongside the title */
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Child navigation items for dropdown menus */
  children?: NavItem[];
}

/**
 * Props interface for the MainNav component
 */
export interface NavigationProps extends SharedLink {
  /** Current pathname */
  pathname: string;
  /** Array of navigation items to display */
  items: NavItem[];
  /** Additional CSS classes for the navigation container */
  className?: string;
}

/**
 * MainNav Component
 *
 * A responsive navigation component that supports multi-level dropdown menus,
 * active state detection, and analytics tracking. Hidden on mobile devices
 * and typically used in the site header.
 *
 * Features:
 * - Multi-level dropdown menus (up to 3 levels)
 * - Active state detection for current page
 * - External link indicators
 * - Analytics tracking for menu interactions
 * - Responsive design (hidden on mobile)
 * - Keyboard navigation support
 *
 * @param props - Component props
 * @returns JSX element containing the navigation menu
 *
 * @example
 * ```tsx
 * const navItems: NavItem[] = [
 *   {
 *     title: 'Home',
 *     href: '/',
 *   },
 *   {
 *     title: 'Products',
 *     children: [
 *       { title: 'Web Apps', href: '/products/web' },
 *       { title: 'Mobile Apps', href: '/products/mobile' },
 *       {
 *         title: 'Enterprise',
 *         children: [
 *           { title: 'SaaS Solutions', href: '/products/enterprise/saas' },
 *           { title: 'Custom Development', href: '/products/enterprise/custom' }
 *         ]
 *       }
 *     ]
 *   },
 *   {
 *     title: 'Documentation',
 *     href: 'https://docs.example.com',
 *     external: true,
 *     icon: <IconBook className="w-4 h-4" />
 *   }
 * ];
 *
 * <MainNav items={navItems} />
 * ```
 */
export function MainNav({ Link = DefaultLink, pathname, items, className }: NavigationProps) {
  return (
    <div className={cn("mr-4 hidden items-center justify-center md:flex", className)}>
      <nav className="flex items-center gap-4 font-medium text-sm xl:gap-6">
        {items.map((item: NavItem) => (
          <NavItemRenderer Link={Link} key={item.title} item={item} pathname={pathname} level={1} />
        ))}
      </nav>
    </div>
  );
}

interface NavItemRendererProps extends SharedLink {
  item: NavItem;
  pathname: string | null;
  level: number;
}

function NavItemRenderer({ Link = DefaultLink, item, pathname, level }: NavItemRendererProps) {
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
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "inline-flex cursor-pointer items-center gap-1 transition-colors hover:text-foreground/80 focus-visible:outline-0",
              isActive ? "text-foreground" : "text-foreground/60",
            )}
          >
            {item.icon && <item.icon />}
            {item.title}
            <ChevronDownIcon className="size-3.5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="min-w-[150px] overflow-visible"
          side="bottom"
          align="start"
          sideOffset={15}
          alignOffset={-10}
        >
          {item.children?.map((child) => (
            <ChildNavItemRenderer
              key={child.title}
              item={child}
              pathname={pathname}
              level={level + 1}
            />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link
      href={item.href ?? "#"}
      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "relative inline-flex items-center gap-1 transition-colors hover:text-foreground/80",
        isActive ? "text-foreground" : "text-foreground/60",
      )}
      onClick={() => handleMenuClick(item)}
    >
      {item.icon && <item.icon />}
      {item.title}
      {item.external && <ArrowUpRightIcon className="size-3.5 opacity-60" />}
    </Link>
  );
}

function ChildNavItemRenderer({ Link = DefaultLink, item, pathname, level }: NavItemRendererProps) {
  const hasChildren = item.children && item.children.length > 0;
  const isChildActive =
    item.href === pathname ||
    (item.href !== "/" && item.href && pathname?.startsWith(item.href)) ||
    (hasChildren &&
      (item.children?.some(
        (grandchild) =>
          grandchild.href === pathname ||
          (grandchild.href !== "/" && grandchild.href && pathname?.startsWith(grandchild.href)),
      ) ??
        false));

  if (hasChildren && level <= 3) {
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger
          className={cn(
            "flex w-full items-center justify-between text-muted-foreground hover:text-foreground",
            isChildActive && "font-medium text-foreground",
          )}
        >
          {item.icon && <item.icon />}
          {item.title}
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="min-w-[150px]">
          {item.children?.map((child) => (
            <ChildNavItemRenderer
              key={child.title}
              item={child}
              pathname={pathname}
              level={level + 1}
            />
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    );
  }

  return (
    <DropdownMenuItem asChild>
      <Link
        href={item.href || ""}
        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={cn(
          "block w-full cursor-pointer transition-colors",
          isChildActive
            ? "font-medium text-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
        onClick={() => handleMenuClick(item)}
      >
        {item.icon && <item.icon />}
        {item.title}
        {item.external && <ArrowUpRightIcon className="size-3.5 opacity-60" />}
      </Link>
    </DropdownMenuItem>
  );
}

export function handleMenuClick(item: NavItem) {
  googleTrackEvent({
    name: `site_header_menu_${item.title.toLowerCase().replace(/\s+/g, "_")}_link_click`,
    properties: {
      menu_item: item.title,
      menu_path: item.href || "#",
      is_external: !!item.external,
      category: "navigation",
      label: `Header Menu ${item.title} Click`,
    },
  });
}
