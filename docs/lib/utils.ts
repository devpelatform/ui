/**
 * Utility function to get the correct image path for both local development and GitHub Pages
 * @param imagePath - The image path starting with /media/
 * @returns The correct path with basePath prefix in production
 */
export function getImagePath(imagePath: string): string {
  // In production (GitHub Pages), we need to add the basePath prefix
  if (process.env.NODE_ENV === 'production') {
    return `/ui${imagePath}`;
  }

  // In development, use the path as is
  return imagePath;
}
