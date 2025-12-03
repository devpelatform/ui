/**
 * Youtube Component
 * Embeds YouTube videos in MDX content with responsive design
 * Features 16:9 aspect ratio and rounded corners for consistent styling
 */

"use client";

/**
 * Youtube Component
 *
 * Embeds YouTube videos using an iframe with responsive design and
 * consistent styling. Automatically maintains 16:9 aspect ratio
 * and includes proper accessibility attributes.
 *
 * @param props - Component props
 * @param props.id - YouTube video ID (the part after 'v=' in YouTube URLs)
 * @returns JSX iframe element for YouTube video embedding
 *
 * @example
 * ```tsx
 * // Basic YouTube video embed
 * <Youtube id="dQw4w9WgXcQ" />
 *
 * // Extract ID from YouTube URL
 * // URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ
 * // ID: dQw4w9WgXcQ
 * <Youtube id="dQw4w9WgXcQ" />
 *
 * // In MDX content
 * Here's a tutorial video:
 *
 * <Youtube id="ScMzIvxBSi4" />
 *
 * // Multiple videos in sequence
 * <div className="space-y-8">
 *   <div>
 *     <h3>Introduction</h3>
 *     <Youtube id="intro-video-id" />
 *   </div>
 *   <div>
 *     <h3>Advanced Tutorial</h3>
 *     <Youtube id="advanced-video-id" />
 *   </div>
 * </div>
 *
 * // With surrounding content
 * ## Video Tutorial
 *
 * Watch this comprehensive guide to get started:
 *
 * <Youtube id="tutorial-video-id" />
 *
 * After watching the video, you can proceed to the next section.
 * ```
 */
export function Youtube({ id }: { id: string }) {
  return (
    <iframe
      src={`https://www.youtube.com/embed/${id}`}
      title={`YouTube video with ID ${id}`}
      style={{
        width: "100%",
        height: "auto",
        aspectRatio: "16/9",
        border: "none",
        borderRadius: ".75rem",
        overflow: "hidden",
      }}
      allowFullScreen
    />
  );
}
