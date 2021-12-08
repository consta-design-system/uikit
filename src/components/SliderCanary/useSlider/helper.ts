import React from 'react';

import { PropOnChange, SliderValue, TrackPosition } from '../helper';
import { getSteps } from '../useSliderStationing';

export type ActiveButton = 'left' | 'right' | null | undefined;

export type Stationing = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type UseSliderProps<RANGE extends boolean = false> = {
  disabled: boolean;
  range?: RANGE;
  value: SliderValue<RANGE>;
  min: number;
  max: number;
  step?: number | number[];
  onChange?: PropOnChange<RANGE>;
  onAfterChange?: PropOnChange<RANGE>;
  sliderRef: React.RefObject<HTMLDivElement>;
  buttonRefs: React.RefObject<HTMLButtonElement>[];
};

export type UseSliderValues = {
  onKeyPress: (e: React.KeyboardEvent, typeButton: ActiveButton) => void;
  onFocus: (
    e: React.FocusEvent<HTMLButtonElement> | React.MouseEvent,
    button: ActiveButton,
  ) => void;
  activeButton: ActiveButton;
  dragPoint: () => void;
  currentValue: number | [number, number];
  popoverPosition: TrackPosition[];
};

export const isRangeParams = (params: UseSliderProps<boolean>): params is UseSliderProps<true> => {
  return !!params.range;
};

export const isNotRangeParams = (
  params: UseSliderProps<boolean>,
): params is UseSliderProps<false> => {
  return !params.range;
};

export const trackPosition = (
  event: Event | React.TouchEvent | React.MouseEvent,
): TrackPosition => {
  if ('clientX' in event) {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  }
  return null;
};

export const getActiveValue = (value: number | [number, number], active: ActiveButton) => {
  if (Array.isArray(value)) {
    return active === 'left' ? value[0] : value[1];
  }
  return value;
};

export const detectActiveButton: (
  posittion: TrackPosition,
  buttons: React.RefObject<HTMLButtonElement>[],
) => ActiveButton = (position, buttons) => {
  let activeButton: ActiveButton = null;
  buttons.forEach((buttonRef, index) => {
    const button = buttonRef.current;
    if (button && position) {
      const { x, y, width, height } = button.getBoundingClientRect();
      if (
        x <= position.x &&
        x + width >= position.x &&
        y <= position.y &&
        y + height >= position.y
      ) {
        activeButton = index === 0 ? 'left' : 'right';
        button.focus();
      }
    }
  });
  return activeButton;
};

export const getValidValue = (
  value: number,
  min: number,
  max: number,
  step?: number | number[],
) => {
  if (typeof value === 'number') {
    if (value > max) return max;
    if (value < min) return min;
    if (!Array.isArray(step)) {
      const division = step?.toString().split('.')[1];
      const stepValue = step || 1;
      return (
        Math.ceil(Number(value.toFixed(division ? division.length : 0)) / stepValue) * stepValue
      );
    }
    let resultValue = value;
    let stepsArr = step;
    if (step[0] !== min) {
      stepsArr = [min, ...stepsArr];
    } else if (step[step.length - 1] !== max) {
      stepsArr = [...stepsArr, max];
    }
    stepsArr.forEach((stepPoint, index) => {
      let minValue = min;
      let maxValue = max;
      if (index === 0) {
        maxValue = stepsArr[index + 1];
      } else if (index === stepsArr.length - 1) {
        minValue = stepPoint;
        maxValue = max;
      } else {
        maxValue = stepsArr[index + 1];
        minValue = stepPoint;
      }
      if (value <= maxValue && value >= minValue) {
        if ((maxValue + minValue) / 2 > value) {
          resultValue = minValue;
        } else {
          resultValue = maxValue;
        }
      }
    });
    return resultValue;
  }
  return value;
};

export const isValidValue = (value: number, min: number, max: number, step?: number | number[]) =>
  getValidValue(value, min, max, step) === value;

export const getValueByPosition = (
  position: TrackPosition,
  sliderRef: React.RefObject<HTMLDivElement>,
  min: number,
  max: number,
) => {
  if (sliderRef.current && position) {
    const { x, width } = sliderRef.current.getBoundingClientRect();
    const absoluteSize = Math.abs(max - min);
    const value = min + ((position.x - x) * absoluteSize) / width;
    return getValidValue(value, min, max);
  }
  return 0;
};

export const getNewValue = (
  changedValue: number,
  currentValue: number | [number, number],
  step: number | number[],
  min: number,
  max: number,
  activeButton: ActiveButton,
): number | [number, number] => {
  let maxRangeValue = max;
  let minRangeValue = min;
  if (Array.isArray(currentValue)) {
    const [left, right] = currentValue;
    if (activeButton === 'right') {
      minRangeValue = left;
    } else {
      maxRangeValue = right;
    }
  }
  const analyzedValue = getValidValue(
    analyzeDivisionValue(changedValue, step, min, max),
    minRangeValue,
    maxRangeValue,
    step,
  );
  if (Array.isArray(currentValue)) {
    return activeButton === 'right'
      ? [currentValue[0], analyzedValue]
      : [analyzedValue, currentValue[1]];
  }
  return analyzedValue;
};

export const analyzeDivisionValue = (
  value: number,
  step: number | number[],
  min: number,
  max: number,
) => {
  const steps = getSteps(step, min, max);
  let newValue: number = value;
  steps.forEach((stepSize) => {
    if (value && stepSize.min < value && stepSize.max >= value) {
      if ((stepSize.max + stepSize.min) / 2 > value) {
        newValue = stepSize.min;
      } else {
        newValue = stepSize.max;
      }
    }
  });
  return newValue;
};
