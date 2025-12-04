/**
 * Application constants for environment detection and routing
 * Provides boolean flags for current environment and shared query param keys
 */
const NODE_ENV = process.env.NODE_ENV;

/** Whether the current runtime is in development mode */
export const isDevelopment = NODE_ENV === "development";

/** Whether the current runtime is in staging/test mode */
export const isStaging = NODE_ENV === "test";

/** Whether the current runtime is in production mode */
export const isProduction = NODE_ENV === "production";

/**
 * Query parameter name for redirection URLs.
 * Used to pass redirect destinations in authentication or navigation flows.
 *
 * @example
 * const url = `/login?${REDIRECTION_QUERY_PARAM}=/dashboard`;
 */
export const REDIRECT_QUERY_PARAM = "redirectTo";
