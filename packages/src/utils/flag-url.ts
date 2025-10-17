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
  const baseUrl = 'https://assets.pelatform.com/media/flags';
  const flagCode = flag.toLowerCase();

  return `${baseUrl}/${flagCode}.svg`;
}
