/**
 * Google reCAPTCHA v2 integration hook for React components
 * Provides a complete solution for implementing reCAPTCHA v2 with automatic
 * script loading, widget management, and token retrieval
 */

"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Type definition for Google reCAPTCHA instance
 * Defines the available methods on the grecaptcha object
 */
type ReCaptchaInstance = {
  /** Wait for reCAPTCHA to be ready */
  ready: (callback: () => void) => void;
  /** Render reCAPTCHA widget in container */
  render: (
    container: HTMLElement,
    config: { sitekey: string; size: string; theme: string },
  ) => number;
  /** Reset reCAPTCHA widget */
  reset: (id: number) => void;
  /** Get response token from widget */
  getResponse: (id: number) => string;
};

/**
 * Extended Window interface with reCAPTCHA properties
 * Adds grecaptcha and callback function to global window
 */
interface RecaptchaWindow extends Window {
  /** Google reCAPTCHA instance */
  grecaptcha?: ReCaptchaInstance;
  /** Callback function called when reCAPTCHA script loads */
  onRecaptchaLoaded?: () => void;
}

/** Unique ID for the reCAPTCHA script element */
const RECAPTCHA_SCRIPT_ID = "recaptcha-v2-script";

/** Global promise to track script loading state */
let scriptLoadPromise: Promise<void> | null = null;

/**
 * Load Google reCAPTCHA v2 script dynamically
 * Ensures the script is only loaded once and handles multiple concurrent requests
 *
 * @returns Promise that resolves when the script is loaded and ready
 */
function loadRecaptchaScript(): Promise<void> {
  // Return existing promise if script is already loading
  if (scriptLoadPromise) return scriptLoadPromise;

  scriptLoadPromise = new Promise((resolve) => {
    // Check if script already exists and grecaptcha is loaded
    if (document.getElementById(RECAPTCHA_SCRIPT_ID) && (window as RecaptchaWindow).grecaptcha) {
      resolve();
      return;
    }

    // Set up the global callback for when the script loads
    (window as RecaptchaWindow).onRecaptchaLoaded = () => {
      resolve();
    };

    // Create and append the reCAPTCHA script element
    const script = document.createElement("script");
    script.id = RECAPTCHA_SCRIPT_ID;
    script.src = `https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoaded&render=explicit`;
    script.async = true;
    script.defer = true;

    // Add error handling for script loading
    script.onerror = () => {
      console.error("Failed to load reCAPTCHA script");
      scriptLoadPromise = null; // Reset to allow retry
    };

    document.head.appendChild(script);
  });

  return scriptLoadPromise;
}

/**
 * Hook for integrating Google reCAPTCHA v2 into React components
 *
 * This hook provides a complete solution for reCAPTCHA v2 integration including:
 * - Automatic script loading and initialization
 * - Widget rendering and management
 * - Token retrieval and validation
 * - Cleanup and reset functionality
 *
 * @param siteKey - Your Google reCAPTCHA site key
 * @returns Object containing ref, token getter, reset function, and initializer
 *
 * @example
 * ```tsx
 * function ContactForm() {
 *   const { containerRef, getToken, resetCaptcha } = useRecaptchaV2('your-site-key');
 *
 *   const handleSubmit = async (e) => {
 *     e.preventDefault();
 *
 *     try {
 *       const token = getToken();
 *       if (!token) {
 *         alert('Please complete the reCAPTCHA');
 *         return;
 *       }
 *
 *       // Submit form with token
 *       await submitForm({ token, ...formData });
 *       resetCaptcha(); // Reset after successful submission
 *     } catch (error) {
 *       console.error('Submission failed:', error);
 *     }
 *   };
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <input type="email" placeholder="Email" />
 *       <div ref={containerRef}></div>
 *       <button type="submit">Submit</button>
 *     </form>
 *   );
 * }
 * ```
 */
