/**
 * reCAPTCHA Popover Component
 * Provides a popover interface for Google reCAPTCHA v2 verification
 * Integrates with Radix UI Popover and custom reCAPTCHA hook for seamless UX
 */

"use client";

import type { ReactNode } from "react";
import { CircleAlertIcon } from "lucide-react";
import { Popover } from "radix-ui";
import { toast } from "sonner";

import { Alert, AlertIcon, AlertTitle, Button } from "@pelatform/ui.default";
import { useRecaptchaV2 } from "@pelatform/ui.hook";

/**
 * Props interface for the RecaptchaPopover component
 */
interface RecaptchaPopoverProps {
  /** Whether the popover is open */
  open: boolean;
  /** Callback when popover open state changes */
  onOpenChange: (open: boolean) => void;
  /** Callback when reCAPTCHA verification succeeds */
  onVerify: (token: string) => void;
  /** Trigger element that opens the popover */
  trigger: ReactNode;
  /** Custom text for the verify button (default: "Verify & Submit") */
  verifyButtonText?: string;
}

/**
 * RecaptchaPopover Component
 *
 * A popover component that displays Google reCAPTCHA v2 verification.
 * Provides a clean, accessible interface for bot protection without
 * disrupting the main page flow. Automatically handles reCAPTCHA
 * initialization, token retrieval, and error states.
 *
 * @param props - Component props
 * @returns JSX element containing the popover with reCAPTCHA
 *
 * @example
 * ```tsx
 * // Basic usage with form submission
 * function ContactForm() {
 *   const [showRecaptcha, setShowRecaptcha] = useState(false);
 *   const [formData, setFormData] = useState({ email: '', message: '' });
 *
 *   const handleSubmit = (e: FormEvent) => {
 *     e.preventDefault();
 *     setShowRecaptcha(true);
 *   };
 *
 *   const handleRecaptchaVerify = async (token: string) => {
 *     try {
 *       await submitForm({ ...formData, recaptchaToken: token });
 *       setShowRecaptcha(false);
 *       toast.success('Form submitted successfully!');
 *     } catch (error) {
 *       toast.error('Submission failed. Please try again.');
 *     }
 *   };
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <input
 *         type="email"
 *         value={formData.email}
 *         onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
 *         placeholder="Email"
 *         required
 *       />
 *       <textarea
 *         value={formData.message}
 *         onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
 *         placeholder="Message"
 *         required
 *       />
 *
 *       <RecaptchaPopover
 *         open={showRecaptcha}
 *         onOpenChange={setShowRecaptcha}
 *         onVerify={handleRecaptchaVerify}
 *         trigger={
 *           <Button type="submit">
 *             Send Message
 *           </Button>
 *         }
 *       />
 *     </form>
 *   );
 * }
 *
 * // Custom verification button text
 * <RecaptchaPopover
 *   open={showVerification}
 *   onOpenChange={setShowVerification}
 *   onVerify={handleVerification}
 *   verifyButtonText="Complete Verification"
 *   trigger={<Button>Verify Account</Button>}
 * />
 * ```
 */
export function RecaptchaPopover({
  open,
  onOpenChange,
  onVerify,
  trigger,
  verifyButtonText = "Verify & Submit",
}: RecaptchaPopoverProps) {
  const { containerRef, getToken, resetCaptcha, initializeRecaptcha } = useRecaptchaV2(
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "",
  );

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen);
    if (newOpen) {
      resetCaptcha();
      // Small delay to ensure the popover content is rendered
      setTimeout(() => {
        initializeRecaptcha();
      }, 100);
    }
  };

  const handleVerify = () => {
    try {
      const token = getToken();
      if (!token) {
        toast.custom(
          () => (
            <Alert variant="mono" icon="destructive">
              <AlertIcon>
                <CircleAlertIcon />
              </AlertIcon>
              <AlertTitle>Please complete the reCAPTCHA verification.</AlertTitle>
            </Alert>
          ),
          {
            position: "top-center",
          },
        );
        return;
      }
      onVerify(token);
    } catch (error) {
      console.error("Error getting reCAPTCHA token:", error);
      toast.custom(
        () => (
          <Alert variant="mono" icon="destructive">
            <AlertIcon>
              <CircleAlertIcon />
            </AlertIcon>
            <AlertTitle>Please complete the reCAPTCHA verification.</AlertTitle>
          </Alert>
        ),
        {
          position: "top-center",
        },
      );
      return;
    }
  };

  return (
    <Popover.Root open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="z-50 rounded-lg bg-white p-4 shadow-lg"
          sideOffset={5}
          align="end"
          onInteractOutside={(e) => {
            // Prevent closing when interacting with reCAPTCHA iframe
            if ((e.target as HTMLElement).tagName === "IFRAME") {
              e.preventDefault();
            }
          }}
        >
          <div className="flex flex-col gap-4">
            <div ref={containerRef} className="min-h-[78px]" />
            <Button type="button" variant="mono" onClick={handleVerify} className="w-full">
              {verifyButtonText}
            </Button>
          </div>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
