/**
 * Utility functions for CSS class name management
 * Provides optimized class name merging with Tailwind CSS conflict resolution
 * Essential for component styling and conditional class application
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind class names, resolving any conflicts.
 * This utility combines clsx for conditional classes with tailwind-merge
 * to properly handle Tailwind CSS class conflicts.
 *
 * @param inputs - An array of class names, objects, or arrays to merge
 * @returns A string of merged and optimized class names
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
