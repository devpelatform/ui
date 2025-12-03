/**
 * Image Input Component
 * Provides a comprehensive image upload solution with drag-and-drop support,
 * multiple file selection, preview generation, and file management capabilities
 */

"use client";

import type React from "react";
import {
  type ChangeEvent,
  type DragEvent,
  type FC,
  type ReactNode,
  type RefObject,
  useCallback,
  useRef,
  useState,
} from "react";

/**
 * Interface representing a single image file with metadata
 */
interface ImageInputFile {
  /** Base64 data URL of the image for preview */
  dataURL?: string;
  /** Original File object */
  file?: File;
  /** Additional custom properties */
  [key: string]: unknown;
}

/**
 * Type representing an array of image files
 */
type ImageInputFiles = ImageInputFile[];

/**
 * Props interface for the ImageInput component
 */
interface ImageInputProps {
  /** Current array of image files */
  value: ImageInputFiles;
  /** Callback when files change, includes updated file indices */
  onChange: (value: ImageInputFiles, addUpdatedIndex?: number[]) => void;
  /** Render prop function that receives image input controls */
  children?: (props: ImageInputExport) => ReactNode;
  /** Whether to allow multiple file selection */
  multiple?: boolean;
  /** Maximum number of files allowed (not implemented in current version) */
  maxNumber?: number;
  /** Array of accepted file extensions (without dots) */
  acceptType?: string[];
  /** Key name for the data URL property in file objects */
  dataURLKey?: string;
  /** Additional props to pass to the hidden input element */
  inputProps?: React.HTMLProps<HTMLInputElement>;
}

/**
 * Interface for the object passed to the children render prop
 * Contains all necessary functions and state for image management
 */
interface ImageInputExport {
  /** Current list of image files */
  fileList: ImageInputFiles;
  /** Function to trigger file selection dialog */
  onImageUpload: () => void;
  /** Function to remove all images */
  onImageRemoveAll: () => void;
  /** Function to update/replace an image at specific index */
  onImageUpdate: (index: number) => void;
  /** Function to remove an image at specific index */
  onImageRemove: (index: number) => void;
  /** Whether drag operation is currently active */
  isDragging: boolean;
  /** Drag and drop event handlers */
  dragProps: {
    onDrop: (e: DragEvent<HTMLDivElement>) => void;
    onDragEnter: (e: DragEvent<HTMLDivElement>) => void;
    onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
    onDragOver: (e: DragEvent<HTMLDivElement>) => void;
    onDragStart: (e: DragEvent<HTMLDivElement>) => void;
  };
}

/** Default index value indicating no selection */
export const DEFAULT_NULL_INDEX = -1;

/** Default key name for storing data URL in file objects */
export const DEFAULT_DATA_URL_KEY = "dataURL";

/**
 * Utility Functions for Image Input Component
 */

/**
 * Programmatically opens the file selection dialog
 *
 * @param inputRef - Reference to the hidden input element
 *
 * @example
 * ```tsx
 * const inputRef = useRef<HTMLInputElement>(null);
 *
 * const handleUploadClick = () => {
 *   openFileDialog(inputRef);
 * };
 * ```
 */
const openFileDialog = (inputRef: RefObject<HTMLInputElement | null>): void => {
  if (!inputRef.current) {
    return;
  }
  inputRef.current.click();
};

/**
 * Generates the accept attribute string for file input
 *
 * @param acceptType - Array of file extensions without dots
 * @param allowNonImageType - Whether to allow non-image files
 * @returns Accept attribute string for input element
 *
 * @example
 * ```tsx
 * getAcceptTypeString(['jpg', 'png']); // '.jpg, .png'
 * getAcceptTypeString(); // 'image/*'
 * getAcceptTypeString([], true); // ''
 * ```
 */
const getAcceptTypeString = (acceptType?: string[], allowNonImageType?: boolean) => {
  if (acceptType?.length) return acceptType.map((item) => `.${item}`).join(", ");
  if (allowNonImageType) return "";
  return "image/*";
};

