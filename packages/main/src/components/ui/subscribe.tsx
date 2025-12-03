/**
 * Newsletter Subscribe Component
 * Provides a complete newsletter subscription form with reCAPTCHA verification,
 * email validation, analytics tracking, and customizable messaging
 */

"use client";

import { useState } from "react";
import { CircleAlertIcon, CircleCheckIcon } from "lucide-react";
import { toast } from "sonner";

import { Alert, AlertIcon, AlertTitle, Button, Input } from "@pelatform/ui.default";
import { googleTrackEvent } from "@pelatform/ui.general";
import { RecaptchaPopover } from "../utils/recaptcha-popover";

/**
 * Props interface for the Subscribe component
 */
export interface SubscribeProps {
  /** Main heading text for the subscription section */
  heading?: string;
  /** Subheading or description text */
  subheading?: string;
  /** Button text when not loading */
  buttonText?: string;
  /** Button text when loading/submitting */
  loadingButtonText?: string;
  /** Placeholder text for email input */
  inputPlaceholder?: string;
  /** Success message shown after successful subscription */
  successMessage?: string;
  /** Error message for invalid email format */
  invalidEmailMessage?: string;
  /** Error message for reCAPTCHA verification failure */
  recaptchaMessage?: string;
  /** Generic error message for API failures */
  errorMessage?: string;
  /** API endpoint for subscription requests */
  apiEndpoint?: string;
  /** Text for the verify button in reCAPTCHA popover */
  verifyButtonText?: string;
  /** Additional CSS classes for the container */
  className?: string;
}

/**
 * Subscribe Component
 *
 * A complete newsletter subscription form with the following features:
 * - Email validation with regex pattern matching
 * - reCAPTCHA v2 verification for bot protection
 * - Analytics tracking for conversion metrics
 * - Customizable messaging and styling
 * - Toast notifications for user feedback
 * - Loading states and error handling
 *
 * The component automatically tracks subscription events for analytics
 * and provides a seamless user experience with proper accessibility.
 *
 * @param props - Component props
 * @returns JSX element containing the subscription form
 *
 * @example
 * ```tsx
 * // Basic usage with default settings
 * <Subscribe />
 *
 * // Custom messaging and endpoint
 * <Subscribe
 *   heading="Join Our Community"
 *   subheading="Get exclusive updates and early access"
 *   buttonText="Join Now"
 *   apiEndpoint="/api/newsletter/subscribe"
 *   successMessage="Welcome to our community!"
 * />
 *
 * // Multilingual support
 * <Subscribe
 *   heading="Tetap terinformasi dengan rilis terbaru"
 *   subheading="Hanya update yang layak diketahui"
 *   buttonText="Berlangganan"
 *   loadingButtonText="Berlangganan..."
 *   inputPlaceholder="Alamat email Anda"
 *   successMessage="Terima kasih atas langganan Anda!"
 *   invalidEmailMessage="Alamat email tidak valid. Silakan periksa dan coba lagi."
 * />
 *
 * // Custom styling
 * <Subscribe
 *   className="bg-gradient-to-r from-blue-600 to-purple-600"
 * />
 * ```
 */
