import React from 'react';

import { PropOnChange, SliderValue, TrackPosition } from '../helper';
import { getSteps } from '../useSliderStationing';

export type ActiveButton = 0 | 1 | null | undefined;

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
  containerRef: React.RefObject<HTMLDivElement>;
  sliderRef: React.RefObject<HTMLDivElement | HTMLButtonElement>;
  buttonRefs: React.RefObject<HTMLButtonElement>[];
};

export type UseSliderValues = {
  onKeyPress: (e: React.KeyboardEvent, typeButton: ActiveButton) => void;
  onFocus: (
    e: React.FocusEvent<HTMLButtonElement> | React.MouseEvent,
    button: ActiveButton,
  ) => void;
  handlePress: (typeButton: ActiveButton) => void;
  onSliderClick: React.MouseEventHandler;
  activeButton: ActiveButton;
  currentValue: [number] | [number, number];
  popoverPosition: TrackPosition[];
};

export const isRangeParams = (
  params: UseSliderProps<boolean>,
): params is UseSliderProps<true> => {
  return !!params.range;
};

export const isNotRangeParams = (
  params: UseSliderProps<boolean>,
): params is UseSliderProps<false> => {
  return !params.range;
};

export const trackPosition = (
  event: TouchEvent | MouseEvent,
): TrackPosition => {
  if ('clientX' in event) {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  }
  return {
    x: event.changedTouches[0].clientX,
    y: event.changedTouches[0].clientY,
  };
};

export const getActiveValue = (
  value: number | [number, number],
  active: ActiveButton,
) => {
  if (Array.isArray(value)) {
    return value[typeof active === 'number' ? active : 0];
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
        activeButton = index as ActiveButton;
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
    if (value >= max) return max;
    if (value <= min) return min;
    if (!Array.isArray(step)) {
      const division = step?.toString().split('.')[1];
      const stepValue = step || 1;
      if (Math.abs(value) < 1) {
        return Number(value.toFixed(division ? division.length : 0));
      }
      if (value < min) return min;
      for (let i = min; i <= max; i += stepValue) {
        if (value >= i && value < i + stepValue) {
          return Number(
            (value < i + stepValue / 2 ? i : i + stepValue).toFixed(
              division ? division.length : 0,
            ),
          );
        }
      }
      return max;
    }
    let resultValue = value;
    step.forEach((stepPoint, index) => {
      let minValue = min;
      let maxValue = max;
      if (index === 0) {
        maxValue = step[index + 1];
      } else if (index === step.length - 1) {
        minValue = stepPoint;
        maxValue = max;
      } else {
        maxValue = step[index + 1];
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

export const isValidValue = (
  value: number,
  min: number,
  max: number,
  step?: number | number[],
) => getValidValue(value, min, max, step) === value;

export const getValueByPosition = (
  position: TrackPosition,
  sliderRef: React.RefObject<HTMLDivElement | HTMLButtonElement>,
  min: number,
  max: number,
  step?: number | number[],
) => {
  if (sliderRef.current && position) {
    const { x, width } = sliderRef.current.getBoundingClientRect();
    const absoluteSize = Math.abs(max - min);
    const value = min + ((position.x - x) * absoluteSize) / width;
    return getValidValue(value, min, max, step);
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
  const analyzedValue = getValidValue(
    analyzeDivisionValue(changedValue, step, min, max),
    min,
    max,
    step,
  );
  if (Array.isArray(currentValue)) {
    return activeButton === 1
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
  let newValue: number = value;
  if (Array.isArray(step)) {
    const steps = getSteps(step, min, max);
    steps.forEach((stepSize) => {
      if (value && stepSize.min < value && stepSize.max >= value) {
        if ((stepSize.max + stepSize.min) / 2 > value) {
          newValue = stepSize.min;
        } else {
          newValue = stepSize.max;
        }
      }
    });
  } else {
    if (value >= max) return max;
    if (value <= min) return min;
    const nearStep = (value - min) % step;
    if (nearStep > step / 2) {
      newValue = step - nearStep + value;
    } else {
      newValue = value - nearStep;
    }
  }
  return newValue;
};
