// /**
//  * Google Analytics (gtag.js) integration for Next.js App Router
//  *
//  * Features:
//  * - Loads GA via Next.js `<Script>` with `afterInteractive` strategy
//  * - Disables GA’s automatic page views and **manually** tracks SPA route changes
//  * - Sends `page_view` with `page_path`, `page_title`, and `page_location`
//  * - Works with a custom analytics wrapper (`googleTrackEvent`)
//  */

// 'use client';

// import { useEffect } from 'react';
// import { usePathname, useSearchParams } from 'next/navigation';
// import Script from 'next/script';

// import { googleTrackEvent } from '@/lib/analytics';

// /**
//  * Client component that injects Google Analytics and manually tracks page views
//  * on SPA navigations (pathname/search changes).
//  *
//  * Emits:
//  * - `page_view` via `googleTrackEvent`, including:
//  *   - `page_path`: `${pathname}?${searchParams}`
//  *   - `page_title`: `document.title`
//  *   - `page_location`: `window.location.href`
//  *
//  * Requirements:
//  * - Define `NEXT_PUBLIC_GA_MEASUREMENT_ID` in your environment.
//  *
//  * Notes:
//  * - We call `gtag('config', '<MEASUREMENT_ID>', { send_page_view: false })` to
//  *   prevent duplicate page views, since we emit them manually on pathname/search changes.
//  * - This component is a **client** component and should be rendered once (e.g., in `app/layout.tsx`).
//  *
//  * @example
//  * ```tsx
//  * // app/layout.tsx
//  * import { GoogleAnalytics } from '@/ui/analytics/google-analytics';
//  *
//  * export default function RootLayout({ children }: { children: React.ReactNode }) {
//  *   return (
//  *     <html lang="en">
//  *       <body>
//  *         <GoogleAnalytics />
//  *         {children}
//  *       </body>
//  *     </html>
//  *   );
//  * }
//  * ```
//  */
// export function GoogleAnalytics() {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     const url =
//       pathname +
//       (searchParams?.toString() ? `?${searchParams.toString()}` : '');

//     // Track page view through your analytics abstraction
//     if (typeof window !== 'undefined') {
//       googleTrackEvent({
//         name: 'page_view',
//         properties: {
//           page_path: url,
//           page_title: document.title,
//           page_location: window.location.href,
//         },
//       });
//     }
//   }, [pathname, searchParams]);

//   return (
//     <>
//       {/* Load GA library */}
//       <Script
//         strategy="afterInteractive"
//         src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
//       />
//       {/* Initialize GA (disable auto page_view, we handle it manually) */}
//       <Script
//         id="google-analytics"
//         strategy="afterInteractive"
//         dangerouslySetInnerHTML={{
//           __html: `
//             window.dataLayer = window.dataLayer || [];
//             function gtag(){ dataLayer.push(arguments); }
//             gtag('js', new Date());
//             gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
//               page_path: window.location.pathname,
//               send_page_view: false // Disable automatic page views as we'll handle them manually
//             });
//           `,
//         }}
//       />
//     </>
//   );
// }
