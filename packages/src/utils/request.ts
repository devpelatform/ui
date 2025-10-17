// import { NextRequest } from 'next/server';

// import { getIPAddress } from './ip';

// /**
//  * Request utility helpers for server and client.
//  *
//  * Exposes small helpers to extract the client IP, user agent, and origin data
//  * from a `NextRequest`, plus a client-side variant that fetches the public IP.
//  */

// /**
//  * Resolve the client IP address from a Next.js request.
//  *
//  * Checks common proxy headers in order and falls back to `request.ip`.
//  * Handles multiple values in `x-forwarded-for` by taking the first item.
//  *
//  * Checked headers (in order):
//  * - `x-forwarded-for`
//  * - `x-real-ip`
//  * - `x-client-ip`
//  * - `cf-connecting-ip`
//  * - `x-cluster-client-ip`
//  * - `forwarded` (RFC 7239)
//  *
//  * @param request - The incoming `NextRequest`
//  * @returns The best-effort client IP address, or `'unknown'` if not resolvable
//  *
//  * @example
//  * ```ts
//  * import type { NextRequest } from 'next/server';
//  * import { getClientIP } from '@pelatform/ui/utils/request';
//  *
//  * export function middleware(req: NextRequest) {
//  *   const ip = getClientIP(req);
//  *   console.log(ip);
//  * }
//  * ```
//  */
// export function getClientIP(request: NextRequest): string {
//   const xForwardedFor = request.headers.get('x-forwarded-for');
//   if (xForwardedFor) {
//     const ips = xForwardedFor
//       .split(',')
//       .map((raw) =>
//         raw.trim().replace(/"/g, '').replace(/\[/g, '').replace(/\]/g, ''),
//       )
//       .filter(Boolean);
//     const clientIP = ips[0];
//     if (clientIP && clientIP !== 'unknown') {
//       return clientIP;
//     }
//   }

//   const headers = [
//     'x-real-ip',
//     'x-client-ip',
//     'cf-connecting-ip',
//     'x-cluster-client-ip',
//   ];

//   for (const header of headers) {
//     const ip = request.headers.get(header);
//     if (ip && ip !== 'unknown' && ip.trim() !== '') {
//       return ip.trim();
//     }
//   }

//   const forwarded = request.headers.get('forwarded');
//   if (forwarded) {
//     const forMatch = forwarded.match(/for=([^;,\s]+)/i);
//     if (forMatch && forMatch[1]) {
//       const ip = forMatch[1]
//         .replace(/"/g, '')
//         .replace(/\[/g, '')
//         .replace(/\]/g, '');
//       if (ip && ip !== 'unknown') {
//         return ip;
//       }
//     }
//   }

//   type RequestWithIp = NextRequest & { ip?: string };
//   const requestIP = (request as RequestWithIp).ip;
//   if (typeof requestIP === 'string' && requestIP !== 'unknown') {
//     return requestIP;
//   }

//   return 'unknown';
// }

// /**
//  * Read the user agent string from a request.
//  *
//  * @param request - The incoming `NextRequest`
//  * @returns The `user-agent` header value, or `'unknown'`
//  *
//  * @example
//  * ```ts
//  * const ua = getUserAgent(req);
//  * // e.g., "Mozilla/5.0 ..." or "unknown"
//  * ```
//  */
// export function getUserAgent(request: NextRequest): string {
//   return request.headers.get('user-agent') || 'unknown';
// }

// /**
//  * Derive origin-related headers from a request.
//  *
//  * Attempts to return a consistent `origin`, `referer`, and `host`. If the
//  * `origin` header is missing, it is constructed from `x-forwarded-proto` and
//  * `x-forwarded-host`/`host` when possible, or falls back to `request.nextUrl`.
//  *
//  * @param request - The incoming `NextRequest`
//  * @returns An object containing `origin`, `referer`, and `host`
//  *
//  * @example
//  * ```ts
//  * const { origin, referer, host } = getRequestOrigin(req);
//  * console.log(origin, referer, host);
//  * ```
//  */
// export function getRequestOrigin(request: NextRequest): {
//   origin: string;
//   referer: string;
//   host: string;
// } {
//   const referer = request.headers.get('referer') || 'unknown';
//   const xfProto = request.headers.get('x-forwarded-proto');
//   const xfHost = request.headers.get('x-forwarded-host');
//   const fallbackHost = request.nextUrl?.host;
//   const host =
//     xfHost || request.headers.get('host') || fallbackHost || 'unknown';

//   let origin = request.headers.get('origin');
//   if (!origin && xfProto && host && host !== 'unknown') {
//     origin = `${xfProto}://${host}`;
//   }
//   if (!origin && request.nextUrl?.origin) {
//     origin = request.nextUrl.origin;
//   }

//   return {
//     origin: origin || 'unknown',
//     referer,
//     host,
//   };
// }

// /**
//  * Summarize request info (server-side) from a `NextRequest`.
//  *
//  * Returns client IP, user agent, and the request pathname using `nextUrl`.
//  *
//  * @param request - The incoming `NextRequest`
//  * @returns Object with `ipAddress`, `userAgent`, and `pathname`
//  *
//  * @example
//  * ```ts
//  * import type { NextRequest } from 'next/server';
//  * import { getRequestInfo } from '@pelatform/ui/utils/request';
//  *
//  * export function middleware(req: NextRequest) {
//  *   const info = getRequestInfo(req);
//  *   console.log(info.pathname);
//  * }
//  * ```
//  */
// export function getRequestInfo(request: NextRequest) {
//   const ipAddress = getClientIP(request);
//   const userAgent = getUserAgent(request);
//   const pathname = request.nextUrl?.pathname || 'unknown';

//   return { ipAddress, userAgent, pathname };
// }

// /**
//  * Summarize request info (client-side) with async IP detection.
//  *
//  * Uses `window.navigator.userAgent` and `window.location.pathname` when
//  * available, and fetches public IP via `getIPAddress()`.
//  *
//  * @returns Promise resolving to `{ ipAddress, userAgent, pathname }`
//  *
//  * @example
//  * ```ts
//  * import { getRequestInfoClient } from '@pelatform/ui/utils/request';
//  *
//  * const info = await getRequestInfoClient();
//  * console.log(info.ipAddress);
//  * ```
//  * ```
//  */
// export async function getRequestInfoClient() {
//   const ipAddress = await getIPAddress();
//   const userAgent =
//     typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown';
//   const pathname =
//     typeof window !== 'undefined' ? window.location.pathname : 'unknown';

//   return { ipAddress, userAgent, pathname };
// }
