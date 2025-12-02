import type { ComponentType, ReactNode } from "react";

/**
 * Base props interface for all components
 * Includes common properties used across multiple components
 */
export interface BaseComponentProps {
  /** Child elements to render inside the component */
  children: ReactNode;
  /** Additional CSS classes for the component */
  className?: string;
}

/**
 * Image component type definition
 * Defines the interface for image components used throughout the application
 */
export type ImageComponent = ComponentType<{
  /** Source URL of the image */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Additional CSS classes */
  className?: string;
  /** Width of the image */
  width?: number;
  /** Height of the image */
  height?: number;
}>;

/**
 * Link component type definition
 * Defines the interface for link components used throughout the application
 */
export type LinkComponent = ComponentType<{
  /** Link content */
  children: ReactNode;
  /** Destination URL */
  href: string;
  /** Target attribute */
  target?: "_blank" | "_self" | "_parent" | "_top";
  /** Additional CSS classes */
  className?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}>;
