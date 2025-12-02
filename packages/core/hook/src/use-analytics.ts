/**
 * Analytics tracking hook for React components
 * Provides utilities for tracking CRUD operations and user interactions
 * with Google Analytics integration
 */

"use client";

import { useCallback } from "react";

/**
 * Type definition for window with Google Analytics gtag function
 * This extends the Window interface to include the gtag function
 * that's injected by the Google Analytics script
 * This implementation matches the global declaration in analytics.ts
 */
export interface GtagWindow extends Window {
  gtag?: (
    command: "event" | "config" | "set",
    targetId: string,
    config?: Record<string, string | number | boolean | object | null | undefined>,
  ) => void;
}

/**
 * Main application modules for analytics tracking
 * Comprehensive SaaS platform modules
 */
type ModuleType =
  | "workspace"
  | "user"
  | "billing"
  | "analytics"
  | "integration"
  | "content"
  | "communication"
  | "system"
  | "security"
  | "automation"
  | "ecommerce";

/**
 * Workspace module specific submodules
 * Core workspace management functionality
 */
type WorkspaceSubModuleType =
  | "workspaces"
  | "projects"
  | "teams"
  | "collaboration"
  | "templates"
  | "workflows"
  | "dashboard"
  | "kanban"
  | "calendar"
  | "files";

/**
 * User module specific submodules
 * User management and authentication
 */
type UserSubModuleType =
  | "users"
  | "profiles"
  | "roles"
  | "permissions"
  | "groups"
  | "invitations"
  | "authentication"
  | "sessions"
  | "preferences"
  | "activity";

/**
 * Billing module specific submodules
 * Subscription and payment management
 */
type BillingSubModuleType =
  | "subscriptions"
  | "plans"
  | "invoices"
  | "payments"
  | "credits"
  | "usage"
  | "discounts"
  | "taxes"
  | "refunds"
  | "billing_history";

/**
 * Analytics module specific submodules
 * Data analytics and reporting
 */
type AnalyticsSubModuleType =
  | "reports"
  | "dashboards"
  | "metrics"
  | "events"
  | "funnels"
  | "cohorts"
  | "segments"
  | "exports"
  | "real_time"
  | "custom_reports";

/**
 * Integration module specific submodules
 * Third-party integrations and APIs
 */
type IntegrationSubModuleType =
  | "api_keys"
  | "webhooks"
  | "oauth"
  | "connectors"
  | "sync"
  | "imports"
  | "exports"
  | "marketplace"
  | "custom_integrations"
  | "rate_limits";

/**
 * Content module specific submodules
 * Content management and media
 */
type ContentSubModuleType =
  | "documents"
  | "media"
  | "assets"
  | "libraries"
  | "versions"
  | "comments"
  | "reviews"
  | "publishing"
  | "cdn"
  | "storage";

/**
 * Communication module specific submodules
 * Messaging and notification systems
 */
type CommunicationSubModuleType =
  | "notifications"
  | "emails"
  | "sms"
  | "chat"
  | "announcements"
  | "broadcasts"
  | "templates"
  | "campaigns"
  | "channels"
  | "delivery";

/**
 * System module specific submodules
 * System administration and maintenance
 */
type SystemSubModuleType =
  | "settings"
  | "configurations"
  | "logs"
  | "monitoring"
  | "backups"
  | "maintenance"
  | "health_checks"
  | "performance"
  | "database"
  | "cache";

/**
 * Security module specific submodules
 * Security and compliance features
 */
type SecuritySubModuleType =
  | "audit_logs"
  | "access_control"
  | "encryption"
  | "compliance"
  | "threats"
  | "vulnerabilities"
  | "certificates"
  | "firewall"
  | "monitoring"
  | "incidents";

/**
 * Automation module specific submodules
 * Workflow automation and triggers
 */
type AutomationSubModuleType =
  | "workflows"
  | "triggers"
  | "actions"
  | "conditions"
  | "schedules"
  | "pipelines"
  | "bots"
  | "scripts"
  | "rules"
  | "execution_logs";

/**
 * E-commerce module specific submodules
 * Online store and transaction management
 */
type EcommerceSubModuleType =
  | "products"
  | "categories"
  | "inventory"
  | "orders"
  | "customers"
  | "payments"
  | "shipping"
  | "discounts"
  | "reviews"
  | "analytics";

/**
 * Union type of all possible submodules
 * Combines all module-specific submodule types for comprehensive tracking
 */
type SubModuleType =
  | WorkspaceSubModuleType
  | UserSubModuleType
  | BillingSubModuleType
  | AnalyticsSubModuleType
  | IntegrationSubModuleType
  | ContentSubModuleType
  | CommunicationSubModuleType
  | SystemSubModuleType
  | SecuritySubModuleType
  | AutomationSubModuleType
  | EcommerceSubModuleType;

/**
 * Properties for tracking CRUD events in analytics
 *
 * @property event_name - Name of the event to track
 * @property module - Main module category
 * @property submodule - Specific submodule within the main module
 * @property item_type - Type of item being acted upon
 * @property item_id - Optional ID of the specific item
 * @property action - The CRUD action being performed
 * @property delete_type - For delete actions, whether it's a soft or hard delete
 */
