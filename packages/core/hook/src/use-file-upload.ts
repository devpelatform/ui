/**
 * File upload functionality hook for React components
 * Provides comprehensive file upload capabilities with drag & drop support
 * Includes validation, preview generation, and state management
 */

"use client";

import type React from "react";
import type { ChangeEvent, DragEvent, InputHTMLAttributes } from "react";
import { useCallback, useRef, useState } from "react";

/**
 * Metadata structure for uploaded files
 */
export interface FileMetadata {
  /** The name of the file */
  name: string;
  /** The size of the file in bytes */
  size: number;
  /** The MIME type of the file */
  type: string;
  /** The URL where the file can be accessed */
  url: string;
  /** Unique identifier for the file */
  id: string;
}

/**
 * File object with preview capabilities
 */
export interface FileWithPreview {
  /** The actual file object or metadata */
  file: File | FileMetadata;
  /** Unique identifier for the file */
  id: string;
  /** Optional preview URL for the file (typically for images) */
  preview?: string;
}

/**
 * Configuration options for the file upload hook
 */
export interface FileUploadOptions {
  /** Maximum number of files allowed (only used when multiple is true, defaults to Infinity) */
  maxFiles?: number;
  /** Maximum file size in bytes (defaults to Infinity) */
  maxSize?: number;
  /** Accepted file types (MIME types or extensions, defaults to '*') */
  accept?: string;
  /** Whether multiple files can be selected (defaults to false) */
  multiple?: boolean;
  /** Initial files to populate the upload state */
  initialFiles?: FileMetadata[];
  /** Callback function executed when files change */
  onFilesChange?: (files: FileWithPreview[]) => void;
  /** Callback function executed when new files are added */
  onFilesAdded?: (addedFiles: FileWithPreview[]) => void;
  onError?: (errors: string[]) => void;
}

/**
 * Current state of the file upload component
 */
export interface FileUploadState {
  /** Array of files currently selected/uploaded */
  files: FileWithPreview[];
  /** Whether the user is currently dragging files over the drop zone */
  isDragging: boolean;
  /** Array of validation error messages */
  errors: string[];
}

/**
 * Actions available for file upload management
 */
export interface FileUploadActions {
  /** Add new files to the upload state */
  addFiles: (files: FileList | File[]) => void;
  /** Remove a specific file by its ID */
  removeFile: (id: string) => void;
  /** Clear all files from the upload state */
  clearFiles: () => void;
  /** Clear all error messages */
  clearErrors: () => void;
  /** Handle drag enter event for drop zone */
  handleDragEnter: (e: DragEvent<HTMLElement>) => void;
  /** Handle drag leave event for drop zone */
  handleDragLeave: (e: DragEvent<HTMLElement>) => void;
  /** Handle drag over event for drop zone */
  handleDragOver: (e: DragEvent<HTMLElement>) => void;
  /** Handle drop event for drop zone */
  handleDrop: (e: DragEvent<HTMLElement>) => void;
  /** Handle file input change event */
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Programmatically open the file dialog */
  openFileDialog: () => void;
  /** Get props for the file input element */
  getInputProps: (
    props?: InputHTMLAttributes<HTMLInputElement>,
  ) => InputHTMLAttributes<HTMLInputElement> & {
    ref: React.Ref<HTMLInputElement>;
  };
}

/**
 * Hook for comprehensive file upload functionality with drag & drop support
 *
 * Features:
 * - Single and multiple file upload support
 * - Drag and drop functionality
 * - File validation (size, type, count)
 * - Preview generation for images
 * - Error handling and state management
 * - Duplicate file detection
 * - Memory cleanup for object URLs
 *
 * @param options - Configuration options for the file upload hook
 * @returns Tuple containing current state and available actions
 *
 * @example
 * ```tsx
 * const [state, actions] = useFileUpload({
 *   maxFiles: 5,
 *   maxSize: 10 * 1024 * 1024, // 10MB
 *   accept: 'image/*',
 *   multiple: true,
 *   onFilesChange: (files) => console.log('Files changed:', files),
 *   onFilesAdded: (newFiles) => console.log('New files added:', newFiles)
 * });
 *
 * return (
 *   <div
 *     onDragEnter={actions.handleDragEnter}
 *     onDragLeave={actions.handleDragLeave}
 *     onDragOver={actions.handleDragOver}
 *     onDrop={actions.handleDrop}
 *   >
 *     <input {...actions.getInputProps()} />
 *     <button onClick={actions.openFileDialog}>
 *       Upload Files
 *     </button>
 *     {state.files.map(file => (
 *       <div key={file.id}>
 *         {file.file.name}
 *         <button onClick={() => actions.removeFile(file.id)}>
 *           Remove
 *         </button>
 *       </div>
 *     ))}
 *   </div>
 * );
 * ```
 */
