import React from 'react';

import { PropOnChange, SliderValue, TrackPosition } from '../helper';

export type ActiveButton = 'left' | 'right' | null | undefined;

export type UseSliderProps<RANGE extends boolean = false> = {
  disabled: boolean;
  range?: RANGE;
  value: SliderValue<RANGE>;
  min: number;
  max: number;
  step?: number | number[];
  onChange?: PropOnChange<RANGE>;
  sliderRef: React.RefObject<HTMLDivElement>;
  buttonRefs: React.RefObject<HTMLButtonElement>[];
};

export type UseSliderValues = {
  handleTouchStart: (e: React.TouchEvent) => void;
  handleMouseDown: (e: React.MouseEvent) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onFocus: (e: React.FocusEvent<HTMLButtonElement>, button: ActiveButton) => void;
  stopListening: () => void;
  activeButton: ActiveButton;
  popoverPosition: TrackPosition[];
};

export const isRangeParams = (params: UseSliderProps<boolean>): params is UseSliderProps<true> => {
  return !!params.range;
};

export const isNotRangeParams = (
  params: UseSliderProps<boolean>,
): params is UseSliderProps<false> => {
  return !!params.range;
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
