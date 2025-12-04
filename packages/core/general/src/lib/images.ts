/**
 * Image processing utilities for web applications
 * Provides functions to resize, crop, and encode image files using browser APIs
 */

/**
 * Resize and crop an image to a centered square of the specified size
 *
 * Processing steps:
 * - Load the image from the given `File`
 * - Create a square canvas with `size x size`
 * - Compute centered crop region based on the shortest image edge
 * - Draw the cropped region to the canvas and export with desired format
 *
 * @param file The source image file to process
 * @param name The base name (without extension) for the output file
 * @param size Target square size in pixels (width and height)
 * @param extension Output image extension (e.g., "png", "jpeg", "webp")
 * @returns A new `File` containing the processed image in the requested format
 */
export async function resizeAndCropImage(
  file: File,
  name: string,
  size: number,
  extension: string,
): Promise<File> {
  const image = await loadImage(file);

  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;

  const ctx = canvas.getContext("2d");

  const minEdge = Math.min(image.width, image.height);

  const sx = (image.width - minEdge) / 2;
  const sy = (image.height - minEdge) / 2;
  const sWidth = minEdge;
  const sHeight = minEdge;

  ctx?.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, size, size);

  const resizedImageBlob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, `image/${extension}`),
  );

  return new File([resizedImageBlob as BlobPart], `${name}.${extension}`, {
    type: `image/${extension}`,
  });
}

/**
 * Load a `File` into an `HTMLImageElement` using `FileReader`
 *
 * Behavior:
 * - Reads the file as a Data URL and assigns it to `Image.src`
 * - Resolves once the image has fully loaded
 * - Rejects if the image fails to load
 *
 * @param file The image file to read and load
 * @returns A promise that resolves to an `HTMLImageElement` ready for drawing
 */
export async function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      image.src = e.target?.result as string;
    };

    image.onload = () => resolve(image);
    image.onerror = (err) => reject(err);

    reader.readAsDataURL(file);
  });
}

/**
 * Convert a `File` to a Base64-encoded Data URL string
 *
 * @param file The file to convert
 * @returns A promise that resolves to a Base64 Data URL string
 */
export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
