/**
 * Get the client's public IP address using external services.
 *
 * This utility is intended for client-side usage only (it checks for `window`).
 * It attempts multiple providers for resiliency and normalizes the response
 * to a simple string. If all providers fail or the environment is not a
 * browser, it resolves to `'unknown'`.
 *
 * Providers queried (in order):
 * - `https://api.ipify.org?format=json`
 * - `https://ipapi.co/json/`
 * - `https://api.ip.sb/jsonip`
 *
 * @returns Promise that resolves to an IP address string or `'unknown'` if not available
 *
 * @example
 * ```ts
 * import { getIPAddress } from "@pelatform/ui/utils/ip";
 *
 * const ip = await getIPAddress();
 * // e.g., "203.0.113.42" or "unknown"
 *
 * // Example in a React component
 * // useEffect(() => {
 * //   getIPAddress().then(setIp);
 * // }, []);
 * ```
 */
export async function getIPAddress(): Promise<string> {
  if (typeof window === "undefined") {
    return "unknown";
  }

  try {
    // Try multiple IP detection services for reliability
    const services = [
      "https://api.ipify.org?format=json",
      "https://ipapi.co/json/",
      "https://api.ip.sb/jsonip",
    ];

    for (const service of services) {
      try {
        const response = await fetch(service, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Different services return IP in different fields
          const ip = data.ip || data.query || data.ipAddress;
          if (ip && typeof ip === "string") {
            return ip;
          }
        }
      } catch (serviceError) {
        // Continue to next service if this one fails
        console.warn(`IP service ${service} failed:`, serviceError);
      }
    }

    return "unknown";
  } catch (error) {
    console.error("Failed to get client IP:", error);
    return "unknown";
  }
}