export const useFileUpload = (
  options: FileUploadOptions = {},
): [FileUploadState, FileUploadActions] => {
  const {
    maxFiles = Number.POSITIVE_INFINITY,
    maxSize = Number.POSITIVE_INFINITY,
    accept = "*",
    multiple = false,
    initialFiles = [],
    onFilesChange,
    onFilesAdded,
    onError,
  } = options;

  /** Current state of the file upload component */
  const [state, setState] = useState<FileUploadState>({
    files: initialFiles.map((file) => ({
      file,
      id: file.id,
      preview: file.url,
    })),
    isDragging: false,
    errors: [],
  });

  /** Reference to the hidden file input element */
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Validate a file against the configured constraints
   *
   * @param file - The file to validate (File object or FileMetadata)
   * @returns Error message if validation fails, null if valid
   */
  const validateFile = useCallback(
    (file: File | FileMetadata): string | null => {
      if (file instanceof File) {
        if (file.size > maxSize) {
          return `File "${file.name}" exceeds the maximum size of ${formatBytes(maxSize)}.`;
        }
      } else if (file.size > maxSize) {
        return `File "${file.name}" exceeds the maximum size of ${formatBytes(maxSize)}.`;
      }

      if (accept !== "*") {
        const acceptedTypes = accept.split(",").map((type) => type.trim());
        const fileType = file instanceof File ? file.type || "" : file.type;
        const fileExtension = `.${file instanceof File ? file.name.split(".").pop() : file.name.split(".").pop()}`;

        const isAccepted = acceptedTypes.some((type) => {
          if (type.startsWith(".")) {
            return fileExtension.toLowerCase() === type.toLowerCase();
          }
          if (type.endsWith("/*")) {
            const baseType = type.split("/")[0];
            return fileType.startsWith(`${baseType}/`);
          }
          return fileType === type;
        });

        if (!isAccepted) {
          return `File "${file instanceof File ? file.name : file.name}" is not an accepted file type.`;
        }
      }

      return null;
    },
    [accept, maxSize],
  );

  /**
   * Create a preview URL for a file
   *
   * @param file - The file to create a preview for
   * @returns Preview URL string or undefined
   */
  const createPreview = useCallback(
    (file: File | FileMetadata): string | undefined => {
      if (file instanceof File) {
        return URL.createObjectURL(file);
      }
      return file.url;
    },
    [],
  );

  /**
   * Generate a unique identifier for a file
   *
   * @param file - The file to generate an ID for
   * @returns Unique identifier string
   */
  const generateUniqueId = useCallback((file: File | FileMetadata): string => {
    if (file instanceof File) {
      return `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    }
    return file.id;
  }, []);

  /**
   * Clear all files from the upload state
   * Also cleans up object URLs to prevent memory leaks
   */
  const clearFiles = useCallback(() => {
    setState((prev) => {
      // Clean up object URLs
      for (const file of prev.files) {
        if (
          file.preview &&
          file.file instanceof File &&
          file.file.type.startsWith("image/")
        ) {
          URL.revokeObjectURL(file.preview);
        }
      }

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      const newState = {
        ...prev,
        files: [],
        errors: [],
      };

      onFilesChange?.(newState.files);
      return newState;
    });
  }, [onFilesChange]);

  /**
   * Add new files to the upload state
   * Handles validation, duplicate detection, and state updates
   *
   * @param newFiles - FileList or array of File objects to add
   */
  const addFiles = useCallback(
    (newFiles: FileList | File[]) => {
      if (!newFiles || newFiles.length === 0) {
        return;
      }

      const newFilesArray = Array.from(newFiles);
      const errors: string[] = [];

      // Clear existing errors when new files are uploaded
      setState((prev) => ({ ...prev, errors: [] }));

      // In single file mode, clear existing files first
      if (!multiple) {
        clearFiles();
      }

      // Check if adding these files would exceed maxFiles (only in multiple mode)
      if (
        multiple &&
        maxFiles !== Number.POSITIVE_INFINITY &&
        state.files.length + newFilesArray.length > maxFiles
      ) {
        errors.push(`You can only upload a maximum of ${maxFiles} files.`);
        onError?.(errors);
        setState((prev) => ({ ...prev, errors }));
        return;
      }

      const validFiles: FileWithPreview[] = [];

      for (const file of newFilesArray) {
        // Only check for duplicates if multiple files are allowed
        if (multiple) {
          const isDuplicate = state.files.some(
            (existingFile) =>
              existingFile.file.name === file.name &&
              existingFile.file.size === file.size,
          );

          // Skip duplicate files silently
          if (isDuplicate) {
            return;
          }
        }

        // Check file size
        if (file.size > maxSize) {
          errors.push(
            multiple
              ? `Some files exceed the maximum size of ${formatBytes(maxSize)}.`
              : `File exceeds the maximum size of ${formatBytes(maxSize)}.`,
          );
          continue;
        }

        const error = validateFile(file);
        if (error) {
          errors.push(error);
        } else {
          validFiles.push({
            file,
            id: generateUniqueId(file),
            preview: createPreview(file),
          });
        }
      }

      // Only update state if we have valid files to add
      if (validFiles.length > 0) {
        // Call the onFilesAdded callback with the newly added valid files
        onFilesAdded?.(validFiles);

        setState((prev) => {
          const newFiles = !multiple
            ? validFiles
            : [...prev.files, ...validFiles];
          onFilesChange?.(newFiles);
          return {
            ...prev,
            files: newFiles,
            errors,
          };
        });
      } else if (errors.length > 0) {
        onError?.(errors);
        setState((prev) => ({
          ...prev,
          errors,
        }));
      }

      // Reset input value after handling files
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [
      state.files,
      maxFiles,
      multiple,
      maxSize,
      validateFile,
      createPreview,
      generateUniqueId,
      clearFiles,
      onFilesChange,
      onFilesAdded,
      onError,
    ],
  );

  /**
   * Remove a specific file from the upload state
   * Also cleans up object URLs to prevent memory leaks
   *
   * @param id - The unique identifier of the file to remove
   */
  const removeFile = useCallback(
    (id: string) => {
      setState((prev) => {
        const fileToRemove = prev.files.find((file) => file.id === id);
        if (
          fileToRemove?.preview &&
          fileToRemove.file instanceof File &&
          fileToRemove.file.type.startsWith("image/")
        ) {
          URL.revokeObjectURL(fileToRemove.preview);
        }

        const newFiles = prev.files.filter((file) => file.id !== id);
        onFilesChange?.(newFiles);

        return {
          ...prev,
          files: newFiles,
          errors: [],
        };
      });
    },
    [onFilesChange],
  );

  /**
   * Clear all error messages from the state
   */
  const clearErrors = useCallback(() => {
    setState((prev) => ({
      ...prev,
      errors: [],
    }));
  }, []);

  /**
   * Handle drag enter event for the drop zone
   * Sets the dragging state to true
   *
   * @param e - The drag event
   */
  const handleDragEnter = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setState((prev) => ({ ...prev, isDragging: true }));
  }, []);

  /**
   * Handle drag leave event for the drop zone
   * Sets the dragging state to false when leaving the drop zone
   *
   * @param e - The drag event
   */
  const handleDragLeave = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.currentTarget.contains(e.relatedTarget as Node)) {
      return;
    }

    setState((prev) => ({ ...prev, isDragging: false }));
  }, []);

  /**
   * Handle drag over event for the drop zone
   * Prevents default behavior to allow dropping
   *
   * @param e - The drag event
   */
  const handleDragOver = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  /**
   * Handle drop event for the drop zone
   * Processes dropped files and adds them to the upload state
   *
   * @param e - The drag event containing the dropped files
   */
  const handleDrop = useCallback(
    (e: DragEvent<HTMLElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setState((prev) => ({ ...prev, isDragging: false }));

      // Don't process files if the input is disabled
      if (inputRef.current?.disabled) {
        return;
      }

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        // In single file mode, only use the first file
        if (!multiple) {
          const file = e.dataTransfer.files[0]!;
          addFiles([file]);
        } else {
          addFiles(e.dataTransfer.files);
        }
      }
    },
    [addFiles, multiple],
  );

  /**
   * Handle file input change event
   * Processes selected files from the file input
   *
   * @param e - The change event from the file input
   */
  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        addFiles(e.target.files);
      }
    },
    [addFiles],
  );

  /**
   * Programmatically open the file dialog
   * Triggers the hidden file input click event
   */
  const openFileDialog = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);

  /**
   * Get props for the file input element
   * Returns properly configured input props with event handlers
   *
   * @param props - Optional additional props for the input element
   * @returns Input props object with ref and event handlers
   */
  const getInputProps = useCallback(
    (props: InputHTMLAttributes<HTMLInputElement> = {}) => {
      return {
        ...props,
        type: "file" as const,
        onChange: handleFileChange,
        accept: props.accept || accept,
        multiple: props.multiple !== undefined ? props.multiple : multiple,
        ref: inputRef,
      };
    },
    [accept, multiple, handleFileChange],
  );

  return [
    state,
    {
      addFiles,
      removeFile,
      clearFiles,
      clearErrors,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      handleFileChange,
      openFileDialog,
      getInputProps,
    },
  ];
};

/**
 * Helper function to format bytes to human-readable format
 *
 * @param bytes - The number of bytes to format
 * @param decimals - Number of decimal places to show (default: 2)
 * @returns Formatted string with appropriate unit (e.g., "1.5 MB")
 *
 * @example
 * ```tsx
 * formatBytes(1024); // "1 KB"
 * formatBytes(1536, 1); // "1.5 KB"
 * formatBytes(1048576); // "1 MB"
 * ```
 */
export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const idx = Math.min(i, sizes.length - 1);

  return `${Number.parseFloat((bytes / k ** idx).toFixed(dm))} ${sizes[idx]}`;
};
