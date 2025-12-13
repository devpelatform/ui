/**
 * DownloadFile Component
 * Provides a styled download button for file downloads in MDX content
 * Features download icon and external link handling
 */

"use client";

import { DownloadIcon } from "lucide-react";

import { Button } from "@pelatform/ui.default";
import type { BaseComponentProps } from "@pelatform/ui.general";
import { cn } from "@pelatform/utils";

/**
 * DownloadFile Component
 *
 * A styled download button component that opens files in a new tab
 * with proper security attributes. Features a download icon and
 * rounded button styling.
 *
 * @param props - Component props
 * @param props.children - Button label or content
 * @param props.href - URL of the file to download
 * @param props.className - Additional CSS classes
 * @returns JSX element with download button
 *
 * @example
 * ```tsx
 * // Basic file download
 * <DownloadFile href="/files/document.pdf">
 *   Download PDF
 * </DownloadFile>
 *
 * // Custom styling
 * <DownloadFile
 *   href="/assets/template.zip"
 *   className="bg-blue-600 hover:bg-blue-700"
 * >
 *   Download Template
 * </DownloadFile>
 *
 * // Multiple download options
 * <div className="flex gap-4">
 *   <DownloadFile href="/files/guide.pdf">
 *     User Guide (PDF)
 *   </DownloadFile>
 *   <DownloadFile href="/files/guide.docx">
 *     User Guide (Word)
 *   </DownloadFile>
 * </div>
 *
 * // In MDX content
 * Here's the latest version of our software:
 *
 * <DownloadFile href="/releases/app-v2.1.0.zip">
 *   Download v2.1.0
 * </DownloadFile>
 * ```
 */
export function DownloadFile({ children, className, href }: BaseComponentProps & { href: string }) {
  return (
    <div className="inline-flex pb-4">
      <Button size="lg" className={cn("rounded-full", className)}>
        <a href={href} target="_blank" rel="noopener noreferrer">
          <DownloadIcon className="mr-2 size-5" />
          {children}
        </a>
      </Button>
    </div>
  );
}