interface TrackEventProps {
  event_name: string;
  module: ModuleType;
  submodule: SubModuleType;
  item_type: string;
  item_id?: string;
  action: "create" | "update" | "delete";
  delete_type?: "soft" | "hard";
}

/**
 * Hook for tracking analytics events in React components
 *
 * This hook provides methods for tracking CRUD operations
 * with proper typing and structure for Google Analytics.
 *
 * @returns Object containing tracking methods for different CRUD operations
 *
 * @example
 * ```tsx
 * // Workspace management tracking
 * function WorkspaceManagement() {
 *   const { trackCreate, trackUpdate, trackDelete, trackView } = useAnalytics();
 *
 *   const handleCreateWorkspace = async (workspaceData) => {
 *     const workspace = await createWorkspace(workspaceData);
 *     trackCreate('workspace', 'workspaces', 'workspace', workspace.id);
 *   };
 *
 *   const handleViewProject = (projectId) => {
 *     trackView('workspace', 'projects', 'project', projectId);
 *   };
 *
 *   return <WorkspaceForm onSubmit={handleCreateWorkspace} />;
 * }
 *
 * // Billing and subscription tracking
 * function BillingDashboard() {
 *   const { trackUpdate, trackView } = useAnalytics();
 *
 *   const handleUpgradePlan = async (planId) => {
 *     await upgradePlan(planId);
 *     trackUpdate('billing', 'subscriptions', 'plan', planId);
 *   };
 *
 *   const handleViewInvoice = (invoiceId) => {
 *     trackView('billing', 'invoices', 'invoice', invoiceId);
 *   };
 *
 *   return <BillingInterface onUpgrade={handleUpgradePlan} />;
 * }
 *
 * // User management tracking
 * function UserManagement() {
 *   const { trackCreate, trackUpdate } = useAnalytics();
 *
 *   const handleInviteUser = async (email, role) => {
 *     const invitation = await inviteUser(email, role);
 *     trackCreate('user', 'invitations', 'invitation', invitation.id);
 *   };
 *
 *   const handleUpdatePermissions = async (userId, permissions) => {
 *     await updateUserPermissions(userId, permissions);
 *     trackUpdate('user', 'permissions', 'permission', userId);
 *   };
 *
 *   return <UserInviteForm onInvite={handleInviteUser} />;
 * }
 *
 * // Integration and automation tracking
 * function IntegrationSettings() {
 *   const { trackCreate, trackUpdate } = useAnalytics();
 *
 *   const handleCreateWebhook = async (webhookData) => {
 *     const webhook = await createWebhook(webhookData);
 *     trackCreate('integration', 'webhooks', 'webhook', webhook.id);
 *   };
 *
 *   const handleUpdateWorkflow = async (workflowId, updates) => {
 *     await updateWorkflow(workflowId, updates);
 *     trackUpdate('automation', 'workflows', 'workflow', workflowId);
 *   };
 *
 *   return <IntegrationPanel onCreate={handleCreateWebhook} />;
 * }
 * ```
 */
export const useAnalytics = () => {
  const trackEvent = useCallback(
    ({
      event_name,
      module,
      submodule,
      item_type,
      item_id,
      action,
      delete_type,
    }: TrackEventProps) => {
      if (typeof window !== "undefined" && (window as GtagWindow).gtag) {
        (window as GtagWindow).gtag!("event", event_name, {
          module,
          submodule,
          module_path: `${module}/${submodule}`,
          item_type,
          item_id,
          action,
          delete_type,
          category: "crud",
          timestamp: new Date().toISOString(),
        });
      }
    },
    [],
  );

  /**
   * Tracks item creation events
   *
   * @param module - Main module category
   * @param submodule - Specific submodule
   * @param itemType - Type of item created
   * @param itemId - Optional ID of the created item
   */
  const trackCreate = useCallback(
    (module: ModuleType, submodule: SubModuleType, itemType: string, itemId?: string) => {
      trackEvent({
        event_name: "crud_create",
        module,
        submodule,
        item_type: itemType,
        item_id: itemId,
        action: "create",
      });
    },
    [trackEvent],
  );

  /**
   * Tracks item update events
   *
   * @param module - Main module category
   * @param submodule - Specific submodule
   * @param itemType - Type of item updated
   * @param itemId - ID of the updated item
   */
  const trackUpdate = useCallback(
    (module: ModuleType, submodule: SubModuleType, itemType: string, itemId: string) => {
      trackEvent({
        event_name: "crud_update",
        module,
        submodule,
        item_type: itemType,
        item_id: itemId,
        action: "update",
      });
    },
    [trackEvent],
  );

  /**
   * Tracks item deletion events
   *
   * @param module - Main module category
   * @param submodule - Specific submodule
   * @param itemType - Type of item deleted
   * @param itemId - ID of the deleted item
   * @param isHardDelete - Whether this is a permanent deletion (true) or soft delete (false)
   */
  const trackDelete = useCallback(
    (
      module: ModuleType,
      submodule: SubModuleType,
      itemType: string,
      itemId: string,
      isHardDelete: boolean = false,
    ) => {
      trackEvent({
        event_name: "crud_delete",
        module,
        submodule,
        item_type: itemType,
        item_id: itemId,
        action: "delete",
        delete_type: isHardDelete ? "hard" : "soft",
      });
    },
    [trackEvent],
  );

  return {
    trackCreate,
    trackUpdate,
    trackDelete,
  };
};
