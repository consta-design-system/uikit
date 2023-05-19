import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useComponentSize } from '##/hooks/useComponentSize';

import { Line, PropView } from './helper';
import { COUNT_STEPS } from './useSlider/useSlider';

type UseSliderStationing = (
  value: number | [number, number] | undefined,
  min: number,
  max: number,
  view: PropView,
  range: boolean | undefined,
  step: number | number[] | undefined,
  buttonRefs: [
    React.RefObject<HTMLButtonElement>,
    React.RefObject<HTMLButtonElement>,
  ],
  sliderLineRef: React.RefObject<HTMLButtonElement | HTMLDivElement>,
) => {
  lineSizes: Line[];
  buttonPositions: number[];
};

export const getSteps = (step: number | number[], min: number, max: number) => {
  const stepsArray: { min: number; max: number }[] = [];
  let size = min;
  if (Array.isArray(step)) {
    for (let i = 0; i < step.length - 1; i++) {
      stepsArray.push({
        min: step[i],
        max: step[i + 1],
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
  step = 1,
  buttonRefs,
  sliderLineRef,
) => {
  const [lineSizes, setLineSizes] = useState<Line[]>([]);
  const [buttonPositions, setButtonPositions] = useState<number[]>([]);

  const { width, height } = useComponentSize(sliderLineRef);

  const calcualtedStep = useMemo(() => {
    if (!Array.isArray(step)) {
      const val = Math.abs((max - min) / COUNT_STEPS);
      if (val > step) {
        return val - (val % step);
      }
      return Math.max(val, step);
    }
    return step;
  }, [max, min, step]);

  const calculateLines = () => {
    const sizesArray: Line[] = [];
    const absoluteSize = Math.abs(max - min);
    if (typeof value !== 'undefined') {
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
          const [minValue, maxValue] = [Math.min(...value), Math.max(...value)];
          const endPointArray = [minValue, maxValue];
          endPointArray.unshift(min);
          endPointArray.push(max);
          for (let i = 0; i < endPointArray.length - 1; i++) {
            sizesArray.push({
              width:
                ((endPointArray[i + 1] - endPointArray[i]) / absoluteSize) *
                100,
              active:
                endPointArray[i] >= minValue &&
                endPointArray[i + 1] <= maxValue,
            });
          }
        } else {
          sizesArray.push({
            width: 100,
            active: false,
          });
        }
      } else if (typeof calcualtedStep !== 'undefined') {
        getSteps(calcualtedStep, min, max).forEach((stepSize) => {
          sizesArray.push({
            width: (Math.abs(stepSize.max - stepSize.min) * 100) / absoluteSize,
            active:
              (typeof value === 'number' || Array.isArray(value)) &&
              (range && Array.isArray(value)
                ? stepSize.max > Math.min(...value) &&
                  stepSize.min < Math.max(...value)
                : stepSize.max <= value),
          });
        });
      }
    } else {
      sizesArray.push({
        width: 100,
        active: false,
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
          (absoluteSize * buttonRef.current.offsetWidth) /
            (2 * sliderLineRef.current.offsetWidth) || 0;
      }
      if (typeof value === 'number' || Array.isArray(value)) {
        positions.push(
          typeof value === 'number'
            ? (1 -
                (max - getValidValue(value) + defaultPaddingValue) /
                  absoluteSize) *
                100
            : (1 -
                (max - getValidValue(value[index]) + defaultPaddingValue) /
                  absoluteSize) *
                100,
        );
      }
    });
    return positions;
  }, [buttonRefs, sliderLineRef]);

  useEffect(() => {
    setLineSizes(calculateLines());
    setButtonPositions(calculateButtonPositions());
  }, [value, min, max, range, calcualtedStep, view, width, height]);

  return {
    lineSizes,
    buttonPositions,
  };
};
