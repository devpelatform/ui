/**
 * Confirm Dismiss Dialog Component
 * Provides a reusable confirmation dialog for destructive actions like discarding changes
 * Built on top of AlertDialog with customizable content and actions
 */

"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@pelatform/ui.default";

/**
 * Props interface for the ConfirmDismissDialog component
 */
export interface ConfirmDismissDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback to handle dialog open state changes */
  onOpenChange: (open: boolean) => void;
  /** Callback executed when user confirms the action */
  onConfirm: () => void;
  /** Optional callback executed when user cancels (defaults to closing dialog) */
  onCancel?: () => void;
  /** Dialog title text (defaults to "Discard changes?") */
  title?: string;
  /** Dialog description text (defaults to unsaved changes message) */
  description?: string;
  /** Confirm button text (defaults to "Discard changes") */
  confirmText?: string;
  /** Cancel button text (defaults to "Cancel") */
  cancelText?: string;
  /** CSS class for maximum width (defaults to "md:max-w-[375px]") */
  maxWidth?: string;
}

/**
 * Reusable confirmation dialog for destructive actions
 *
 * This component provides a standardized way to confirm destructive actions
 * like discarding unsaved changes, deleting items, or leaving forms.
 * It includes customizable text and handles both confirm and cancel actions.
 *
 * @param props - Component props for dialog configuration
 * @returns JSX element containing the confirmation dialog
 *
 * @example
 * ```tsx
 * // Basic usage for form dismissal
 * function FormComponent() {
 *   const [showDialog, setShowDialog] = useState(false);
 *   const [hasChanges, setHasChanges] = useState(false);
 *
 *   const handleClose = () => {
 *     if (hasChanges) {
 *       setShowDialog(true);
 *     } else {
 *       // Close form directly
 *       onClose();
 *     }
 *   };
 *
 *   return (
 *     <>
 *       <form>
 *         <button type="button" onClick={handleClose}>Close</button>
 *       </form>
 *
 *       <ConfirmDismissDialog
 *         open={showDialog}
 *         onOpenChange={setShowDialog}
 *         onConfirm={() => {
 *           setShowDialog(false);
 *           onClose(); // Actually close the form
 *         }}
 *       />
 *     </>
 *   );
 * }
 *
 * // Custom dialog for deletion
 * <ConfirmDismissDialog
 *   open={showDeleteDialog}
 *   onOpenChange={setShowDeleteDialog}
 *   title="Delete item?"
 *   description="This action cannot be undone. Are you sure you want to delete this item?"
 *   confirmText="Delete"
 *   cancelText="Keep"
 *   onConfirm={handleDelete}
 * />
 * ```
 */
export const ConfirmDismissDialog = ({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  title = "Discard changes?",
  description = "You have unsaved changes. Are you sure you want to close this dialog?",
  confirmText = "Discard changes",
  cancelText = "Cancel",
  maxWidth = "md:max-w-[375px]",
}: ConfirmDismissDialogProps) => {
  /**
   * Handle cancel action with fallback behavior
   * If onCancel is provided, use it; otherwise, just close the dialog
   */
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onOpenChange(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className={maxWidth}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>{confirmText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
