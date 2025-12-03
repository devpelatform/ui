/**
 * Alert Toast Component
 *
 * This module provides a customizable toast notification system using Sonner
 * with integrated Alert components for consistent UI styling.
 *
 * Features:
 * - Multiple icon variants (primary, destructive, success, info, warning)
 * - Customizable alert variants for different visual styles
 * - Auto-dismiss after 4 seconds
 * - Unique ID generation for each toast
 */

"use client";

import type { ReactNode } from "react";
import {
  CheckIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  CircleXIcon,
  InfoIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Alert, AlertIcon, AlertTitle } from "@pelatform/ui.default";

/**
 * Configuration options for the alert toast notification
 */
export interface AlertToastOptions {
  /** Custom message to display in the toast */
  message?: string;
  /** Icon variant to display in the alert - determines which icon is shown */
  icon?: "primary" | "destructive" | "success" | "info" | "warning";
  /** Visual variant of the alert component - affects styling and colors */
  variant?: "secondary" | "primary" | "destructive" | "mono" | "success" | "info" | "warning";
}

/**
 * Icon mapping for different toast types
 * Maps icon variants to their corresponding React components
 */
const iconMap = {
  primary: <CircleAlertIcon />,
  success: <CircleCheckIcon />,
  info: <InfoIcon />,
  warning: <TriangleAlertIcon />,
  destructive: <CircleXIcon />,
} satisfies Record<"primary" | "success" | "info" | "warning" | "destructive", ReactNode>;

/**
 * Creates and displays a customizable alert toast notification
 *
 * @param options - Configuration options for the toast
 * @param options.message - The message to display (default: 'This is a toast')
 * @param options.icon - The icon variant to show (default: 'success')
 * @param options.variant - The visual style variant (default: 'mono')
 *
 * @example
 * ```tsx
 * // Show a success message
 * AlertToast({ message: 'Data saved successfully!' });
 *
 * // Show an error message
 * AlertToast({
 *   message: 'Failed to save data',
 *   icon: 'destructive',
 *   variant: 'destructive'
 * });
 * ```
 */
export function AlertToast({
  message = "This is a toast",
  icon = "success",
  variant = "mono",
}: AlertToastOptions) {
  // Create a custom toast with Alert component for consistent styling
  toast.custom(
    () => (
      <Alert variant={variant} icon={icon}>
        <AlertIcon>{iconMap[icon ?? "success"]}</AlertIcon>
        <AlertTitle>{message}</AlertTitle>
      </Alert>
    ),
    {
      // Auto-dismiss after 4 seconds
      duration: 4000,
      // Generate unique ID to prevent duplicate toasts
      id: `alert-toast-${Date.now()}`,
    },
  );
}

/**
 * Alert Notification Component
 *
 * Renders a static alert notification with appropriate icon and styling
 * based on the variant. This component is used for displaying persistent
 * alerts that don't auto-dismiss like toast notifications.
 *
 * @param props - Component props
 * @param props.message - The message to display in the alert
 * @param props.variant - The visual style variant (default: 'info')
 *
 * @returns JSX element or null if no message is provided
 *
 * @example
 * ```tsx
 * // Basic info alert
 * <AlertNotification message="Please verify your email address" />
 *
 * // Error alert
 * <AlertNotification
 *   message="Failed to load data"
 *   variant="destructive"
 * />
 *
 * // Success alert
 * <AlertNotification
 *   message="Profile updated successfully"
 *   variant="success"
 * />
 *
 * // Warning alert
 * <AlertNotification
 *   message="Your session will expire soon"
 *   variant="warning"
 * />
 * ```
 */
export function AlertNotification({ message, variant = "info" }: AlertToastOptions) {
  if (!message) return null;

  const getIcon = () => {
    switch (variant) {
      case "destructive":
        return <CircleAlertIcon />;
      case "success":
        return <CheckIcon />;
      case "info":
        return <InfoIcon />;
      case "warning":
        return <TriangleAlertIcon />;
      default:
        return <InfoIcon />;
    }
  };

  return (
    <Alert variant={variant}>
      <AlertIcon>{getIcon()}</AlertIcon>
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  );
}

/**
 * Displays a standardized "coming soon" toast notification
 *
 * This function creates a consistent user experience for features that are
 * not yet implemented. It uses a custom toast with alert styling to inform
 * users that the feature they're trying to access is under development.
 *
 * @param options - Configuration options for the toast appearance and message
 *
 * @example
 * ```tsx
 * // Basic usage with default message
 * AlertComingsoon();
 *
 * // Custom message with warning variant
 * AlertComingsoon({
 *   message: 'Advanced analytics coming in Q2 2024',
 *   icon: 'warning',
 *   variant: 'warning'
 * });
 *
 * // Success variant for positive messaging
 * AlertComingsoon({
 *   message: 'New dashboard features are on the way!',
 *   icon: 'success',
 *   variant: 'success'
 * });
 *
 * // Use in event handlers
 * const handlePremiumFeature = () => {
 *   AlertComingsoon({
 *     message: 'Premium features available soon',
 *     icon: 'info',
 *     variant: 'info'
 *   });
 * };
 * ```
 */
export const AlertComingsoon = ({
  message = "This feature is coming soon.",
  icon = "success",
  variant = "mono",
}: AlertToastOptions = {}): void => {
  toast.custom(
    () => (
      <Alert variant={variant} icon={icon}>
        <AlertIcon>
          <CircleAlertIcon />
        </AlertIcon>
        <AlertTitle>{message}</AlertTitle>
      </Alert>
    ),
    {
      // Toast configuration for better UX
      position: "top-center",
      duration: 3000, // Show for 3 seconds
      id: `coming-soon-${Date.now()}`, // Prevent duplicate toasts
    },
  );
};