/**
 * Converts a File object to a base64 data URL string
 *
 * @param file - The file to convert
 * @returns Promise resolving to base64 data URL
 *
 * @example
 * ```tsx
 * const file = new File([''], 'image.jpg', { type: 'image/jpeg' });
 * const dataURL = await getBase64(file);
 * console.log(dataURL); // 'data:image/jpeg;base64,/9j/4AAQ...'
 * ```
 */
const getBase64 = async (file: File): Promise<string> => {
  const reader = new FileReader();
  return await new Promise((resolve) => {
    reader.addEventListener("load", () => {
      resolve(String(reader.result));
    });
    reader.readAsDataURL(file);
  });
};

/**
 * Creates an HTMLImageElement from a File object
 * Useful for getting image dimensions or other metadata
 *
 * @param file - The image file to load
 * @returns Promise resolving to HTMLImageElement
 *
 * @example
 * ```tsx
 * const file = new File([''], 'image.jpg', { type: 'image/jpeg' });
 * const image = await getImage(file);
 * console.log(`Dimensions: ${image.width}x${image.height}`);
 * ```
 */
const getImage = async (file: File): Promise<HTMLImageElement> => {
  const image = new Image();
  return await new Promise((resolve) => {
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = URL.createObjectURL(file);
  });
};

/**
 * Converts a FileList to an array of ImageInputFile objects
 * Each file is converted to base64 for preview purposes
 *
 * @param files - FileList from input or drag event
 * @param dataURLKey - Key name for storing the data URL
 * @returns Promise resolving to array of ImageInputFile objects
 *
 * @example
 * ```tsx
 * const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
 *   if (e.target.files) {
 *     const imageFiles = await getListFiles(e.target.files, 'dataURL');
 *     setImages(imageFiles);
 *   }
 * };
 * ```
 */
const getListFiles = async (files: FileList, dataURLKey: string): Promise<ImageInputFiles> => {
  const promiseFiles: Array<Promise<string>> = [];
  for (let i = 0; i < files.length; i += 1) {
    promiseFiles.push(getBase64(files[i]));
  }
  return await Promise.all(promiseFiles).then((fileListBase64: string[]) => {
    const fileList: ImageInputFiles = fileListBase64.map((base64, index) => ({
      [dataURLKey]: base64,
      file: files[index],
    }));
    return fileList;
  });
};

/**
 * ImageInput Component
 *
 * A comprehensive image upload component with drag-and-drop support,
 * multiple file selection, and file management capabilities.
 * Uses render props pattern for maximum flexibility in UI implementation.
 *
 * @param props - Component props
 * @returns JSX element containing hidden input and render prop children
 *
 * @example
 * ```tsx
 * // Basic single image upload
 * function SingleImageUpload() {
 *   const [images, setImages] = useState<ImageInputFiles>([]);
 *
 *   return (
 *     <ImageInput
 *       value={images}
 *       onChange={setImages}
 *       acceptType={['jpg', 'png', 'gif']}
 *     >
 *       {({ fileList, onImageUpload, onImageRemove, isDragging, dragProps }) => (
 *         <div
 *           {...dragProps}
 *           className={`border-2 border-dashed p-4 ${
 *             isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
 *           }`}
 *         >
 *           {fileList.length === 0 ? (
 *             <button onClick={onImageUpload}>
 *               Click or drag image here
 *             </button>
 *           ) : (
 *             <div>
 *               <img src={fileList[0].dataURL} alt="Preview" />
 *               <button onClick={() => onImageRemove(0)}>Remove</button>
 *             </div>
 *           )}
 *         </div>
 *       )}
 *     </ImageInput>
 *   );
 * }
 *
 * // Multiple image upload with gallery
 * function ImageGallery() {
 *   const [images, setImages] = useState<ImageInputFiles>([]);
 *
 *   return (
 *     <ImageInput
 *       value={images}
 *       onChange={setImages}
 *       multiple
 *       acceptType={['jpg', 'png']}
 *     >
 *       {({ fileList, onImageUpload, onImageRemove, onImageRemoveAll }) => (
 *         <div>
 *           <button onClick={onImageUpload}>Add Images</button>
 *           {fileList.length > 0 && (
 *             <button onClick={onImageRemoveAll}>Remove All</button>
 *           )}
 *           <div className="grid grid-cols-3 gap-4">
 *             {fileList.map((image, index) => (
 *               <div key={index} className="relative">
 *                 <img src={image.dataURL} alt={`Preview ${index}`} />
 *                 <button
 *                   onClick={() => onImageRemove(index)}
 *                   className="absolute top-0 right-0"
 *                 >
 *                   ×
 *                 </button>
 *               </div>
 *             ))}
 *           </div>
 *         </div>
 *       )}
 *     </ImageInput>
 *   );
 * }
 * ```
 */
