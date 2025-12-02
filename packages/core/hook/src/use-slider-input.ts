/**
 * Dual slider input management hook for React components
 * Provides synchronized state management between range slider and number inputs
 * with validation and boundary enforcement
 */

"use client";

import type * as React from "react";
import { useCallback, useState } from "react";

/**
 * Configuration options for the slider input hook
 */
interface UseSliderInputProps {
  /** Minimum allowed value for the range */
  minValue: number;
  /** Maximum allowed value for the range */
  maxValue: number;
  /** Initial values for the range [min, max] */
  initialValue: [number, number];
}

/**
 * Hook for managing dual slider input with synchronized state
 *
 * This hook provides state management for components that need both
 * a range slider and corresponding number inputs. It handles synchronization
 * between the two input types, validation, and boundary enforcement.
 *
 * Features:
 * - Synchronized slider and input values
 * - Automatic validation and boundary enforcement
 * - Prevents invalid range configurations (min > max)
 * - Optimized with useCallback for performance
 *
 * @param props - Configuration options for the hook
 * @returns Object containing state and handlers for slider and inputs
 *
 * @example
 * ```tsx
 * function PriceRangeFilter() {
 *   const {
 *     sliderValues,
 *     inputValues,
 *     handleSliderChange,
 *     handleInputChange,
 *     validateAndUpdateValue
 *   } = useSliderInput({
 *     minValue: 0,
 *     maxValue: 1000,
 *     initialValue: [100, 500]
 *   });
 *
 *   return (
 *     <div className="price-range">
 *       <div className="inputs">
 *         <input
 *           type="number"
 *           value={inputValues[0]}
 *           onChange={(e) => handleInputChange(e, 0)}
 *           onBlur={() => validateAndUpdateValue(inputValues[0], 0)}
 *           placeholder="Min price"
 *         />
 *         <input
 *           type="number"
 *           value={inputValues[1]}
 *           onChange={(e) => handleInputChange(e, 1)}
 *           onBlur={() => validateAndUpdateValue(inputValues[1], 1)}
 *           placeholder="Max price"
 *         />
 *       </div>
 *
 *       <Slider
 *         value={sliderValues}
 *         onValueChange={handleSliderChange}
 *         min={0}
 *         max={1000}
 *         step={10}
 *       />
 *     </div>
 *   );
 * }
 * ```
 */
export function useSliderInput({
  minValue,
  maxValue,
  initialValue,
}: UseSliderInputProps) {
  /** State for slider component values */
  const [sliderValues, setSliderValues] =
    useState<[number, number]>(initialValue);

  /** State for input field values (may temporarily differ from slider) */
  const [inputValues, setInputValues] =
    useState<[number, number]>(initialValue);

  /**
   * Handle slider value changes and sync with input values
   * Called when user interacts with the range slider
   *
   * @param values - New slider values [min, max]
   */
  const handleSliderChange = useCallback((values: [number, number]) => {
    setSliderValues(values);
    setInputValues(values); // Keep inputs in sync with slider
  }, []);

  /**
   * Handle input field changes
   * Updates input state without immediately affecting slider
   *
   * @param e - Input change event
   * @param index - Index of the input (0 for min, 1 for max)
   */
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: 0 | 1) => {
      const newValue = Number.parseFloat(e.target.value);

      // Only update if the value is a valid number
      if (!Number.isNaN(newValue)) {
        const updatedInputs = [...inputValues] as [number, number];
        updatedInputs[index] = newValue;
        setInputValues(updatedInputs);
      }
    },
    [inputValues],
  );

  /**
   * Validate and update slider values from input
   * Called when input loses focus or user presses Enter
   * Enforces boundaries and prevents invalid ranges
   *
   * @param value - Value to validate and apply
   * @param index - Index of the value (0 for min, 1 for max)
   */
  const validateAndUpdateValue = useCallback(
    (value: number, index: 0 | 1) => {
      const updatedSlider = [...sliderValues] as [number, number];

      if (index === 0) {
        // Validate minimum value
        // Ensure it's not less than minValue and not greater than current max
        updatedSlider[0] = Math.max(minValue, Math.min(value, sliderValues[1]));
      } else {
        // Validate maximum value
        // Ensure it's not greater than maxValue and not less than current min
        updatedSlider[1] = Math.min(maxValue, Math.max(value, sliderValues[0]));
      }

      // Update both slider and input values to validated values
      setSliderValues(updatedSlider);
      setInputValues(updatedSlider);
    },
    [sliderValues, minValue, maxValue],
  );

  return {
    /** Function to manually set slider values */
    setSliderValues,
    /** Function to manually set input values */
    setInputValues,
    /** Current slider values [min, max] */
    sliderValues,
    /** Current input values [min, max] */
    inputValues,
    /** Handler for slider value changes */
    handleSliderChange,
    /** Handler for input field changes */
    handleInputChange,
    /** Function to validate and update values from inputs */
    validateAndUpdateValue,
  };
}
