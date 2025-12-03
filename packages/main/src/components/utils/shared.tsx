/**
 * Shared Component Types and Default Implementations
 * Provides reusable component interfaces and default implementations
 * for common UI elements like images, links, and navigation
 */

import type { ImageComponent, LinkComponent } from "@pelatform/ui.general";

/**
 * Interface for components that accept a custom Image component
 * Allows injection of custom image implementations (e.g., Next.js Image)
 */
export interface SharedImage {
  /** Custom Image component implementation */
  Image?: ImageComponent;
}

/**
 * Interface for components that accept a custom Link component
 * Allows injection of custom link implementations (e.g., Next.js Link)
 */
export interface SharedLink {
  /** Custom Link component implementation */
  Link?: LinkComponent;
}

/**
 * Interface for components that accept a custom navigation function
 * Allows injection of custom navigation implementations (e.g., Next.js router)
 */
export interface SharedNavigate {
  /** Custom navigation function */
  navigate?: (href: string) => void;
}

/**
 * Default Image Component
 *
 * A basic HTML img element implementation that serves as the default
 * when no custom Image component is provided. Supports standard
 * image attributes and CSS classes.
 *
 * @param props - Image component props
 * @param props.src - Source URL of the image
 * @param props.alt - Alt text for accessibility
 * @param props.className - Additional CSS classes
 * @returns JSX element containing a standard img tag
 *
 * @example
 * ```tsx
 * // Basic usage
 * <DefaultImage
 *   src="/images/logo.png"
 *   alt="Company Logo"
 *   className="w-32 h-auto"
 * />
 * ```
 */
export const DefaultImage: ImageComponent = ({ src, alt, className }) => (
  <img src={src} alt={alt} className={className} />
);

/**
 * Default Link Component
 *
 * A basic HTML anchor element implementation that serves as the default
 * when no custom Link component is provided. Supports standard
 * link attributes and CSS classes.
 *
 * @param props - Link component props
 * @param props.href - Destination URL
 * @param props.className - Additional CSS classes
 * @param props.children - Link content
 * @returns JSX element containing a standard anchor tag
 *
 * @example
 * ```tsx
 * // Basic usage
 * <DefaultLink
 *   href="/about"
 *   className="text-blue-600 hover:underline"
 * >
 *   About Us
 * </DefaultLink>
 * ```
 */
export const DefaultLink: LinkComponent = ({ href, className, children }) => (
  <a href={href} className={className}>
    {children}
  </a>
);

/**
 * Default Navigation Function
 *
 * A basic navigation implementation using window.location.href
 * that serves as the default when no custom navigation function
 * is provided. Performs a full page navigation.
 *
 * @param href - Destination URL to navigate to
 *
 * @example
 * ```tsx
 * // Basic usage
 * const handleNavigation = () => {
 *   DefaultNavigate('/dashboard');
 * };
 *
 * // In a component
 * <button onClick={() => DefaultNavigate('/contact')}>
 *   Contact Us
 * </button>
 * ```
 */
export const DefaultNavigate = (href: string) => {
  window.location.href = href;
};
