/**
 * React Query provider for global state management
 * Provides TanStack Query client configuration with error handling,
 * caching strategies, and toast notifications for API operations
 */

"use client";

import { type ReactNode, useState } from "react";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CircleAlertIcon } from "lucide-react";
import { toast } from "sonner";

import { Alert, AlertIcon, AlertTitle } from "@pelatform/ui.default";

/**
 * React Query provider component with optimized configuration
 *
 * This provider sets up TanStack Query with:
 * - Global error handling with toast notifications
 * - Optimized caching and retry strategies
 * - Background refetching configuration
 * - Stale time and garbage collection settings
 *
 * @param props - Component props containing children
 * @returns JSX element wrapping children with QueryClient context
 *
 * @example
 * ```tsx
 * // Wrap your app with QueryProvider
 * function App() {
 *   return (
 *     <QueryProvider>
 *       <YourAppComponents />
 *     </QueryProvider>
 *   );
 * }
 *
 * // Use React Query hooks in child components
 * function UserProfile() {
 *   const { data, isLoading, error } = useQuery({
 *     queryKey: ['user', userId],
 *     queryFn: () => fetchUser(userId)
 *   });
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error occurred</div>; // Error toast will show automatically
 *
 *   return <div>{data.name}</div>;
 * }
 * ```
 */
export const QueryProvider = ({
  client: clientProps,
  children,
}: {
  client?: QueryClient;
  children: ReactNode;
}) => {
  /**
   * Initialize QueryClient with optimized configuration
   * Uses useState to ensure single instance across re-renders
   */
  const [queryClient] = useState(
    () =>
      new QueryClient({
        /** Global query defaults for all queries */
        defaultOptions: {
          queries: {
            /** Time before data is considered stale (5 minutes) */
            staleTime: 5 * 60 * 1000,
            /** Time before inactive queries are garbage collected (10 minutes) */
            gcTime: 10 * 60 * 1000,
            /** Number of retry attempts on failure */
            retry: (failureCount, error: Error & { status?: number }) => {
              // Don't retry on 4xx errors (client errors)
              if (error?.status && error.status >= 400 && error.status < 500) {
                return false;
              }
              // Retry up to 3 times for other errors
              return failureCount < 3;
            },
            /** Delay between retries (exponential backoff) */
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            /** Refetch on window focus for fresh data */
            refetchOnWindowFocus: true,
            /** Refetch when network reconnects */
            refetchOnReconnect: true,
          },
          mutations: {
            /** Number of retry attempts for mutations */
            retry: 1,
            /** Delay between mutation retries */
            retryDelay: 1000,
          },
        },

        /** Global query cache with error handling */
        queryCache: new QueryCache({
          onError: (error: Error & { response?: { data?: { message?: string } } }, query) => {
            // Extract meaningful error message
            const message =
              error?.response?.data?.message ||
              error?.message ||
              "Something went wrong. Please try again.";

            // Log error for debugging (only in development)
            if (process.env.NODE_ENV === "development") {
              console.error("Query Error:", {
                error,
                queryKey: query.queryKey,
                message,
                timestamp: new Date().toISOString(),
              });
            }

            // Show error toast notification
            toast.custom(
              () => (
                <Alert variant="mono" icon="destructive" close={false}>
                  <AlertIcon>
                    <CircleAlertIcon />
                  </AlertIcon>
                  <AlertTitle>{message}</AlertTitle>
                </Alert>
              ),
              {
                position: "top-center",
                duration: 5000, // Show for 5 seconds
                id: `query-error-${query.queryHash}`, // Prevent duplicate toasts
              },
            );
          },
        }),
      }),
  );

  return <QueryClientProvider client={clientProps ?? queryClient}>{children}</QueryClientProvider>;
};
