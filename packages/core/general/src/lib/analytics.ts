/**
 * Interface for event tracking parameters
 * Defines the structure for tracking events in Google Analytics
 */
interface EventProps {
  /** Event name to be tracked (required, non-empty string) */
  name: string;
  /** Optional properties/attributes for the event */
  properties?: Record<string, string | number | boolean>;
}

/**
 * Global declaration for Google Analytics gtag function
 * This extends the Window interface to include the gtag function
 * that's injected by the Google Analytics script
 */
declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "set",
      targetId: string,
      config?: Record<string, string | number | boolean | object | null | undefined>,
    ) => void;
  }
}

/**
 * Tracks an event in Google Analytics with proper error handling and validation.
 *
 * @param params - Event parameters
 * @param params.name - Event name (required, non-empty string)
 * @param params.properties - Optional event properties
 */
export const googleTrackEvent = ({ name, properties }: EventProps) => {
  // Validate required parameters
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    console.warn("Analytics: Event name is required and must be a non-empty string");
    return;
  }

  // Validate properties if provided
  if (properties && typeof properties !== "object") {
    console.warn("Analytics: Properties must be an object");
    return;
  }

  try {
    // Track in Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      // GA4 recommended event structure
      window.gtag("event", name.trim(), {
        ...properties,
        // GA4 recommended parameters
        event_category: properties?.category || "engagement",
        event_label: properties?.label,
        value: properties?.value,
      });
    }
  } catch (error) {
    console.error("Analytics: Failed to track event", { name, error });
  }
};
