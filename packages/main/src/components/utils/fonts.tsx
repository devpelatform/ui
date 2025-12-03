/**
 * Satoshi Font Utilities
 * Provides Satoshi font loading and CSS generation utilities
 * Loads the variable font from Pelatform CDN with optimal display settings
 */

/**
 * Satoshi font (local, variable), loaded from Pelatform CDN
 * Use for branding, headings, or special UI elements.
 * Supports weights 300–900, normal style, swap display.
 */
export const satoshiFontUrl = "https://assets.pelatform.com/fonts/satoshi/Satoshi-Variable.woff2";

/**
 * CSS font-face declaration for Satoshi font
 * Defines the font family with variable weight support and optimal loading
 */
export const cssFontFace = `
  @font-face {
    font-family: 'Satoshi';
    src: url('${satoshiFontUrl}') format('woff2');
    font-weight: 300 900;
    font-style: normal;
    font-display: swap;
  }
`;

/**
 * SatoshiFontCSS Component
 *
 * Injects the Satoshi font CSS into the document head.
 * Use this component in your app layout to load the Satoshi font.
 *
 * @returns JSX element containing the font CSS styles
 *
 * @example
 * ```tsx
 * // In your layout or app component
 * function Layout({ children }: { children: React.ReactNode }) {
 *   return (
 *     <html>
 *       <head>
 *         <SatoshiFontCSS />
 *       </head>
 *       <body className="font-satoshi">
 *         {children}
 *       </body>
 *     </html>
 *   );
 * }
 *
 * // Or use in a specific component
 * function BrandedSection() {
 *   return (
 *     <>
 *       <SatoshiFontCSS />
 *       <h1 style={{ fontFamily: 'Satoshi' }}>
 *         Branded Heading
 *       </h1>
 *     </>
 *   );
 * }
 * ```
 */
export function SatoshiFontCSS() {
  // biome-ignore lint/security/noDangerouslySetInnerHtml: disable
  return <style dangerouslySetInnerHTML={{ __html: cssFontFace }} />;
}