const ImageInput: FC<ImageInputProps> = ({
  value,
  acceptType,
  inputProps,
  multiple,
  children,
  onChange,
}) => {
  const inValue = value || [];
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyUpdate, setKeyUpdate] = useState<number>(DEFAULT_NULL_INDEX);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const onImageRemoveAll = useCallback((): void => {
    onChange?.([]);
  }, [onChange]);

  const handleClickInput = useCallback(() => {
    openFileDialog(inputRef);
  }, []);

  const onImageUpload = useCallback((): void => {
    handleClickInput();
  }, [handleClickInput]);

  const onInputChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    await handleChange(e.target.files);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleChange = async (files: FileList | null) => {
    if (!files) return;
    const fileList = await getListFiles(files, DEFAULT_DATA_URL_KEY);
    if (!fileList.length) return;
    let updatedFileList: ImageInputFiles;
    const updatedIndexes: number[] = [];
    if (keyUpdate > DEFAULT_NULL_INDEX) {
      const [firstFile] = fileList;
      updatedFileList = [...inValue];
      updatedFileList[keyUpdate] = firstFile;
      updatedIndexes.push(keyUpdate);
    } else if (multiple) {
      updatedFileList = [...inValue, ...fileList];
      for (let i = inValue.length; i < updatedFileList.length; i += 1) {
        updatedIndexes.push(i);
      }
    } else {
      updatedFileList = [fileList[0]];
      updatedIndexes.push(0);
    }
    onChange?.(updatedFileList, updatedIndexes);
  };

  const onImageRemove = (index: number | number[]): void => {
    const updatedList = [...inValue];
    if (Array.isArray(index)) {
      index.forEach((i) => {
        updatedList.splice(i, 1);
      });
    } else {
      updatedList.splice(index, 1);
    }
    onChange?.(updatedList);
  };

  const onImageUpdate = (index: number): void => {
    setKeyUpdate(index);
    handleClickInput();
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragOut = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleChange(e.dataTransfer.files);
    }
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.clearData();
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={getAcceptTypeString(acceptType)}
        multiple={multiple}
        onChange={(e) => {
          onInputChange(e);
        }}
        style={{ display: "none" }}
        {...inputProps}
      />
      {children?.({
        fileList: inValue,
        onImageUpload,
        onImageRemove,
        onImageUpdate,
        onImageRemoveAll,
        dragProps: {
          onDrop: handleDrop,
          onDragEnter: handleDragIn,
          onDragLeave: handleDragOut,
          onDragOver: handleDrag,
          onDragStart: handleDragStart,
        },
        isDragging,
      })}
    </>
  );
};

export {
  ImageInput,
  type ImageInputProps,
  type ImageInputFiles,
  type ImageInputFile,
  getBase64,
  getImage,
  getAcceptTypeString,
  getListFiles,
  openFileDialog,
};
