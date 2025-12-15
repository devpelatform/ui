/**
 * Language Switcher Component
 * Provides UI to switch between locales with flexible, prop-driven data.
 * Supports a toggle button or a dropdown submenu, names, and flags.
 */

"use client";

import { useTransition } from "react";
import { GlobeIcon, LanguagesIcon } from "lucide-react";

import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@pelatform/ui.default";
import { cn, getFlagUrl } from "@pelatform/utils";
import { DefaultImage, type SharedImage } from "../utils/shared";

/**
 * Locale option used by the LanguageSwitcher
 */
export interface LocaleOption {
  /** Locale code, e.g. 'en', 'id' */
  code: string;
  /** Human readable language name */
  name: string;
  /** Optional flag code to render, e.g. 'us', 'id' */
  flag?: string;
  /** Optional currency code associated with the locale */
  currency?: string;
}

/**
 * Props for the LanguageSwitcher component (prop-driven)
 */
export interface LanguageSwitcherProps extends SharedImage {
  /** Additional CSS classes */
  className?: string;
  /** UI type: standalone dropdown or submenu dropdown */
  type?: "dropdown" | "sub-dropdown";
  /** Button variant style (for toggle type) */
  variant?: "ghost" | "outline" | "secondary";
  /** Button size (for toggle type) */
  size?: "sm" | "md" | "lg";
  /** Whether to show language names */
  showNames?: boolean;
  /** Whether to show flag icons */
  showFlags?: boolean;
  /** Label text for the dropdown trigger; defaults to 'Language' */
  label?: string;
  /** Whether i18n is enabled; if false and <=1 locales, render null */
  i18nEnabled?: boolean;
  /** Current active locale code */
  currentLocale: string;
  /** Available locales to render */
  locales: LocaleOption[];
  /** Handler called when a new locale is selected */
  onLocaleChange: (newLocale: string) => void | Promise<void>;
  /** Custom flags asset url */
  customFlagUrl?: boolean;
}

export function LanguageSwitcher({
  className,
  type = "dropdown",
  variant = "ghost",
  size = "md",
  showNames = true,
  showFlags = true,
  label = "Language",
  i18nEnabled = true,
  currentLocale,
  locales,
  onLocaleChange,
  customFlagUrl = false,
  Image = DefaultImage,
}: LanguageSwitcherProps) {
  const [isPending, startTransition] = useTransition();

  const languages = locales ?? [];
  const currentLanguage = languages.find((l) => l.code === currentLocale);

  function handleLanguageChange(newLocale: string) {
    if (newLocale === currentLocale) return;
    startTransition(() => {
      const maybePromise = onLocaleChange?.(newLocale);
      // If a promise is returned, we don't need special handling here;
      // transition will keep the button in a pending state during updates.
      return maybePromise;
    });
  }

  // Don't render if i18n is disabled and only one language is available
  if (!i18nEnabled && (languages?.length ?? 0) <= 1) {
    return null;
  }

  if (type === "dropdown") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={variant}
            size={size}
            className={cn(
              "group/toggle size-8 px-0 text-foreground ring-0! focus:outline-none! focus:ring-0! focus-visible:outline-none! focus-visible:ring-0! focus-visible:ring-offset-0!",
              isPending && "cursor-not-allowed opacity-50",
              className,
            )}
            disabled={isPending}
          >
            <LanguagesIcon className="size-4" />
            <span className="sr-only">
              {isPending ? "Changing language..." : "Language dropdown"}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="min-w-[150px]"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={cn("gap-2", currentLocale === lang.code && "bg-accent")}
            >
              {showFlags && lang.flag ? (
                <Image
                  src={customFlagUrl ? lang.flag : getFlagUrl(lang.flag)}
                  alt={`${lang.name} flag`}
                  className="size-4 rounded-full object-cover"
                  width={24}
                  height={24}
                />
              ) : showFlags ? (
                <GlobeIcon className="size-4" />
              ) : null}
              {showNames && <span className="text-sm">{lang.name}</span>}
              {currentLocale === lang.code && (
                <span className="ms-auto text-muted-foreground text-xs">✓</span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger
        className={cn(
          "flex items-center gap-2 data-[state=open]:**:data-[slot=badge]:border-input **:data-[slot=dropdown-menu-sub-trigger-indicator]:hidden hover:**:data-[slot=badge]:border-input",
          className,
        )}
      >
        <GlobeIcon className="size-4" />
        <span className="relative flex grow items-center justify-between gap-2">
          {label}
          {currentLanguage && (
            <Badge appearance="outline" className="absolute end-0 top-1/2 -translate-y-1/2">
              {currentLanguage.name}
              {showFlags && currentLanguage.flag && (
                <Image
                  src={customFlagUrl ? currentLanguage.flag : getFlagUrl(currentLanguage.flag)}
                  alt={currentLanguage.name}
                  className="ms-1 size-3.5 rounded-full"
                  width={24}
                  height={24}
                />
              )}
            </Badge>
          )}
        </span>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="w-48">
        <DropdownMenuRadioGroup
          value={currentLocale}
          onValueChange={(value) => handleLanguageChange(value)}
        >
          {languages.map((item) => (
            <DropdownMenuRadioItem
              key={item.code}
              value={item.code}
              className="flex items-center gap-2"
            >
              {showFlags && item.flag ? (
                <Image
                  src={customFlagUrl ? item.flag : getFlagUrl(item.flag)}
                  alt={`${item.name} flag`}
                  className="size-4 rounded-full object-cover"
                  width={24}
                  height={24}
                />
              ) : showFlags ? (
                <GlobeIcon className="size-4" />
              ) : null}
              <span>{item.name}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
