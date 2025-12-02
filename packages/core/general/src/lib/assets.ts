/**
 * Assets URL Utility
 * Builds a fully-qualified CDN URL for a given assets path.
 * Useful for referencing illustrations and media from the Pelatform assets CDN.
 */

/**
 * Build a full CDN URL for a given assets path.
 *
 * @param path - Relative path to the asset (e.g., "media/illustrations/29.svg")
 * @returns A fully-qualified CDN URL string
 *
 * @example
 * ```ts
 * import { getAssetsUrl } from "@pelatform/ui/utils/assets-url";
 *
 * const url = getAssetsUrl("media/illustrations/29.svg");
 * // "https://assets.pelatform.com/media/illustrations/29.svg"
 * ```
 */
export function getAssetsUrl(path: string): string {
  const baseUrl = "https://assets.pelatform.com";

  return `${baseUrl}/${path}`;
}

/**
 * Build a CDN URL for a country flag SVG.
 *
 * The function lowercases the given ISO country code and returns a
 * fully-qualified URL pointing to the SVG flag hosted on the Pelatform
 * assets CDN.
 *
 * @param flag - ISO 3166-1 alpha-2 country code (e.g., "US", "ID", "GB")
 * @returns A URL string to the SVG flag on the CDN
 *
 * @example
 * ```ts
 * import { getFlagUrl } from "@pelatform/ui/utils/flag-url";
 *
 * const urlUs = getFlagUrl("US");
 * // "https://assets.pelatform.com/media/flags/us.svg"
 *
 * const urlId = getFlagUrl("id");
 * // "https://assets.pelatform.com/media/flags/id.svg"
 *
 * // Can be used directly in an <img /> or <Image /> component
 * // <img src={getFlagUrl("GB")} alt="United Kingdom flag" />
 * ```
 */
export function getFlagUrl(flag: string): string {
  const flagCode = flag.toLowerCase();

  return `${getAssetsUrl("media/flags")}/${flagCode}.svg`;
}
