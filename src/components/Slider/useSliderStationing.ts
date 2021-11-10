import React, { useCallback, useEffect, useState } from 'react';

import { Line, PropView } from './helper';

type UseSliderStationing = (
  value: number | number[] | undefined,
  min: number,
  max: number,
  view: PropView,
  range: boolean | undefined,
  step: number | number[] | undefined,
  buttonRefs: React.RefObject<HTMLButtonElement>[],
  sliderLineRef: React.RefObject<HTMLDivElement>,
) => {
  lineSizes: Line[];
  buttonPositions: number[];
};

export const getSteps = (step: number | number[], min: number, max: number) => {
  const stepsArray: { min: number; max: number }[] = [];
  let size = min;
  if (Array.isArray(step)) {
    step.forEach((stepSize) => {
      stepsArray.push({
        min: size,
        max: stepSize,
      });
      size += stepSize - size;
    });
    if (size !== max) {
      stepsArray.push({
        min: size,
        max,
      });
    }
  } else {
    for (let i = min; i < max; i += step) {
      stepsArray.push({
        min: size,
        max: size + (max - i < step ? max - i : step),
      });
      size += step;
    }
  }
  return stepsArray;
};

export const useSliderStationing: UseSliderStationing = (
  value,
  min,
  max,
  view,
  range,
  step,
  buttonRefs,
  sliderLineRef,
) => {
  const [lineSizes, setLineSizes] = useState<Line[]>([]);
  const [buttonPositions, setButtonPositions] = useState<number[]>([]);

  const calculateLines = () => {
    const sizesArray: Line[] = [];
    const absoluteSize = Math.abs(max - min);
    if (view === 'default') {
      if (!Array.isArray(value) && typeof value === 'number') {
        sizesArray.push({
          width: (1 - (max - value) / absoluteSize) * 100,
          active: true,
        });
        sizesArray.push({
          width: ((max - value) / absoluteSize) * 100,
          active: false,
        });
      } else if (Array.isArray(value) && value) {
        sizesArray.push({
          width: ((value[0] - min) / absoluteSize) * 100,
          active: false,
        });
        sizesArray.push({
          width: ((value[1] - value[0]) / absoluteSize) * 100,
          active: true,
        });
        sizesArray.push({
          width: ((max - value[1]) / absoluteSize) * 100,
          active: false,
        });
      } else {
        sizesArray.push({
          width: 100,
          active: false,
        });
      }
    } else if (typeof step !== 'undefined') {
      getSteps(step, min, max).forEach((stepSize) => {
        sizesArray.push({
          width: (Math.abs(stepSize.max - stepSize.min) * 100) / absoluteSize,
          active:
            (typeof value === 'number' || Array.isArray(value)) &&
            (range && Array.isArray(value)
              ? stepSize.max > value[0] && stepSize.min < value[1]
              : stepSize.max <= value),
        });
      });
    }
    return sizesArray;
  };

  const getValidValue = (value: number) => {
    if (value < min) return min;
    if (value > max) return max;
    return value;
  };

  const calculateButtonPositions = useCallback(() => {
    const absoluteSize = Math.abs(max - min);
    let defaultPaddingValue = 0;
    const positions: number[] = [];
    buttonRefs.forEach((buttonRef, index) => {
      if (
        buttonRef.current &&
        buttonRef.current.offsetWidth &&
        sliderLineRef.current &&
        sliderLineRef.current.offsetWidth
      ) {
        defaultPaddingValue =
          (absoluteSize * buttonRef.current?.offsetWidth) /
            (2 * sliderLineRef.current?.offsetWidth) || 0;
      }
      if (typeof value === 'number' || Array.isArray(value)) {
        positions.push(
          typeof value === 'number'
            ? (1 - (max - getValidValue(value) + defaultPaddingValue) / absoluteSize) * 100
            : (1 - (max - getValidValue(value[index]) + defaultPaddingValue) / absoluteSize) * 100,
        );
      }
    });
    return positions;
  }, [buttonRefs, sliderLineRef]);

  useEffect(() => {
    setLineSizes(calculateLines());
    setButtonPositions(calculateButtonPositions());
  }, [value, min, max, range, step, view]);

  return {
    lineSizes,
    buttonPositions,
  };
};