export function useRecaptchaV2(siteKey: string) {
  /** Reference to store the reCAPTCHA widget ID */
  const widgetId = useRef<number | null>(null);

  /** Reference to the DOM container where reCAPTCHA will be rendered */
  const containerRef = useRef<HTMLDivElement | null>(null);

  /** Flag to track if the widget has been rendered */
  const isRendered = useRef(false);

  /** Flag to prevent multiple simultaneous initialization attempts */
  const isInitializing = useRef(false);

  /**
   * Initialize reCAPTCHA widget
   * Handles script loading, widget rendering, and error recovery
   */
  const initializeRecaptcha = useCallback(async () => {
    // Prevent multiple simultaneous initialization attempts
    if (isInitializing.current) return;
    if (!containerRef.current || !siteKey) return;

    isInitializing.current = true;

    try {
      // Reset existing widget state if present
      if (widgetId.current !== null) {
        const grecaptcha = (window as RecaptchaWindow).grecaptcha;
        if (grecaptcha) {
          try {
            grecaptcha.reset(widgetId.current);
          } catch (error) {
            console.error("Error resetting reCAPTCHA:", error);
          }
        }
        widgetId.current = null;
        isRendered.current = false;
      }

      // Load the reCAPTCHA script and wait for it to be ready
      await loadRecaptchaScript();

      // Verify that grecaptcha is available after script load
      const grecaptcha = (window as RecaptchaWindow).grecaptcha;
      if (!grecaptcha) {
        throw new Error("reCAPTCHA failed to load");
      }

      // Wait for grecaptcha to be fully ready before rendering
      await new Promise<void>((resolve) => {
        grecaptcha.ready(() => resolve());
      });

      // Render the widget if container is available and not already rendered
      if (containerRef.current && !isRendered.current) {
        widgetId.current = grecaptcha.render(containerRef.current, {
          sitekey: siteKey,
          size: "normal", // Can be 'normal', 'compact', or 'invisible'
          theme: "light", // Can be 'light' or 'dark'
        });
        isRendered.current = true;
      }
    } catch (error) {
      console.error("Error initializing reCAPTCHA:", error);
    } finally {
      isInitializing.current = false;
    }
  }, [siteKey]);

  useEffect(() => {
    // Initialize reCAPTCHA when container is available
    if (containerRef.current) {
      initializeRecaptcha();
    }

    // Cleanup function to reset widget on unmount
    return () => {
      if (widgetId.current !== null) {
        const grecaptcha = (window as RecaptchaWindow).grecaptcha;
        if (grecaptcha) {
          try {
            grecaptcha.reset(widgetId.current);
          } catch (error) {
            console.error("Error resetting reCAPTCHA on cleanup:", error);
          }
        }
        widgetId.current = null;
        isRendered.current = false;
      }
    };
  }, [initializeRecaptcha]);

  /**
   * Get the reCAPTCHA response token
   * Call this function to retrieve the token after user completes the challenge
   *
   * @returns The reCAPTCHA response token
   * @throws Error if reCAPTCHA is not initialized or no response available
   */
  const getToken = (): string => {
    const grecaptcha = (window as RecaptchaWindow).grecaptcha;
    if (!grecaptcha || widgetId.current === null) {
      throw new Error("reCAPTCHA not initialized");
    }

    const token = grecaptcha.getResponse(widgetId.current);
    if (!token) {
      throw new Error("reCAPTCHA not completed");
    }

    return token;
  };

  /**
   * Reset the reCAPTCHA widget
   * Call this function to reset the widget after form submission or error
   */
  const resetCaptcha = () => {
    const grecaptcha = (window as RecaptchaWindow).grecaptcha;
    if (!grecaptcha || widgetId.current === null) return;

    try {
      grecaptcha.reset(widgetId.current);
      // Note: We don't reset widgetId and isRendered here as the widget is still rendered
      // Only the challenge state is reset
    } catch (error) {
      console.error("Error resetting reCAPTCHA:", error);
    }
  };

  return {
    /** Ref to attach to the container div where reCAPTCHA will be rendered */
    containerRef,
    /** Function to get the reCAPTCHA response token */
    getToken,
    /** Function to reset the reCAPTCHA widget */
    resetCaptcha,
    /** Function to manually initialize reCAPTCHA (usually not needed) */
    initializeRecaptcha,
  };
}
