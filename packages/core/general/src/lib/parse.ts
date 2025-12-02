/**
 * Normalize a pathname string.
 *
 * - Ensures it always starts with '/'
 * - Collapses multiple slashes (e.g., `'//a///b'` becomes `'/a/b'`)
 * - Removes trailing slash except for root path (e.g., `'/login/'` becomes `'/login'`)
 *
 * @param input - Any path-like string
 * @returns A normalized path beginning with '/'
 *
 * @example
 * ```ts
 * import { normalizePath } from "@pelatform/ui/utils/parse";
 *
 * normalizePath("dashboard");       // "/dashboard"
 * normalizePath("//a///b");         // "/a/b"
 * normalizePath("/login/");         // "/login"
 * normalizePath("");                // "/"
 * ```
 */
export function normalizePath(input: string): string {
  if (!input) return "/";
  let p = input.trim();
  if (!p.startsWith("/")) p = `/${p}`;
  p = p.replace(/\/{2,}/g, "/");
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p;
}

/**
 * Interface for parsed request data
 */
export interface ParsedRequest {
  /** Normalized domain name (lowercase, without www) */
  domain: string;
  /** URL pathname (e.g., '/dashboard/users') */
  path: string;
  /** Full path including query parameters (e.g., '/dashboard/users?page=1') */
  fullPath: string;
  /** First path segment (e.g., 'dashboard' from '/dashboard/users') */
  key: string;
  /** Full path without leading slash (e.g., 'dashboard/users') */
  fullKey: string;
  /** Query parameters as object */
  searchParamsObj: Record<string, string>;
  /** Query parameters as string (e.g., '?page=1&limit=10') */
  searchParamsString: string;
}

/**
 * Parse and normalize a Next.js `NextRequest`.
 *
 * Extracts domain, normalized path, first segment key, full path, and
 * query parameters (both as object and as string). Handles international
 * characters via `decodeURIComponent` and normalizes the host by removing
 * a leading `www.`.
 *
 * @param req - The incoming Next.js `NextRequest`
 * @returns Parsed request data with normalized components
 *
 * @example
 * ```ts
 * import type { NextRequest } from "next/server";
 * import { parse } from "@pelatform/ui/utils/parse";
 *
 * export function middleware(req: NextRequest) {
 *   const { domain, path, fullPath, key } = parse(req);
 *
 *   console.log(domain);   // e.g., "api.pelatform.com"
 *   console.log(path);     // e.g., "/v1/users"
 *   console.log(fullPath); // e.g., "/v1/users?page=1"
 *   console.log(key);      // e.g., "v1"
 * }
 * ```
 *
 * @example
 * ```ts
 * // Handling international URLs
 * const { key, fullKey } = parse(req);
 * console.log(key);     // Decoded first path segment
 * console.log(fullKey); // Decoded full path
 * ```
 *
 * @example
 * ```ts
 * // Working with query parameters
 * const { searchParamsObj, searchParamsString } = parse(req);
 * // searchParamsObj -> { page: "1", limit: "10" }
 * // searchParamsString -> "?page=1&limit=10"
 * ```
 */
export const parse =
  // biome-ignore lint/suspicious/noExplicitAny: disable
  (req: any): ParsedRequest => {
    // Extract and normalize domain
    let domain = req.headers.get("host") as string;

    // Remove www. prefix and convert to lowercase for consistency
    domain = domain.replace(/^www\./, "").toLowerCase();

    // Extract pathname from URL (e.g., pelatform.com/stats/github -> /stats/github)
    const path = req.nextUrl.pathname;

    // Extract and process search parameters
    const searchParams = req.nextUrl.searchParams.toString();
    const searchParamsObj = Object.fromEntries(req.nextUrl.searchParams);
    const searchParamsString = searchParams.length > 0 ? `?${searchParams}` : "";

    // Construct full path including query parameters
    const fullPath = `${path}${searchParamsString}`;

    // Extract path components with proper URL decoding
    // This handles international characters (Hebrew, Arabic, Chinese, etc.)
    const pathSegments = path.split("/").filter(Boolean);
    const key = pathSegments.length > 0 ? decodeURIComponent(pathSegments[0]) : "";
    const fullKey = path.length > 1 ? decodeURIComponent(path.slice(1)) : "";

    return {
      domain,
      path,
      fullPath,
      key,
      fullKey,
      searchParamsObj,
      searchParamsString,
    };
  };