export function Subscribe({
  heading = "Stay notified on every new release",
  subheading = "Only the updates worth knowing",
  buttonText = "Subscribe",
  loadingButtonText = "Subscribing...",
  inputPlaceholder = "Your email address",
  successMessage = "Thank you for your subscription. Expect amazing stuff soon!",
  invalidEmailMessage = "Invalid email address. Please check and try again.",
  recaptchaMessage = "Please complete the reCAPTCHA verification.",
  errorMessage = "Oops! Something unexpected happened. Please try again later.",
  apiEndpoint = "/api/subscribe",
  verifyButtonText = "Verify & Subscribe",
  className,
}: SubscribeProps = {}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRecaptcha, setShowRecaptcha] = useState(false);

  const validateEmail = () => {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.custom(
        () => (
          <Alert variant="mono" icon="destructive">
            <AlertIcon>
              <CircleAlertIcon />
            </AlertIcon>
            <AlertTitle>{invalidEmailMessage}</AlertTitle>
          </Alert>
        ),
        {
          position: "top-center",
        },
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail()) {
      setShowRecaptcha(false);
      return;
    }

    setShowRecaptcha(true);
  };

  const handleVerifiedSubmit = async (token: string) => {
    if (!token) {
      toast.custom(
        () => (
          <Alert variant="mono" icon="destructive">
            <AlertIcon>
              <CircleAlertIcon />
            </AlertIcon>
            <AlertTitle>{recaptchaMessage}</AlertTitle>
          </Alert>
        ),
        {
          position: "top-center",
        },
      );
      return;
    }

    setLoading(true);
    setShowRecaptcha(false);

    try {
      googleTrackEvent({
        name: "site_newsletter_subscribe_submit",
        properties: {
          category: "conversion",
          label: "Newsletter Subscribe Submit",
          email,
        },
      });

      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-recaptcha-token": token,
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.custom(
          () => (
            <Alert variant="mono" icon="success">
              <AlertIcon>
                <CircleCheckIcon />
              </AlertIcon>
              <AlertTitle>{successMessage}</AlertTitle>
            </Alert>
          ),
          {
            position: "top-center",
          },
        );
        googleTrackEvent({
          name: "site_newsletter_subscribe_success",
          properties: {
            category: "conversion",
            label: "Newsletter Subscribe Success",
            email,
          },
        });
        setEmail("");
      } else {
        toast.custom(
          () => (
            <Alert variant="mono" icon="destructive">
              <AlertIcon>
                <CircleAlertIcon />
              </AlertIcon>
              <AlertTitle>{data.message || errorMessage}</AlertTitle>
            </Alert>
          ),
          {
            position: "top-center",
          },
        );
      }
    } catch (err: unknown) {
      console.error("Newsletter subscription error:", err);
      toast.custom(
        () => (
          <Alert variant="mono" icon="destructive">
            <AlertIcon>
              <CircleAlertIcon />
            </AlertIcon>
            <AlertTitle>{errorMessage}</AlertTitle>
          </Alert>
        ),
        {
          position: "top-center",
        },
      );
    } finally {
      setLoading(false);
    }
  };

  const style = {
    backgroundImage: `linear-gradient(0deg, transparent 0%, transparent 60%, rgba(183, 183, 183, 0.05) 60%, rgba(183, 183, 183, 0.05) 93%, transparent 93%, transparent 100%), linear-gradient(135deg, transparent 0%, transparent 55%, rgba(183, 183, 183, 0.05) 55%, rgba(183, 183, 183, 0.05) 84%, transparent 84%, transparent 100%), linear-gradient(0deg, transparent 0%, transparent 80%, rgba(183, 183, 183, 0.05) 80%, rgba(183, 183, 183, 0.05) 94%, transparent 94%, transparent 100%), linear-gradient(90deg, rgb(0,0,0), rgb(0,0,0))`,
  };

  return (
    <footer>
      <div className="container pt-10">
        <div
          className={`mt-10 mb-8 flex flex-wrap items-center justify-between gap-7 rounded-xl px-10 py-16 md:px-20 ${className || ""}`}
          style={style}
        >
          <div className="flex flex-col gap-1.5">
            <h2 className="font-medium text-3xl text-white">{heading}</h2>
            <div className="font-medium text-2xl text-white/50">{subheading}</div>
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2.5">
            <Input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setShowRecaptcha(false);
              }}
              placeholder={inputPlaceholder}
              className="h-auto rounded-lg border border-input/20 bg-white/5 px-5 py-3 text-white/80 placeholder:text-white/50 focus:outline-none focus:ring md:min-w-64"
              required
            />

            <RecaptchaPopover
              open={showRecaptcha}
              onOpenChange={(open) => {
                if (!open) {
                  setShowRecaptcha(false);
                }
              }}
              onVerify={handleVerifiedSubmit}
              verifyButtonText={verifyButtonText}
              trigger={
                <Button
                  type="submit"
                  className="h-auto rounded-lg bg-white px-5 py-3 font-semibold text-black/80 hover:bg-white hover:text-black"
                  disabled={loading}
                >
                  {loading ? loadingButtonText : buttonText}
                </Button>
              }
            />
          </form>
        </div>
      </div>
    </footer>
  );
}
